import { Box, Card, CardContent, Typography } from '@mui/material';
import { useSnackPresistStore, useUserPresistStore } from 'lib';
import { useState } from 'react';

type FollowType = {};

type Props = {
  uuid?: string;
};

const ProfileFollow = (props: Props) => {
  const [followers, setFollowers] = useState<FollowType[]>();

  const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore((state) => state);
  const { getIsLogin } = useUserPresistStore((state) => state);

  return (
    <Box>
      <Typography variant="h6">All followers</Typography>

      <Box mt={2}>
        {followers && followers.length > 0 ? (
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

export default ProfileFollow;
