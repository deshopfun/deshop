// import { useSnackPresistStore, useUserPresistStore } from 'lib';
// import { useRouter } from 'next/router';
// import { MANAGE_TAB_DATAS } from 'packages/constants';
// import { useEffect, useState } from 'react';
// import axios from 'utils/http/axios';
// import { Http } from 'utils/http/http';
// import ManageOrder from './Order';
// import ManageWallet from './Wallet';
// import ManageAddress from './Address';
// import ManageNotification from './Notification';
// import ManageSetting from './Setting';
// import ManageProduct from './Product';
// import { UserType } from 'utils/types';
// import { a11yProps, CustomTabPanel } from 'components/Tab';

// const ManageDetails = () => {
//   const router = useRouter();
//   const { id, tab } = router.query;

//   const [user, setUser] = useState<UserType>();
//   const [tabValue, setTabValue] = useState(0);

//   const { getUuid } = useUserPresistStore((state) => state);
//   const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore((state) => state);

//   const handleChange = (event: React.SyntheticEvent, newValue: number) => {
//     const tabId = Object.values(MANAGE_TAB_DATAS).find((item) => item.id === newValue)?.tabId;
//     router.replace({
//       pathname: router.pathname,
//       query: { ...router.query, tab: tabId },
//     });

//     setTabValue(newValue);
//   };

//   const initTab = (tab: any) => {
//     const tabId = Object.values(MANAGE_TAB_DATAS).find((item) => item.tabId === tab)?.id;
//     setTabValue(tabId || 0);
//   };

//   useEffect(() => {
//     tab && initTab(tab);
//   }, [tab]);

//   const init = async () => {
//     try {
//       if (!getUuid() || getUuid() === '') {
//         setSnackSeverity('error');
//         setSnackMessage('Need login');
//         setSnackOpen(true);
//         return;
//       }

//       const response: any = await axios.get(Http.user_manage);

//       if (response.result) {
//         setUser(response.data);
//       } else {
//         setSnackSeverity('error');
//         setSnackMessage(response.message);
//         setSnackOpen(true);
//       }
//     } catch (e) {
//       setSnackSeverity('error');
//       setSnackMessage('The network error occurred. Please try again later.');
//       setSnackOpen(true);
//       console.error(e);
//     }
//   };

//   useEffect(() => {
//     if (id) {
//       init();
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [id]);

//   return (
//     <Container>
//       <Typography variant="h6" mb={2}>
//         User Management
//       </Typography>
//       {id === user?.profile.username ? (
//         <Box>
//           <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
//             <Tabs value={tabValue} onChange={handleChange} variant="scrollable" scrollButtons="auto">
//               {MANAGE_TAB_DATAS &&
//                 MANAGE_TAB_DATAS.length > 0 &&
//                 MANAGE_TAB_DATAS.map((item, index) => <Tab key={index} label={item.title} {...a11yProps(item.id)} />)}
//             </Tabs>
//           </Box>

//           <CustomTabPanel value={tabValue} index={0}>
//             <ManageProduct />
//           </CustomTabPanel>
//           <CustomTabPanel value={tabValue} index={1}>
//             <ManageOrder />
//           </CustomTabPanel>
//           <CustomTabPanel value={tabValue} index={2}>
//             <ManageWallet />
//           </CustomTabPanel>
//           {/* <CustomTabPanel value={tabValue} index={3}>
//             <ManageAddress />
//           </CustomTabPanel> */}
//           <CustomTabPanel value={tabValue} index={3}>
//             <ManageNotification />
//           </CustomTabPanel>
//           <CustomTabPanel value={tabValue} index={4}>
//             <ManageSetting />
//           </CustomTabPanel>
//         </Box>
//       ) : (
//         <Card>
//           <CardContent>
//             <Box py={2} textAlign={'center'}>
//               <Typography variant="h6">not found the page</Typography>
//               <Typography mt={2}>No information was found about the manage.</Typography>
//             </Box>
//           </CardContent>
//         </Card>
//       )}
//     </Container>
//   );
// };

// export default ManageDetails;

import { useSnackPresistStore, useUserPresistStore } from '@/lib'
import { useRouter } from 'next/router'
import { MANAGE_TAB_DATAS } from '@/packages/constants'
import { useEffect, useState } from 'react'
import axios from '@/utils/http/axios'
import { Http } from '@/utils/http/http'
import ManageOrder from './Order'
import ManageWallet from './Wallet'
import ManageNotification from './Notification'
import ManageSetting from './Setting'
import ManageProduct from './Product'
import { UserType } from '@/utils/types'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { ShieldAlert, LayoutDashboard } from 'lucide-react'
import { Button } from '@/components/ui/button'

const ManageDetails = () => {
  const router = useRouter()
  const { id, tab } = router.query

  const [user, setUser] = useState<UserType>()
  const [tabValue, setTabValue] = useState('0')

  const { getUuid } = useUserPresistStore((state) => state)
  const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore((state) => state)

  const showError = (msg: string) => { setSnackSeverity('error'); setSnackMessage(msg); setSnackOpen(true) }

  const handleTabChange = (value: string) => {
    const tabId = MANAGE_TAB_DATAS.find((item) => item.id === Number(value))?.tabId
    router.replace({ pathname: router.pathname, query: { ...router.query, tab: tabId } })
    setTabValue(value)
  }

  useEffect(() => {
    if (tab) {
      const tabId = MANAGE_TAB_DATAS.find((item) => item.tabId === tab)?.id
      setTabValue(String(tabId ?? 0))
    }
  }, [tab])

  const init = async () => {
    if (!getUuid()) return showError('Need login')
    try {
      const response: any = await axios.get(Http.user_manage)
      if (response.result) {
        setUser(response.data)
      } else {
        showError(response.message)
      }
    } catch { showError('Network error. Please try again later.') }
  }

  useEffect(() => { if (id) init() }, [id])

  const tabComponents: Record<string, React.ReactNode> = {
    '0': <ManageProduct />,
    '1': <ManageOrder />,
    '2': <ManageWallet />,
    '3': <ManageNotification />,
    '4': <ManageSetting />,
  }

  return (
    <div className="container mx-auto py-8 px-4 flex flex-col gap-6">

      {/* 页面标题 */}
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-sky-50 flex items-center justify-center">
          <LayoutDashboard className="h-5 w-5 text-sky-500" />
        </div>
        <div>
          <h1 className="text-xl font-bold">User Management</h1>
          <p className="text-sm text-muted-foreground">Manage your products, orders, wallet and settings</p>
        </div>
      </div>

      {id === user?.profile.username ? (
        <Tabs value={tabValue} onValueChange={handleTabChange}>

          {/* Tab 导航 */}
          <TabsList className="w-full justify-start overflow-x-auto h-auto p-1 bg-gray-100 rounded-xl gap-1 flex-wrap">
            {MANAGE_TAB_DATAS.map((item) => (
              <TabsTrigger
                key={item.id}
                value={String(item.id)}
                className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-sky-600 text-sm font-medium"
              >
                {item.title}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Tab 内容 */}
          {Object.entries(tabComponents).map(([key, component]) => (
            <TabsContent key={key} value={key} className="mt-4">
              {component}
            </TabsContent>
          ))}

        </Tabs>
      ) : (
        // 无权限状态
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
          <div className="h-16 w-16 rounded-full bg-red-50 flex items-center justify-center">
            <ShieldAlert className="h-8 w-8 text-red-400" />
          </div>
          <div>
            <p className="font-semibold text-gray-800">Page Not Found</p>
            <p className="text-sm text-muted-foreground mt-1">
              You don't have permission to view this management page.
            </p>
          </div>
          <Button
            variant="outline"
            className="mt-2"
            onClick={() => { window.location.href = '/' }}
          >
            Back to Home
          </Button>
        </div>
      )}

    </div>
  )
}

export default ManageDetails