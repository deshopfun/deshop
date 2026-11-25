import { useEffect, useState } from 'react'
import { useAppKitNetwork, useAppKitAccount, useAppKit } from '@reown/appkit/react'
import { AppKitNetwork } from '@reown/appkit/networks'
import { useSendTransaction } from 'wagmi'
import { ethers } from 'ethers'
import { IsHexAddress } from '@/utils/strings'
import { ERC20Abi } from '@/utils/abi/erc20'
import { useSnackPresistStore } from '@/lib'
import { GetWalletConnectNetworkByChainids } from '@/utils/web3'
import { WalletConnectType } from '@/utils/types'
import { Button } from '@/components/ui/button'
import { Wallet, Send, Loader2, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useShallow } from 'zustand/react/shallow'

function isUserRejected(error: unknown): boolean {
  if (!error || typeof error !== 'object') return false
  const e = error as { code?: number | string; name?: string; shortMessage?: string; message?: string }
  if (e.code === 4001 || e.code === 'ACTION_REJECTED') return true
  if (e.name === 'UserRejectedRequestError') return true
  const msg = `${e.shortMessage ?? ''} ${e.message ?? ''}`.toLowerCase()
  return msg.includes('user rejected') || msg.includes('user denied') || msg.includes('rejected the request')
}

const WalletConnectButton = (props: WalletConnectType) => {
  const [connectNetwork, setConnectNetwork] = useState<AppKitNetwork>()
  const [sending, setSending] = useState(false)

  const { chainId, switchNetwork } = useAppKitNetwork()
  const { open } = useAppKit()
  const { address, isConnected } = useAppKitAccount()
  const { sendTransactionAsync, reset } = useSendTransaction()

  const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore(
    useShallow((state) => ({
      setSnackSeverity: state.setSnackSeverity,
      setSnackMessage: state.setSnackMessage,
      setSnackOpen: state.setSnackOpen,
    }))
  )

  const showError = (msg: string) => {
    setSnackSeverity('error')
    setSnackMessage(msg)
    setSnackOpen(true)
  }

  const showInfo = (msg: string) => {
    setSnackSeverity('info')
    setSnackMessage(msg)
    setSnackOpen(true)
  }

  const isWrongNetwork = connectNetwork && connectNetwork.id !== chainId

  const handleSendTx = async () => {
    if (!connectNetwork || sending) return
    if (isWrongNetwork) {
      showError(`Please switch to the correct network: ${connectNetwork.name}`)
      await open()
      return
    }
    if (!IsHexAddress(props.address)) {
      showError('Invalid payment address')
      return
    }
    if (props.address === address) {
      showError('Sending and receiving address cannot be the same')
      return
    }

    setSending(true)
    try {
      let hash: `0x${string}`
      if (props.contractAddress) {
        const value = ethers.parseUnits(String(props.value), props.decimals).toString()
        const iface = new ethers.Interface(ERC20Abi)
        const data = iface.encodeFunctionData('transfer', [props.address, value])
        hash = await sendTransactionAsync({
          data: data as `0x${string}`,
          to: props.contractAddress as `0x${string}`,
          value: BigInt(0),
        })
      } else {
        hash = await sendTransactionAsync({
          to: props.address as `0x${string}`,
          value: ethers.parseEther(String(props.value)),
        })
      }

      setSnackSeverity('success')
      setSnackMessage('Transaction sent successfully')
      setSnackOpen(true)
      props.onTxHash?.(hash)
    } catch (e) {
      console.error(e)
      reset()
      if (isUserRejected(e)) {
        showInfo('Transaction cancelled')
      } else {
        const msg =
          e instanceof Error
            ? e.message.replace(/^.*?(User rejected|reverted|insufficient).*/i, '$1').slice(0, 160)
            : 'Failed to send transaction'
        showError(msg || 'Failed to send transaction')
      }
    } finally {
      setSending(false)
    }
  }

  const onClickWalletConnect = async () => {
    try {
      if (!connectNetwork || sending) return
      if (isWrongNetwork) {
        switchNetwork(connectNetwork)
        return
      }
      if (isConnected) {
        await handleSendTx()
      } else {
        await open()
      }
    } catch (e) {
      console.error(e)
      setSending(false)
    }
  }

  useEffect(() => {
    if (!props.chainIds || !props.address) return
    const network = GetWalletConnectNetworkByChainids(props.chainIds)
    if (network) setConnectNetwork(network)
  }, [props.chainIds, props.address])

  // 断开钱包或切链后清掉发送态，避免卡在 Sending...
  useEffect(() => {
    if (!isConnected) {
      setSending(false)
      reset()
    }
  }, [isConnected, reset])

  useEffect(() => {
    setSending(false)
    reset()
  }, [chainId, props.address, props.value, props.contractAddress, reset])

  if (!connectNetwork) return null

  const buttonConfig = () => {
    if (sending)
      return {
        label: 'Confirm in wallet...',
        icon: <Loader2 className="h-4 w-4 animate-spin" />,
        className: 'bg-sky-400 cursor-not-allowed',
      }
    if (isWrongNetwork)
      return {
        label: `Switch to ${connectNetwork.name}`,
        icon: <AlertTriangle className="h-4 w-4" />,
        className: 'bg-amber-500 hover:bg-amber-600',
      }
    if (isConnected)
      return {
        label: 'Send Transaction',
        icon: <Send className="h-4 w-4" />,
        className: 'bg-sky-500 hover:bg-sky-600',
      }
    return {
      label: 'Connect Wallet',
      icon: <Wallet className="h-4 w-4" />,
      className: 'bg-sky-500 hover:bg-sky-600',
    }
  }

  const config = buttonConfig()

  return (
    <Button
      onClick={onClickWalletConnect}
      disabled={sending}
      className={cn(
        'text-white font-semibold gap-2 transition-all duration-200',
        props.fullWidth && 'w-full',
        config.className
      )}
    >
      {config.icon}
      {config.label}
    </Button>
  )
}

export default WalletConnectButton
