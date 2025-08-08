import { Box, Container, Tab, Tabs, Typography } from '@mui/material';
import { useSnackPresistStore, useUserPresistStore } from 'lib';
import { useRouter } from 'next/router';
import { MANAGE_TAB_DATAS } from 'packages/constants';
import { useEffect, useState } from 'react';
import axios from 'utils/http/axios';
import { Http } from 'utils/http/http';
import ManageOrder from './Order';
import ManageWallet from './Wallet';
import ManageAddress from './Address';
import ManageNotification from './Notification';

type ProfileType = {
  uuid: string;
  avatar_url: string;
  bio: string;
  username: string;
  email: string;
  invitation_code: string;
  created_time: number;
};

type UserType = {
  profile: ProfileType;
};

const ManageDetails = () => {
  const router = useRouter();
  const { id, tab } = router.query;

  const [user, setUser] = useState<UserType>();
  const [tabValue, setTabValue] = useState(0);

  const { getUuid } = useUserPresistStore((state) => state);
  const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore((state) => state);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    const tabId = Object.values(MANAGE_TAB_DATAS).find((item) => item.id === newValue)?.tabId;
    router.replace({
      pathname: router.pathname,
      query: { ...router.query, tab: tabId },
    });

    setTabValue(newValue);
  };

  const initTab = (tab: any) => {
    const tabId = Object.values(MANAGE_TAB_DATAS).find((item) => item.tabId === tab)?.id;
    setTabValue(tabId || 0);
  };

  useEffect(() => {
    tab && initTab(tab);
  }, [tab]);

  const init = async (username: any) => {
    try {
      if (!getUuid() || getUuid() === '') {
        setSnackSeverity('error');
        setSnackMessage('Need login');
        setSnackOpen(true);
        return;
      }

      const response: any = await axios.get(Http.user_manage_by_uuid, {
        params: {
          uuid: getUuid(),
        },
      });

      if (response.result) {
        setUser({
          profile: response.data.profile,
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

  return (
    <Container>
      <Typography variant="h6">User Management</Typography>
      <Box mt={2} sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleChange} variant="scrollable" scrollButtons="auto">
          {MANAGE_TAB_DATAS &&
            MANAGE_TAB_DATAS.length > 0 &&
            MANAGE_TAB_DATAS.map((item, index) => <Tab key={index} label={item.title} {...a11yProps(item.id)} />)}
        </Tabs>
      </Box>

      <CustomTabPanel value={tabValue} index={0}>
        <ManageOrder uuid={user?.profile.uuid} />
      </CustomTabPanel>
      <CustomTabPanel value={tabValue} index={1}>
        <ManageWallet uuid={user?.profile.uuid} username={user?.profile.username} />
      </CustomTabPanel>
      <CustomTabPanel value={tabValue} index={2}>
        <ManageAddress uuid={user?.profile.uuid} username={user?.profile.username} />
      </CustomTabPanel>
      <CustomTabPanel value={tabValue} index={3}>
        <ManageNotification uuid={user?.profile.uuid} username={user?.profile.username} />
      </CustomTabPanel>
    </Container>
  );
};

export default ManageDetails;

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
