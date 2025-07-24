import { Box, Button, Card, CardContent, Chip, Divider, Stack, Switch, Typography } from '@mui/material';
import BindAddressDialog from 'components/Dialog/BindAddressDialog';
import { useSnackPresistStore, useUserPresistStore } from 'lib';
import Image from 'next/image';
import { BLOCKCHAINNAMES, CHAINIDS } from 'packages/constants';
import { useState } from 'react';
import { OmitMiddleString } from 'utils/strings';

type Props = {
  uuid?: string;
};

const ProfileWallet = (props: Props) => {
  const [openEditAddressDialog, setOpenEditAddressDialog] = useState<boolean>(false);

  const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore((state) => state);
  const { getIsLogin, getUuid } = useUserPresistStore((state) => state);

  return (
    <Box>
      <Typography variant="h6">Setup Wallet</Typography>

      {getIsLogin() && getUuid() === props.uuid ? (
        <Box mt={2}>
          {BLOCKCHAINNAMES &&
            BLOCKCHAINNAMES.map((item, index) => (
              <Box key={index} pb={2}>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                  <Stack direction={'row'} alignItems={'center'} gap={2}>
                    <Typography variant="h6">{item.name}</Typography>
                    <Chip label={OmitMiddleString('0x08Ad9251e85B7b687b655e3654d47C9d463857FF')} color="primary" />
                  </Stack>

                  <Button
                    variant={'contained'}
                    color={'success'}
                    onClick={() => {
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
                        checked={true}
                        onChange={() => {
                          // setShowDetectLanguage(!showDetectLanguage);
                        }}
                      />
                    </Stack>
                  ))}
                <Divider />
              </Box>
            ))}

          <BindAddressDialog
            chain={CHAINIDS.BITCOIN}
            address={''}
            openDialog={openEditAddressDialog}
            setOpenDialog={setOpenEditAddressDialog}
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

export default ProfileWallet;
