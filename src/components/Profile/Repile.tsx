import { useSnackPresistStore, useUserPresistStore } from 'lib';
import { useState } from 'react';
import { ReplyType } from 'utils/types';
import { Card, CardContent } from '@/components/ui/card'

type Props = {
  uuid?: string;
};

const ProfileRepile = (props: Props) => {
  const [replies, setReplies] = useState<ReplyType[]>();

  const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore((state) => state);
  const { getIsLogin } = useUserPresistStore((state) => state);

  return (
    <div>
      <p className=''>All repiles</p>

      <div className='mt-2'>
        {replies && replies.length > 0 ? (
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

export default ProfileRepile;
