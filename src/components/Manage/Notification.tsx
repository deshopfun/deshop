// import { useSnackPresistStore } from 'lib';
// import { NOTIFICATION, NOTIFICATIONS } from 'packages/constants/notification';
// import { useEffect, useState } from 'react';
// import axios from 'utils/http/axios';
// import { Http } from 'utils/http/http';

// const ManageNotification = () => {
//   const [notification, setNotification] = useState<string>('');

//   const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore((state) => state);

//   const init = async () => {
//     try {
//       const response: any = await axios.get(Http.user_notification_setting);

//       if (response.result) {
//         setNotification(response.data.notification);
//       } else {
//         setNotification('');
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
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const onChangeNotification = async (id: number) => {
//     try {
//       let notificationArray = notification.split(',').filter((item) => item !== '');
//       let newNotifiction = '';
//       if (id !== 0) {
//         if (notificationArray.includes(String(id))) {
//           newNotifiction = notificationArray.filter((item) => item !== String(id)).join(',');
//         } else {
//           notificationArray.push(String(id));
//           newNotifiction = notificationArray.join(',');
//         }
//       }

//       const response: any = await axios.put(Http.user_notification_setting, {
//         notification: newNotifiction,
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
//     <Box>
//       <Typography variant="h6">Setup notification</Typography>
//       <Box>
//         <Box mt={2}>
//           {NOTIFICATIONS &&
//             NOTIFICATIONS.map((item: NOTIFICATION, index) => (
//               <Stack direction={'row'} alignItems={'center'} key={index}>
//                 <Switch
//                   checked={notification.split(',').includes(String(item.id)) ? true : false}
//                   onChange={() => {
//                     onChangeNotification(item.id);
//                   }}
//                 />
//                 <Typography ml={2}>{item.title}</Typography>
//               </Stack>
//             ))}
//         </Box>
//         <Box mt={4}>
//           <Button
//             variant={'contained'}
//             onClick={() => {
//               onChangeNotification(0);
//             }}
//             color={'error'}
//           >
//             Disable all notifications
//           </Button>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default ManageNotification;

import { useSnackPresistStore } from '@/lib'
import { NOTIFICATION, NOTIFICATIONS } from '@/packages/constants/notification'
import { useEffect, useState } from 'react'
import axios from '@/utils/http/axios'
import { Http } from '@/utils/http/http'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Bell, BellOff } from 'lucide-react'
import { cn } from '@/lib/utils'

const ManageNotification = () => {
  const [notification, setNotification] = useState('')

  const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore((state) => state)

  const showError = (msg: string) => { setSnackSeverity('error'); setSnackMessage(msg); setSnackOpen(true) }
  const showSuccess = (msg: string) => { setSnackSeverity('success'); setSnackMessage(msg); setSnackOpen(true) }

  const init = async () => {
    try {
      const response: any = await axios.get(Http.user_notification_setting)
      setNotification(response.result ? response.data.notification : '')
    } catch { showError('Network error. Please try again later.') }
  }

  useEffect(() => { init() }, [])

  const isEnabled = (id: number) =>
    notification.split(',').filter(Boolean).includes(String(id))

  const enabledCount = NOTIFICATIONS.filter((n) => isEnabled(n.id)).length

  const onChangeNotification = async (id: number) => {
    try {
      const arr = notification.split(',').filter(Boolean)
      const newNotification = id === 0
        ? ''
        : arr.includes(String(id))
          ? arr.filter((i) => i !== String(id)).join(',')
          : [...arr, String(id)].join(',')

      const response: any = await axios.put(Http.user_notification_setting, { notification: newNotification })
      if (response.result) {
        await init()
        showSuccess(id === 0 ? 'All notifications disabled' : 'Updated successfully')
      } else {
        showError(response.message)
      }
    } catch { showError('Network error. Please try again later.') }
  }

  return (
    <div className="flex flex-col gap-4">

      {/* 标题 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-sky-50 flex items-center justify-center">
            <Bell className="h-4 w-4 text-sky-500" />
          </div>
          <div>
            <h3 className="font-semibold">Notification Settings</h3>
            <p className="text-xs text-muted-foreground">
              {enabledCount} of {NOTIFICATIONS.length} enabled
            </p>
          </div>
        </div>

        {enabledCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="h-8 text-red-500 hover:text-red-600 hover:bg-red-50 gap-1.5 text-xs"
            onClick={() => onChangeNotification(0)}
          >
            <BellOff className="h-3.5 w-3.5" />
            Disable all
          </Button>
        )}
      </div>

      {/* 通知列表 */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-0 divide-y">
          {NOTIFICATIONS.map((item: NOTIFICATION, index) => {
            const enabled = isEnabled(item.id)
            return (
              <div
                key={index}
                className={cn(
                  "flex items-center justify-between px-5 py-4 transition-colors",
                  enabled ? "bg-white" : "bg-gray-50/50"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "h-8 w-8 rounded-lg flex items-center justify-center transition-colors",
                    enabled ? "bg-sky-50" : "bg-gray-100"
                  )}>
                    <Bell className={cn(
                      "h-4 w-4 transition-colors",
                      enabled ? "text-sky-500" : "text-gray-300"
                    )} />
                  </div>
                  <div>
                    <p className={cn(
                      "text-sm font-medium transition-colors",
                      enabled ? "text-gray-900" : "text-gray-400"
                    )}>
                      {item.title}
                    </p>
                    <p className={cn(
                      "text-xs mt-0.5",
                      enabled ? "text-green-500" : "text-muted-foreground"
                    )}>
                      {enabled ? 'Enabled' : 'Disabled'}
                    </p>
                  </div>
                </div>

                <Switch
                  checked={enabled}
                  onCheckedChange={() => onChangeNotification(item.id)}
                />
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* 全部禁用提示 */}
      {enabledCount === 0 && (
        <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl border border-dashed">
          <BellOff className="h-5 w-5 text-gray-300 shrink-0" />
          <p className="text-sm text-muted-foreground">
            All notifications are disabled. Enable some to stay updated.
          </p>
        </div>
      )}

    </div>
  )
}

export default ManageNotification