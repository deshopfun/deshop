import { useEffect, useState } from 'react'
import { useAppKitNetwork, useAppKitAccount, useAppKit } from '@reown/appkit/react'
import { AppKitNetwork } from '@reown/appkit/networks'
import { useSendTransaction } from 'wagmi'
import { ethers } from 'ethers'
import { IsHexAddress } from '@/utils/strings'
import { ERC20Abi } from '@/packages/web3/abi/erc20'
import { useSnackPresistStore } from '@/lib'
import { GetWalletConnectNetworkByChainids } from '@/utils/web3'
import { WalletConnectType } from '@/utils/types'
import { Button } from '@/components/ui/button'
import { Wallet, Send, Loader2, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'

const WalletConnectButton = (props: WalletConnectType) => {
  const [connectNetwork, setConnectNetwork] = useState<AppKitNetwork>()
  const [sending, setSending] = useState(false)

  const { chainId, switchNetwork } = useAppKitNetwork()
  const { open } = useAppKit()
  const { address, isConnected } = useAppKitAccount()
  const { data: hash, sendTransaction } = useSendTransaction()

  const { setSnackOpen, setSnackSeverity, setSnackMessage } = useSnackPresistStore((state) => state)

  const showError = (msg: string) => {
    setSnackSeverity('error')
    setSnackMessage(msg)
    setSnackOpen(true)
  }

  const isWrongNetwork = connectNetwork && connectNetwork.id !== chainId

  const handleSendTx = async () => {
    try {
      if (!connectNetwork) return
      if (isWrongNetwork) {
        showError(`Please switch to the correct network: ${connectNetwork.name}`)
        await open()
        return
      }
      if (!IsHexAddress(props.address)) return
      if (props.address === address) {
        showError('Sending and receiving address cannot be the same')
        return
      }

      setSending(true)
      if (props.contractAddress) {
        const value = ethers.parseUnits(String(props.value), props.decimals).toString()
        const iface = new ethers.Interface(ERC20Abi)
        const data = iface.encodeFunctionData('transfer', [props.address, value])
        sendTransaction({
          data: data as `0x${string}`,
          to: props.contractAddress as `0x${string}`,
          value: 0 as any,
        })
      } else {
        sendTransaction({
          to: props.address,
          value: ethers.parseEther(String(props.value)),
        })
      }
    } catch (e) {
      console.error(e)
      setSending(false)
    }
  }

  const onClickWalletConnect = async () => {
    try {
      if (!connectNetwork) return
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
    }
  }

  useEffect(() => {
    if (hash) {
      setSending(false)
      setSnackSeverity('success')
      setSnackMessage('Transaction sent successfully')
      setSnackOpen(true)
    }
  }, [hash])

  useEffect(() => {
    if (!props.chainIds || !props.address) return
    const network = GetWalletConnectNetworkByChainids(props.chainIds)
    if (network) setConnectNetwork(network)
  }, [props.chainIds, props.address])

  if (!connectNetwork) return null

  const buttonConfig = () => {
    if (sending)
      return {
        label: 'Sending...',
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
