// import { useSnackPresistStore, useUserPresistStore } from 'lib';
// import { useEffect, useState } from 'react';
// import axios from 'utils/http/axios';
// import { Http } from 'utils/http/http';
// import { NOTIFICATIONS } from 'packages/constants/notification';
// import { NotificationType } from 'utils/types';

// const Notification = () => {
//   const [notifications, setNotifications] = useState<NotificationType[]>([]);

//   const { setSnackOpen, setSnackMessage, setSnackSeverity } = useSnackPresistStore((state) => state);
//   const { getIsLogin } = useUserPresistStore((state) => state);

//   const init = async () => {
//     try {
//       if (!getIsLogin || !getIsLogin()) {
//         return;
//       }

//       const response: any = await axios.get(Http.user_notification);

//       if (response.result) {
//         setNotifications(response.data);
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
//     init();
//   }, []);

//   const onClickSeen = async (kind: number, id?: number) => {
//     try {
//       const response: any = await axios.put(Http.user_notification, {
//         kind: kind,
//         notification_id: kind === 2 ? id : undefined,
//       });
//       if (response.result) {
//         await init();
//         setSnackSeverity('success');
//         setSnackMessage('Update successfully');
//         setSnackOpen(true);
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

//   return (
//     <Container>
//       <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
//         <Typography variant="h6" mb={4}>
//           Notifications
//         </Typography>
//         {notifications && notifications.length > 0 && (
//           <Button
//             color={'success'}
//             variant={'contained'}
//             onClick={() => {
//               onClickSeen(1);
//             }}
//           >
//             Mark all seen
//           </Button>
//         )}
//       </Stack>
//       {notifications && notifications.length > 0 ? (
//         <TableContainer component={Paper}>
//           <Table sx={{ minWidth: 650 }} aria-label="simple table">
//             <TableHead>
//               <TableRow>
//                 <TableCell>Title</TableCell>
//                 <TableCell>Type</TableCell>
//                 <TableCell>Description</TableCell>
//                 <TableCell>Date</TableCell>
//                 <TableCell align="right">Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {notifications.map((row, rowId) => (
//                 <TableRow key={rowId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
//                   <TableCell>
//                     <Typography fontWeight={'bold'}>{row.title}</Typography>
//                   </TableCell>
//                   <TableCell component="th" scope="row">
//                     <Chip
//                       label={NOTIFICATIONS.find((item) => item.id === row.notification_type)?.title}
//                       color="primary"
//                     />
//                   </TableCell>
//                   <TableCell>{row.description}</TableCell>
//                   <TableCell component="th" scope="row">
//                     {new Date(row.create_time).toLocaleString()}
//                   </TableCell>
//                   <TableCell align="right">
//                     <Stack direction={'row'} alignItems={'center'} justifyContent={'right'} gap={1}>
//                       <Button
//                         size={'small'}
//                         variant={'contained'}
//                         onClick={() => {
//                           window.location.href = row.url;
//                         }}
//                       >
//                         Check
//                       </Button>
//                       {row.is_read === 2 && (
//                         <Button
//                           color="success"
//                           size={'small'}
//                           variant={'contained'}
//                           onClick={() => {
//                             onClickSeen(2, row.notification_id);
//                           }}
//                         >
//                           Mark as seen
//                         </Button>
//                       )}
//                     </Stack>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       ) : (
//         <Card>
//           <CardContent>
//             <Box py={2} textAlign={'center'}>
//               <Typography variant="h6">not found the notification</Typography>
//               <Typography mt={2}>No information was found about the notification.</Typography>
//             </Box>
//           </CardContent>
//         </Card>
//       )}
//     </Container>
//   );
// };

// export default Notification;

import { useSnackPresistStore, useUserPresistStore } from 'lib'
import { useEffect, useState } from 'react'
import axios from 'utils/http/axios'
import { Http } from 'utils/http/http'
import { NOTIFICATIONS } from 'packages/constants/notification'
import { NotificationType } from 'utils/types'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Bell, BellOff, CheckCheck, ExternalLink, Eye } from 'lucide-react'
import { cn } from '@/lib/utils'

const Notification = () => {
  const [notifications, setNotifications] = useState<NotificationType[]>([])

  const { setSnackOpen, setSnackMessage, setSnackSeverity } = useSnackPresistStore((state) => state)
  const { getIsLogin } = useUserPresistStore((state) => state)

  const showError = (msg: string) => { setSnackSeverity('error'); setSnackMessage(msg); setSnackOpen(true) }
  const showSuccess = (msg: string) => { setSnackSeverity('success'); setSnackMessage(msg); setSnackOpen(true) }

  const init = async () => {
    if (!getIsLogin?.()) return
    try {
      const response: any = await axios.get(Http.user_notification)
      if (response.result) {
        setNotifications(response.data)
      } else {
        showError(response.message)
      }
    } catch { showError('Network error. Please try again later.') }
  }

  const onClickSeen = async (kind: number, id?: number) => {
    try {
      const response: any = await axios.put(Http.user_notification, {
        kind,
        notification_id: kind === 2 ? id : undefined,
      })
      if (response.result) {
        await init()
        showSuccess('Marked as seen')
      } else {
        showError(response.message)
      }
    } catch { showError('Network error. Please try again later.') }
  }

  useEffect(() => { init() }, [])

  const unreadCount = notifications?.filter((n) => n.is_read === 2).length

  return (
    <div className="container mx-auto py-8 px-4 flex flex-col gap-6">

      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-sky-50 flex items-center justify-center">
            <Bell className="h-5 w-5 text-sky-500" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Notifications</h1>
            <p className="text-sm text-muted-foreground">
              {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up'}
            </p>
          </div>
        </div>
        {notifications?.length > 0 && unreadCount > 0 && (
          <Button
            className="h-9 bg-sky-500 hover:bg-sky-600 text-white gap-1.5"
            onClick={() => onClickSeen(1)}
          >
            <CheckCheck className="h-4 w-4" /> Mark all as seen
          </Button>
        )}
      </div>

      {/* 通知列表 */}
      {notifications?.length > 0 ? (
        <div className="flex flex-col gap-3">
          {notifications.map((row, i) => {
            const isUnread = row.is_read === 2
            const notifType = NOTIFICATIONS.find((n) => n.id === row.notification_type)

            return (
              <div
                key={i}
                className={cn(
                  "flex items-start gap-4 p-4 rounded-2xl border transition-all duration-200",
                  isUnread
                    ? "bg-sky-50/60 border-sky-100"
                    : "bg-white border-gray-100 opacity-70"
                )}
              >
                {/* 未读指示点 */}
                <div className="mt-1.5 shrink-0">
                  {isUnread
                    ? <div className="h-2.5 w-2.5 rounded-full bg-sky-500" />
                    : <div className="h-2.5 w-2.5 rounded-full bg-gray-200" />
                  }
                </div>

                {/* 内容 */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={cn("text-sm font-semibold", isUnread ? "text-gray-900" : "text-gray-500")}>
                        {row.title}
                      </span>
                      {notifType && (
                        <Badge className="bg-sky-100 text-sky-700 border-sky-200 text-xs font-medium">
                          {notifType.title}
                        </Badge>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground shrink-0">
                      {new Date(row.create_time).toLocaleString('en-US', {
                        month: 'short', day: 'numeric',
                        hour: '2-digit', minute: '2-digit'
                      })}
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{row.description}</p>

                  {/* 操作按钮 */}
                  <div className="flex items-center gap-2 mt-3">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 gap-1.5 text-xs"
                      onClick={() => { window.location.href = row.url }}
                    >
                      <ExternalLink className="h-3.5 w-3.5" /> View
                    </Button>
                    {isUnread && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 gap-1.5 text-xs text-sky-600 hover:text-sky-700 hover:bg-sky-50"
                        onClick={() => onClickSeen(2, row.notification_id)}
                      >
                        <Eye className="h-3.5 w-3.5" /> Mark as seen
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        // 空状态
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
          <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
            <BellOff className="h-8 w-8 text-gray-300" />
          </div>
          <div>
            <p className="font-semibold text-gray-700">No notifications yet</p>
            <p className="text-sm text-muted-foreground mt-1">
              You'll be notified here when something happens.
            </p>
          </div>
        </div>
      )}

    </div>
  )
}

export default Notification