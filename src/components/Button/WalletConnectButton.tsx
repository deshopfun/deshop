import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { Send } from '@mui/icons-material';
import { AppKit, createAppKit, useAppKitNetwork } from '@reown/appkit/react';
import { AppKitNetwork } from '@reown/appkit/networks';
import { CHAINIDS } from 'packages/constants/blockchain';
import { useAppKitAccount } from '@reown/appkit/react';
import { useSendTransaction } from 'wagmi';
import { Hex, parseGwei, type Address } from 'viem';
import { useAppKit } from '@reown/appkit/react';
import { ethers } from 'ethers';
import { IsHexAddress } from 'utils/strings';
import { ERC20Abi } from 'packages/web3/abi/erc20';
import { useSnackPresistStore } from 'lib';
import { GetWalletConnectNetworkByChainids } from 'utils/web3';

type WalletConnectType = {
  chainIds: CHAINIDS;
  address: string;
  contractAddress?: string;
  decimals?: number;
  value: string;
  buttonSize?: 'small' | 'medium' | 'large';
  buttonVariant?: 'text' | 'outlined' | 'contained';
  fullWidth?: boolean;
  color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
};

const WalletConnectButton = (props: WalletConnectType) => {
  const [connectNetwork, setConnectNetwork] = useState<AppKitNetwork>();
  const { chainId, switchNetwork } = useAppKitNetwork();

  const { setSnackOpen, setSnackSeverity, setSnackMessage } = useSnackPresistStore((state) => state);

  const { open, close } = useAppKit();
  const { address, isConnected } = useAppKitAccount();

  const { data: hash, sendTransaction } = useSendTransaction();

  const handleSendTx = async () => {
    try {
      if (!connectNetwork) return;

      if (connectNetwork.id != chainId) {
        setSnackSeverity('error');
        setSnackMessage(
          'The current network is incorrect, please switch to the correct network environment: ' + connectNetwork.name,
        );
        setSnackOpen(true);
        await open();
        return;
      }

      if (!IsHexAddress(props.address)) {
        return;
      }

      if (props.address === address) {
        setSnackSeverity('error');
        setSnackMessage('The sending address and receiving address are the same');
        setSnackOpen(true);
        return;
      }

      if (props.contractAddress) {
        const value = ethers.parseUnits(String(props.value), props.decimals).toString();
        const iface = new ethers.Interface(ERC20Abi);
        const data = iface.encodeFunctionData('transfer', [props.address, value]);

        sendTransaction({
          data: data as `0x${string}`,
          to: props.contractAddress as `0x${string}`,
          value: 0 as any,
        });
      } else {
        sendTransaction({
          to: props.address,
          value: ethers.parseEther(String(props.value)),
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const onClickWalletConnect = async () => {
    try {
      if (!connectNetwork) {
        return;
      }

      if (connectNetwork.id != chainId) {
        switchNetwork(connectNetwork);
        return;
      }

      if (isConnected) {
        await handleSendTx();
      } else {
        await open();
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (hash) {
      setSnackSeverity('success');
      setSnackMessage('You sent a transaction successfully');
      setSnackOpen(true);
    }
  }, [hash, setSnackSeverity, setSnackMessage, setSnackOpen]);

  useEffect(() => {
    if (!props.chainIds || !props.address) {
      return;
    }

    const connectNetwork = GetWalletConnectNetworkByChainids(props.chainIds);

    if (!connectNetwork) {
      return;
    }

    setConnectNetwork(connectNetwork);
  }, [props.chainIds, props.address]);

  return (
    <>
      {connectNetwork && (
        <Button
          color={props.color ? props.color : 'primary'}
          fullWidth={props.fullWidth}
          variant={props.buttonVariant ? props.buttonVariant : 'contained'}
          size={props.buttonSize ? props.buttonSize : 'medium'}
          endIcon={<Send />}
          onClick={() => {
            onClickWalletConnect();
          }}
        >
          {isConnected ? 'Send Transaction' : 'Connect Wallet'}
        </Button>
      )}
    </>
  );
};

export default WalletConnectButton;
