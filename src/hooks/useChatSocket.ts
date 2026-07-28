import { useUserPresistStore } from '@/lib'
import { useCallback, useEffect, useRef, useState } from 'react'

// ---- 协议：跟后端 Go 网关约定的信封结构保持一致 ----
export type ServerEnvelope =
  | {
      type: 'ack'
      payload: {
        client_msg_id: string
        message_id: string
        conversation_id: string
        created_at: string
      }
    }
  | {
      type: 'message'
      payload: {
        id: string
        conversation_id: string
        sender_uuid: string
        content: string
        created_at: string
      }
    }
  | { type: 'typing'; payload: { conversation_id: string; sender_uuid: string } }
  | {
      type: 'read'
      payload: { conversation_id: string; reader_uuid: string; last_read_message_id: string }
    }
  | { type: 'presence'; payload: { user_uuid: string; online: boolean } }

export type ClientEnvelope =
  | {
      type: 'message'
      payload: { conversation_id: string; client_msg_id: string; content: string }
    }
  | { type: 'typing'; payload: { conversation_id: string } }
  | { type: 'read'; payload: { conversation_id: string; last_read_message_id: string } }
  | { type: 'ping' }

type UseChatSocketOptions = {
  enabled: boolean // 未登录/未挂载时传 false，不建立连接
  onAck?: (payload: Extract<ServerEnvelope, { type: 'ack' }>['payload']) => void
  onMessage?: (payload: Extract<ServerEnvelope, { type: 'message' }>['payload']) => void
  onTyping?: (payload: Extract<ServerEnvelope, { type: 'typing' }>['payload']) => void
  onRead?: (payload: Extract<ServerEnvelope, { type: 'read' }>['payload']) => void
  onPresence?: (payload: Extract<ServerEnvelope, { type: 'presence' }>['payload']) => void
}

const WS_BASE_URL = process.env.NEXT_PUBLIC_WS_BASE_URL ?? 'ws://127.0.0.1:8899'
const HEARTBEAT_INTERVAL_MS = 25000
const MAX_RECONNECT_DELAY_MS = 30000

// token 存在 localStorage 就走这里；如果你项目走的是 httpOnly cookie 鉴权，
// 同源的 WebSocket 握手会自动带 cookie，这个函数可以直接返回 null，URL 里不用拼 token
function getAuthToken(): string | null {
  // if (typeof window === 'undefined') return null
  // return window.localStorage.getItem('Authorization')
  const { getAuth } = useUserPresistStore.getState()
  return getAuth()
}

export function useChatSocket(options: UseChatSocketOptions) {
  const [connected, setConnected] = useState(false)
  const wsRef = useRef<WebSocket | null>(null)
  const reconnectAttemptRef = useRef(0)
  const reconnectTimerRef = useRef<ReturnType<typeof setTimeout>>(null)
  const heartbeatTimerRef = useRef<ReturnType<typeof setInterval>>(null)
  const enabledRef = useRef(options.enabled)
  enabledRef.current = options.enabled

  // 用 ref 存最新的回调，避免每次父组件重渲染都要重新建立 WS 连接
  const handlersRef = useRef(options)
  handlersRef.current = options

  const cleanup = useCallback(() => {
    if (heartbeatTimerRef.current) clearInterval(heartbeatTimerRef.current)
    if (reconnectTimerRef.current) clearTimeout(reconnectTimerRef.current)
  }, [])

  const connect = useCallback(() => {
    if (!enabledRef.current) return

    const token = getAuthToken()
    const url = `${WS_BASE_URL}/chat/ws${token ? `?token=${encodeURIComponent(token)}` : ''}`
    const ws = new WebSocket(url)
    wsRef.current = ws

    ws.onopen = () => {
      setConnected(true)
      reconnectAttemptRef.current = 0

      heartbeatTimerRef.current = setInterval(() => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({ type: 'ping' } satisfies ClientEnvelope))
        }
      }, HEARTBEAT_INTERVAL_MS)
    }

    ws.onmessage = (event) => {
      let envelope: ServerEnvelope
      try {
        envelope = JSON.parse(event.data)
      } catch (e) {
        console.error('[chat ws] failed to parse message', e)
        return
      }

      switch (envelope.type) {
        case 'ack':
          handlersRef.current.onAck?.(envelope.payload)
          break
        case 'message':
          handlersRef.current.onMessage?.(envelope.payload)
          break
        case 'typing':
          handlersRef.current.onTyping?.(envelope.payload)
          break
        case 'read':
          handlersRef.current.onRead?.(envelope.payload)
          break
        case 'presence':
          handlersRef.current.onPresence?.(envelope.payload)
          break
      }
    }

    ws.onclose = () => {
      setConnected(false)
      if (heartbeatTimerRef.current) clearInterval(heartbeatTimerRef.current)

      if (!enabledRef.current) return // 组件卸载/登出，不用重连

      // 指数退避重连：1s, 2s, 4s, 8s... 封顶 30s，避免服务端刚重启就被大量客户端同时打爆重连请求
      const attempt = reconnectAttemptRef.current++
      const delay = Math.min(1000 * 2 ** attempt, MAX_RECONNECT_DELAY_MS)
      reconnectTimerRef.current = setTimeout(connect, delay)
    }

    ws.onerror = () => {
      ws.close() // 触发 onclose 里的重连逻辑，避免两处重复写重连代码
    }
  }, [])

  useEffect(() => {
    if (options.enabled) {
      connect()
    }

    return () => {
      enabledRef.current = false
      cleanup()
      wsRef.current?.close()
      wsRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.enabled, connect, cleanup])

  const send = useCallback((envelope: ClientEnvelope): boolean => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(envelope))
      return true
    }
    return false // 调用方根据返回值决定要不要把这条消息标记成"发送失败"
  }, [])

  return { connected, send }
}
