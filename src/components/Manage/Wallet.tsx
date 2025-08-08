import { Box, Button, Card, CardContent, Chip, Divider, Stack, Switch, Typography } from '@mui/material';
import BindAddressDialog from 'components/Dialog/BindAddressDialog';
import { useSnackPresistStore, useUserPresistStore } from 'lib';
import Image from 'next/image';
import { BLOCKCHAIN, BLOCKCHAINNAMES, CHAINIDS, COINS } from 'packages/constants';
import { useEffect, useState } from 'react';
import { OmitMiddleString } from 'utils/strings';
import axios from 'utils/http/axios';
import { Http } from 'utils/http/http';

type WalletType = {
  address: string;
  chain_id: number;
  chain_name: string;
  disable_coin: string;
};

type Props = {
  uuid?: string;
  username?: string;
};

const ManageWallet = (props: Props) => {
  const [username, setUsername] = useState<string>('');
  const [wallets, setWallets] = useState<WalletType[]>([]);

  const [selectChain, setSelectChain] = useState<CHAINIDS>(CHAINIDS.BITCOIN);
  const [selectAddress, setSelectAddress] = useState<string>();

  const [openEditAddressDialog, setOpenEditAddressDialog] = useState<boolean>(false);

  const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore((state) => state);
  const { getIsLogin, getUuid } = useUserPresistStore((state) => state);

  const init = async (username: string) => {
    try {
      if (!username || username === '') {
        setSnackSeverity('error');
        setSnackMessage('Incorrect username input');
        setSnackOpen(true);
        return;
      }

      const response: any = await axios.get(Http.wallet_by_username, {
        params: {
          username: props.username,
        },
      });

      if (response.result) {
        setWallets(response.data);
      } else {
        setWallets([]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (props.username) {
      setUsername(props.username);
      init(props.username);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.username]);

  const onChangeCoin = async (chain: CHAINIDS, coin: COINS) => {
    let disableCoinArray = wallets
      .find((item) => item.chain_id === chain)
      ?.disable_coin.split(',')
      .filter((item) => item !== '');
    let newDisableCoin = '';
    if (disableCoinArray?.includes(coin)) {
      newDisableCoin = disableCoinArray.filter((item) => item !== coin).join(',');
    } else {
      disableCoinArray?.push(coin);
      newDisableCoin = disableCoinArray?.join(',') as string;
    }

    const response: any = await axios.put(Http.wallet, {
      handle: 2,
      chain_id: chain,
      disable_coin: newDisableCoin,
    });

    if (response.result) {
      await init(username);

      setSnackSeverity('success');
      setSnackMessage('Update successfully');
      setSnackOpen(true);
    } else {
      setSnackSeverity('error');
      setSnackMessage(response.message);
      setSnackOpen(true);
    }
  };

  const handleCloseDialog = async () => {
    setSelectChain(CHAINIDS.BITCOIN);
    setSelectAddress('');
    await init(username);
    setOpenEditAddressDialog(false);
  };

  return (
    <Box>
      <Typography variant="h6">Setup wallet</Typography>

      {getIsLogin() && getUuid() === props.uuid ? (
        <Box mt={2}>
          {BLOCKCHAINNAMES &&
            BLOCKCHAINNAMES.map((item, index) => (
              <Box key={index} pb={2}>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                  <Stack direction={'row'} alignItems={'center'} gap={2}>
                    <Typography variant="h6">{item.name}</Typography>
                    {(wallets.find((walletItem) => walletItem.chain_id === item.chainId)?.address as string) && (
                      <Chip
                        label={OmitMiddleString(
                          wallets.find((walletItem) => walletItem.chain_id === item.chainId)?.address as string,
                        )}
                        color="primary"
                      />
                    )}
                  </Stack>
                  <Button
                    variant={'contained'}
                    color={'success'}
                    onClick={() => {
                      setSelectChain(item.chainId);
                      setSelectAddress(
                        wallets.find((walletItem) => walletItem.chain_id === item.chainId)?.address as string,
                      );
                      setOpenEditAddressDialog(true);
                    }}
                  >
                    Bind Address
                  </Button>
                </Stack>
                {item.coins &&
                  item.coins.map((coinItem, coinIndex) => (
                    <Stack
                      direction={'row'}
                      alignItems={'center'}
                      justifyContent={'space-between'}
                      key={coinIndex}
                      py={2}
                    >
                      <Stack direction={'row'} alignItems={'center'} gap={1}>
                        <Image src={coinItem.icon} alt={'image'} width={50} height={50} />
                        <Typography>{coinItem.name}</Typography>
                      </Stack>
                      <Switch
                        checked={
                          wallets
                            .find((walletItem) => walletItem.chain_id === item.chainId)
                            ?.disable_coin.split(',')
                            .includes(coinItem.name)
                            ? false
                            : true
                        }
                        onChange={() => {
                          onChangeCoin(item.chainId, coinItem.name);
                        }}
                      />
                    </Stack>
                  ))}
                <Divider />
              </Box>
            ))}

          <BindAddressDialog
            chain={selectChain}
            address={selectAddress}
            openDialog={openEditAddressDialog}
            handleCloseDialog={handleCloseDialog}
          />
        </Box>
      ) : (
        <Box mt={2}>
          <Card>
            <CardContent>
              <Typography>Not found</Typography>
            </CardContent>
          </Card>
        </Box>
      )}
    </Box>
  );
};

export default ManageWallet;
