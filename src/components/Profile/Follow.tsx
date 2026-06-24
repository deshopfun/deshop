import { useSnackPresistStore, useUserPresistStore } from 'lib';
import { useState } from 'react';
import { FollowType } from 'utils/types';
import { Card, CardContent } from '@/components/ui/card'

type Props = {
  uuid?: string;
};

const ProfileFollow = (props: Props) => {
  const [followers, setFollowers] = useState<FollowType[]>();

  const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore((state) => state);
  const { getIsLogin } = useUserPresistStore((state) => state);

  return (
    <div>
      <p className=''>All followers</p>

      <div className='mt-2'>
        {followers && followers.length > 0 ? (
          <></>
        ) : (
          <div className='mt-2'>
            <Card>
              <CardContent>
                <p>Not found</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileFollow;
