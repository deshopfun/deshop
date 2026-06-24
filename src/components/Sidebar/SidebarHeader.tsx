import { useSnackPresistStore, useUserPresistStore } from 'lib';
import { useEffect, useState } from 'react';
import axios from 'utils/http/axios';
import { Http } from 'utils/http/http';
import { Button } from '@/components/ui/button';
import { Bell } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { SiteLogo } from 'components/Logo/SiteLogo';

const SidebarHeader = () => {
  const [notificationNumber, setNotificationNumber] = useState<number>(0);

  const { setSnackOpen, setSnackMessage, setSnackSeverity } = useSnackPresistStore((state) => state);
  const { getIsLogin } = useUserPresistStore((state) => state);

  const init = async () => {
    try {
      if (!getIsLogin || !getIsLogin()) {
        return;
      }

      const response: any = await axios.get(Http.user_notification);

      if (response.result) {
        if (response.data) {
          const count = response.data.reduce((total: number, item: any) => {
            if (item.is_read && item.is_read === 2) {
              return total + 1;
            }
            return total;
          }, 0);
          setNotificationNumber(count);
        } else {
          setNotificationNumber(0);
        }
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
    init();
  }, []);

  return (
    <div className="p-4 overflow-hidden">
      <div className="flex flex-row items-center justify-between">
        <SiteLogo />
        {getIsLogin() && (
          <div className="relative inline-flex">
            <Button
              variant="ghost"
              size="icon"
              color="red"
              onClick={() => {
                window.location.href = '/notification';
              }}
            >
              <Bell className="h-5 w-5" />
            </Button>
            {notificationNumber > 0 && (
              <Badge
                className={
                  'absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500 hover:bg-red-600'
                }
              >
                {notificationNumber > 99 ? '99+' : notificationNumber}
              </Badge>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SidebarHeader;
