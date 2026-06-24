// import { useSnackPresistStore, useUserPresistStore } from 'lib';
// import { useRouter } from 'next/router';
// import { PROFILE_TAB_DATAS } from 'packages/constants';
// import { useEffect, useState } from 'react';
// import axios from 'utils/http/axios';
// import { Http } from 'utils/http/http';
// import ProfileProduct from './Product';
// import EditProfileDialog from 'components/Dialog/EditProfileDialog';
// import ProfileRepile from './Repile';
// import ProfileFollow from './Follow';
// import { UserType } from 'utils/types';
// import { a11yProps, CustomTabPanel } from 'components/Tab';

// const ProfileDetails = () => {
//   const router = useRouter();
//   const { id, tab } = router.query;

//   const [user, setUser] = useState<UserType>();
//   const [tabValue, setTabValue] = useState(0);
//   const [openEditProfileDialog, setOpenEditProfileDialog] = useState<boolean>(false);

//   const { getUuid, getIsLogin } = useUserPresistStore((state) => state);
//   const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore((state) => state);

//   const handleChange = (event: React.SyntheticEvent, newValue: number) => {
//     const tabId = Object.values(PROFILE_TAB_DATAS).find((item) => item.id === newValue)?.tabId;
//     router.replace({
//       pathname: router.pathname,
//       query: { ...router.query, tab: tabId },
//     });

//     setTabValue(newValue);
//   };

//   const initTab = (tab: any) => {
//     const tabId = Object.values(PROFILE_TAB_DATAS).find((item) => item.tabId === tab)?.id;
//     setTabValue(tabId || 0);
//   };

//   useEffect(() => {
//     tab && initTab(tab);
//   }, [tab]);

//   const init = async (username: any) => {
//     try {
//       if (!username || username === '') {
//         setSnackSeverity('error');
//         setSnackMessage('Incorrect username input');
//         setSnackOpen(true);
//         return;
//       }

//       const response: any = await axios.get(Http.user_profile_by_username, {
//         params: {
//           username: username,
//         },
//       });

//       if (response.result) {
//         setUser({
//           profile: response.data.profile,
//           products: response.data.products,
//         });
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
//       init(id);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [id]);

//   const onClickFollow = () => {};

//   return (
//     <Container>
//       <Grid container spacing={8}>
//         <Grid size={{ xs: 12, md: 8 }}>
//           <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
//             <Stack direction={'row'} alignItems={'center'}>
//               {user?.profile.avatar_url ? (
//                 <Avatar sx={{ width: 100, height: 100 }} alt="Avatar" src={user?.profile.avatar_url} />
//               ) : (
//                 <Avatar sx={{ width: 100, height: 100 }} alt="Avatar" src={'/images/default_avatar.png'} />
//               )}
//               <Box ml={4}>
//                 <Typography variant="h6">{user?.profile.username}</Typography>
//                 <Stack direction={'row'} alignItems={'center'} gap={1}>
//                   <Typography>Email:</Typography>
//                   <Typography fontWeight={'bold'}>{user?.profile.email}</Typography>
//                 </Stack>
//                 {user?.profile.bio && (
//                   <Stack direction={'row'} alignItems={'center'} gap={1}>
//                     <Typography>Bio:</Typography>
//                     <Typography fontWeight={'bold'}>{user?.profile.bio}</Typography>
//                   </Stack>
//                 )}
//               </Box>
//             </Stack>

//             {getUuid() === user?.profile.uuid && (
//               <Button
//                 variant={'contained'}
//                 onClick={() => {
//                   setOpenEditProfileDialog(true);
//                 }}
//               >
//                 Edit
//               </Button>
//             )}
//           </Stack>

//           <Stack direction={'row'} alignItems={'center'} mt={2} gap={4}>
//             <Box textAlign={'center'}>
//               <Typography variant="h6">0</Typography>
//               <Typography>Followers</Typography>
//             </Box>
//             <Box textAlign={'center'}>
//               <Typography variant="h6">0</Typography>
//               <Typography>Following</Typography>
//             </Box>
//             <Box textAlign={'center'}>
//               <Typography variant="h6">{user?.products?.length || 0}</Typography>
//               <Typography>Created products</Typography>
//             </Box>
//           </Stack>

//           <Box mt={2} sx={{ borderBottom: 1, borderColor: 'divider' }}>
//             <Tabs value={tabValue} onChange={handleChange} variant="scrollable" scrollButtons="auto">
//               {PROFILE_TAB_DATAS &&
//                 PROFILE_TAB_DATAS.length > 0 &&
//                 PROFILE_TAB_DATAS.map((item, index) => <Tab key={index} label={item.title} {...a11yProps(item.id)} />)}
//             </Tabs>
//           </Box>

//           <CustomTabPanel value={tabValue} index={0}>
//             <ProfileProduct product={user?.products} uuid={user?.profile.uuid} />
//           </CustomTabPanel>
//           <CustomTabPanel value={tabValue} index={1}>
//             <ProfileRepile uuid={user?.profile.uuid} />
//           </CustomTabPanel>
//           <CustomTabPanel value={tabValue} index={2}>
//             <ProfileFollow uuid={user?.profile.uuid} />
//           </CustomTabPanel>
//         </Grid>
//         <Grid size={{ xs: 12, md: 4 }}>
//           {getIsLogin() && (
//             <Box>
//               {/* <Typography variant="h6">Who to follow</Typography> */}

//               {/* <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} mt={2}>
//             <Stack direction={'row'} alignItems={'center'}>
//               <Avatar sx={{ width: 40, height: 40 }} alt="Avatar" src={'/images/default_avatar.png'} />
//               <Box ml={2}>
//                 <Typography fontWeight={'bold'}>test123</Typography>
//                 <Stack direction={'row'} alignItems={'center'} gap={1}>
//                   <Typography>123456</Typography>
//                   <Typography>followers</Typography>
//                 </Stack>
//               </Box>
//             </Stack>

//             <Button size="small" variant={'contained'} onClick={onClickFollow}>
//               Follow
//             </Button>
//           </Stack> */}
//             </Box>
//           )}
//         </Grid>
//       </Grid>

//       <EditProfileDialog
//         avatarUrl={user?.profile.avatar_url}
//         username={user?.profile.username}
//         bio={user?.profile.bio}
//         openDialog={openEditProfileDialog}
//         setOpenDialog={setOpenEditProfileDialog}
//       />
//     </Container>
//   );
// };

// export default ProfileDetails;

import { useSnackPresistStore, useUserPresistStore } from 'lib';
import { useRouter } from 'next/router';
import { PROFILE_TAB_DATAS } from 'packages/constants';
import { useEffect, useState } from 'react';
import axios from 'utils/http/axios';
import { Http } from 'utils/http/http';

import ProfileProduct from './Product';
import EditProfileDialog from 'components/Dialog/EditProfileDialog';
import ProfileRepile from './Repile';
import ProfileFollow from './Follow';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { User, Edit } from 'lucide-react';
import { UserType } from 'utils/types';

const ProfileDetails = () => {
  const router = useRouter();
  const { id, tab } = router.query;

  const [user, setUser] = useState<UserType>();
  const [activeTab, setActiveTab] = useState('products');
  const [openEditProfileDialog, setOpenEditProfileDialog] = useState<boolean>(false);

  const { getUuid, getIsLogin } = useUserPresistStore((state) => state);
  const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore((state) => state);

  // 处理路由中的 tab 参数
  useEffect(() => {
    if (tab) {
      const matchedTab = PROFILE_TAB_DATAS.find((item) => item.tabId === tab);
      setActiveTab(matchedTab?.tabId || 'products');
    }
  }, [tab]);

  const handleTabChange = (value: string) => {
    router.replace({
      pathname: router.pathname,
      query: { ...router.query, tab: value },
    });
    setActiveTab(value);
  };

  const init = async (username: any) => {
    try {
      if (!username) {
        setSnackSeverity('error');
        setSnackMessage('Incorrect username input');
        setSnackOpen(true);
        return;
      }

      const response: any = await axios.get(Http.user_profile_by_username, {
        params: { username },
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
    if (id) init(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const isOwnProfile = getUuid() === user?.profile?.uuid;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-8 space-y-8">
          {/* Profile Header */}
          <Card>
            <CardContent className="p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <Avatar className="w-28 h-28 border-4 border-background shadow-lg">
                    <AvatarImage src={user?.profile?.avatar_url} alt={user?.profile?.username} />
                    <AvatarFallback>
                      <User className="w-14 h-14 text-muted-foreground" />
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <h1 className="text-3xl font-bold tracking-tight">{user?.profile?.username}</h1>
                    <div className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                      <p>
                        <span className="font-medium text-foreground">Email:</span> {user?.profile?.email}
                      </p>
                      {user?.profile?.bio && (
                        <p>
                          <span className="font-medium text-foreground">Bio:</span> {user.profile.bio}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {isOwnProfile && (
                  <Button onClick={() => setOpenEditProfileDialog(true)} className="gap-2">
                    <Edit className="w-4 h-4" />
                    Edit Profile
                  </Button>
                )}
              </div>

              {/* Stats */}
              <div className="mt-10 grid grid-cols-3 gap-6 text-center border-t pt-8">
                <div>
                  <p className="text-3xl font-semibold">0</p>
                  <p className="text-sm text-muted-foreground mt-1">Followers</p>
                </div>
                <div>
                  <p className="text-3xl font-semibold">0</p>
                  <p className="text-sm text-muted-foreground mt-1">Following</p>
                </div>
                <div>
                  <p className="text-3xl font-semibold">{user?.products?.length || 0}</p>
                  <p className="text-sm text-muted-foreground mt-1">Created products</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="grid w-full grid-cols-3 mb-6">
              {PROFILE_TAB_DATAS.map((item) => (
                <TabsTrigger key={item.id} value={item.tabId}>
                  {item.title}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="products" className="mt-0">
              <ProfileProduct product={user?.products} uuid={user?.profile?.uuid} />
            </TabsContent>

            <TabsContent value="repile" className="mt-0">
              <ProfileRepile uuid={user?.profile?.uuid} />
            </TabsContent>

            <TabsContent value="follow" className="mt-0">
              <ProfileFollow uuid={user?.profile?.uuid} />
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4">
          {getIsLogin() && (
            <Card>
              <CardContent className="p-6">{/* Who to follow 可以后续在这里添加 */}</CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Edit Profile Dialog */}
      <EditProfileDialog
        avatarUrl={user?.profile?.avatar_url}
        username={user?.profile?.username}
        bio={user?.profile?.bio}
        openDialog={openEditProfileDialog}
        setOpenDialog={setOpenEditProfileDialog}
      />
    </div>
  );
};

export default ProfileDetails;
