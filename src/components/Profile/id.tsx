import { AccountCircle } from '@mui/icons-material';
import { Avatar, Box, Button, Container, Grid, Stack, Tab, Tabs, Typography } from '@mui/material';
import { useSnackPresistStore, useUserPresistStore } from 'lib';
import { useRouter } from 'next/router';
import { PROFILE_TAB_DATAS } from 'packages/constants';
import { useEffect, useState } from 'react';
import axios from 'utils/http/axios';
import { Http } from 'utils/http/http';
import ProfileProduct from './Product';
import EditProfileDialog from 'components/Dialog/EditProfileDialog';
import ProfileWallet from './Wallet';
import ProfileRepile from './Repile';
import ProfileNotification from './Notification';
import ProfileFollow from './Follow';

type UserType = {
  profile: ProfileType;
  products: ProductType[];
};

type ProfileType = {
  uuid: string;
  avatar_url: string;
  bio: string;
  username: string;
  email: string;
  invitation_code: string;
  created_time: number;
};

type ProductType = {
  product_id: number;
  title: string;
  body_html: string;
  product_type: string;
  tags: string;
  vendor: string;
  product_status: number;
  images: ProductImage[];
  options: ProductOption[];
};

type ProductImage = {
  src: string;
  width: number;
  height: number;
};

type ProductOption = {
  name: string;
  value: string;
};

const ProfileDetails = () => {
  const router = useRouter();
  const { id, tab } = router.query;

  const [user, setUser] = useState<UserType>();
  const [tabValue, setTabValue] = useState(0);
  const [openEditProfileDialog, setOpenEditProfileDialog] = useState<boolean>(false);

  const { getUuid } = useUserPresistStore((state) => state);
  const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore((state) => state);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    const tabId = Object.values(PROFILE_TAB_DATAS).find((item) => item.id === newValue)?.tabId;
    router.replace({
      pathname: router.pathname,
      query: { ...router.query, tab: tabId },
    });

    setTabValue(newValue);
  };

  const initTab = (tab: any) => {
    const tabId = Object.values(PROFILE_TAB_DATAS).find((item) => item.tabId === tab)?.id;
    setTabValue(tabId || 0);
  };

  useEffect(() => {
    tab && initTab(tab);
  }, [tab]);

  const init = async (username: any) => {
    try {
      if (!username || username === '') {
        setSnackSeverity('error');
        setSnackMessage('Incorrect username input');
        setSnackOpen(true);
        return;
      }

      const response: any = await axios.get(Http.user_profile_by_username, {
        params: {
          username: username,
        },
      });

      if (response.result) {
        setUser({
          profile: response.data.profile,
          products: response.data.products,
        });
      } else {
        setSnackSeverity('error');
        setSnackMessage(response.message);
        setSnackOpen(true);
      }
    } catch (e) {
      setSnackSeverity('error');
      setSnackMessage('The network error occurred. Please try again later.');
      setSnackOpen(true);
      console.error(e);
    }
  };

  useEffect(() => {
    if (id) {
      init(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onClickFollow = () => {};

  return (
    <Container>
      <Grid container spacing={8}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
            <Stack direction={'row'} alignItems={'center'}>
              {user?.profile.avatar_url ? (
                <Avatar sx={{ width: 100, height: 100 }} alt="Avatar" src={user?.profile.avatar_url} />
              ) : (
                <Avatar sx={{ width: 100, height: 100 }} alt="Avatar" src={'/images/default_avatar.png'} />
              )}
              <Box ml={4}>
                <Typography variant="h6">{user?.profile.username}</Typography>
                <Stack direction={'row'} alignItems={'center'} gap={1}>
                  <Typography>Code:</Typography>
                  <Typography fontWeight={'bold'}>{user?.profile.invitation_code}</Typography>
                </Stack>
              </Box>
            </Stack>

            {getUuid() === user?.profile.uuid && (
              <Button
                variant={'contained'}
                onClick={() => {
                  setOpenEditProfileDialog(true);
                }}
              >
                Edit
              </Button>
            )}
          </Stack>

          <Stack direction={'row'} alignItems={'center'} mt={2} gap={4}>
            <Box textAlign={'center'}>
              <Typography variant="h6">{user?.products.length || 0}</Typography>
              <Typography>Created products</Typography>
            </Box>
            <Box textAlign={'center'}>
              <Typography variant="h6">0</Typography>
              <Typography>Followers</Typography>
            </Box>
            <Box textAlign={'center'}>
              <Typography variant="h6">1</Typography>
              <Typography>Following</Typography>
            </Box>
          </Stack>

          <Box mt={2} sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={handleChange} variant="scrollable" scrollButtons="auto">
              {PROFILE_TAB_DATAS &&
                PROFILE_TAB_DATAS.length > 0 &&
                PROFILE_TAB_DATAS.map((item, index) => <Tab key={index} label={item.title} {...a11yProps(item.id)} />)}
            </Tabs>
          </Box>

          <CustomTabPanel value={tabValue} index={0}>
            {user?.products && <ProfileProduct product={user?.products} uuid={user?.profile.uuid} />}
          </CustomTabPanel>
          <CustomTabPanel value={tabValue} index={1}>
            <ProfileWallet uuid={user?.profile.uuid} />
          </CustomTabPanel>
          <CustomTabPanel value={tabValue} index={2}>
            <ProfileRepile />
          </CustomTabPanel>
          <CustomTabPanel value={tabValue} index={3}>
            <ProfileNotification />
          </CustomTabPanel>
          <CustomTabPanel value={tabValue} index={4}>
            <ProfileFollow />
          </CustomTabPanel>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Typography variant="h6">Who to follow</Typography>

          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} mt={2}>
            <Stack direction={'row'} alignItems={'center'}>
              <Avatar sx={{ width: 40, height: 40 }} alt="Avatar" src={'/images/default_avatar.png'} />
              <Box ml={2}>
                <Typography fontWeight={'bold'}>test123</Typography>
                <Stack direction={'row'} alignItems={'center'} gap={1}>
                  <Typography>123456</Typography>
                  <Typography>followers</Typography>
                </Stack>
              </Box>
            </Stack>

            <Button size="small" variant={'contained'} onClick={onClickFollow}>
              Follow
            </Button>
          </Stack>
          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} mt={2}>
            <Stack direction={'row'} alignItems={'center'}>
              <Avatar sx={{ width: 40, height: 40 }} alt="Avatar" src={'/images/default_avatar.png'} />
              <Box ml={2}>
                <Typography fontWeight={'bold'}>test123</Typography>
                <Stack direction={'row'} alignItems={'center'} gap={1}>
                  <Typography>123456</Typography>
                  <Typography>followers</Typography>
                </Stack>
              </Box>
            </Stack>

            <Button size="small" variant={'contained'} onClick={onClickFollow}>
              Follow
            </Button>
          </Stack>
          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} mt={2}>
            <Stack direction={'row'} alignItems={'center'}>
              <Avatar sx={{ width: 40, height: 40 }} alt="Avatar" src={'/images/default_avatar.png'} />
              <Box ml={2}>
                <Typography fontWeight={'bold'}>test123</Typography>
                <Stack direction={'row'} alignItems={'center'} gap={1}>
                  <Typography>123456</Typography>
                  <Typography>followers</Typography>
                </Stack>
              </Box>
            </Stack>

            <Button size="small" variant={'contained'} onClick={onClickFollow}>
              Follow
            </Button>
          </Stack>
        </Grid>
      </Grid>

      <EditProfileDialog
        avatarUrl={user?.profile.avatar_url}
        username={user?.profile.username}
        bio={user?.profile.bio}
        openDialog={openEditProfileDialog}
        setOpenDialog={setOpenEditProfileDialog}
      />
    </Container>
  );
};

export default ProfileDetails;

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Box>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
