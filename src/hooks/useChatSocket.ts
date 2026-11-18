import { useUserPresistStore } from '@/lib'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Http } from '@/utils/http/http'

// ---- 协议：跟后端 Go 网关约定的信封结构保持一致 ----
export type ServerEnvelope =
  | {
      type: 'ack'
      payload: {
        client_message_id: string
        message_id: number
        conversation_id: number
        create_time: number
      }
    }
  | {
      type: 'message'
      payload: {
        id: string
        conversation_id: number
        sender_uuid: string
        content: string
        create_time: number
      }
    }
  | { type: 'typing'; payload: { conversation_id: number; sender_uuid: string } }
  | {
      type: 'read'
      payload: { conversation_id: number; reader_uuid: string; last_read_message_id: number }
    }
  | { type: 'presence'; payload: { user_uuid: string; online: string } }

export type ClientEnvelope =
  | {
      type: 'auth'
      payload: { token: string }
    }
  | {
      type: 'message'
      payload: { conversation_id: number; client_message_id: string; content: string }
    }
  | { type: 'typing'; payload: { conversation_id: number } }
  | { type: 'read'; payload: { conversation_id: number; last_read_message_id: number } }
  | { type: 'ping' }

interface UseChatSocketOptions {
  enabled: boolean // 未登录/未挂载时传 false，不建立连接
  onAck?: (payload: Extract<ServerEnvelope, { type: 'ack' }>['payload']) => void
  onMessage?: (payload: Extract<ServerEnvelope, { type: 'message' }>['payload']) => void
  onTyping?: (payload: Extract<ServerEnvelope, { type: 'typing' }>['payload']) => void
  onRead?: (payload: Extract<ServerEnvelope, { type: 'read' }>['payload']) => void
  onPresence?: (payload: Extract<ServerEnvelope, { type: 'presence' }>['payload']) => void
}

const HEARTBEAT_INTERVAL_MS = 25000
const MAX_RECONNECT_DELAY_MS = 30000

// Legacy fallback: only when NEXT_PUBLIC_WS_AUTH_IN_QUERY=true (tokens leak into access logs / Referer)
const AUTH_IN_QUERY = process.env.NEXT_PUBLIC_WS_AUTH_IN_QUERY === 'true'

function getAuthToken(): string | null {
  const { getAuth } = useUserPresistStore.getState()
  return getAuth() || null
}

/** Build a RFC6455-safe subprotocol carrying the bearer token (not written to URL/query logs). */
function buildAuthProtocol(token: string): string {
  const encoded =
    typeof btoa === 'function'
      ? btoa(token).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
      : token
  return `deshop.bearer.${encoded}`
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
    const baseUrl = `${Http.baseWsHttpPath}/api/client/chat/ws`
    const url =
      AUTH_IN_QUERY && token
        ? `${baseUrl}?token=${encodeURIComponent(token)}`
        : baseUrl

    // Prefer Sec-WebSocket-Protocol over query string so tokens are not logged in access logs / Referer.
    // Backend should accept protocol `deshop.bearer.<base64url(token)>` and/or first-message `{ type: 'auth' }`.
    const ws =
      !AUTH_IN_QUERY && token
        ? new WebSocket(url, [buildAuthProtocol(token)])
        : new WebSocket(url)
    wsRef.current = ws

    ws.onopen = () => {
      setConnected(true)
      reconnectAttemptRef.current = 0

      if (!AUTH_IN_QUERY && token && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: 'auth', payload: { token } } satisfies ClientEnvelope))
      }

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
  }, [options.enabled, connect, cleanup])

  const send = useCallback((envelope: ClientEnvelope): boolean => {
    if (envelope.type === 'auth') return false
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(envelope))
      return true
    }
    return false // 调用方根据返回值决定要不要把这条消息标记成"发送失败"
  }, [])

  return { connected, send }
}
