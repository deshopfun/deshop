import { Box, Card, CardContent, Typography } from '@mui/material';
import { useSnackPresistStore, useUserPresistStore } from 'lib';
import { useState } from 'react';
import { ReplyType } from 'utils/types';

type Props = {
  uuid?: string;
};

const ProfileRepile = (props: Props) => {
  const [replies, setReplies] = useState<ReplyType[]>();

  const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore((state) => state);
  const { getIsLogin } = useUserPresistStore((state) => state);

  return (
    <Box>
      <Typography variant="h6">All repiles</Typography>

      <Box mt={2}>
        {replies && replies.length > 0 ? (
          <></>
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
    </Box>
  );
};

export default ProfileRepile;
