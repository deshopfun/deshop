import { PhotoCamera } from '@mui/icons-material';
import {
  Avatar,
  Badge,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputAdornment,
  OutlinedInput,
  Stack,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import { useSnackPresistStore } from 'lib';
import { FILE_TYPE } from 'packages/constants';
import { useEffect, useState } from 'react';
import axios from 'utils/http/axios';
import { Http } from 'utils/http/http';

type DialogType = {
  avatarUrl?: string;
  username?: string;
  bio?: string;
  openDialog: boolean;
  setOpenDialog: (value: boolean) => void;
};

export default function EditProfileDialog(props: DialogType) {
  const [avatarUrl, setAvatarUrl] = useState<string>();
  const [username, setUsername] = useState<string>();
  const [bio, setBio] = useState<string>();

  const { setSnackSeverity, setSnackOpen, setSnackMessage } = useSnackPresistStore((state) => state);

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  const handleClose = () => {
    props.setOpenDialog(false);
  };

  useEffect(() => {
    setAvatarUrl(props.avatarUrl);
    setUsername(props.username);
    setBio(props.bio);
  }, [props.avatarUrl, props.username, props.bio]);

  const uploadFile = async (files: FileList) => {
    try {
      if (!files.length || files.length !== 1) {
        setSnackSeverity('error');
        setSnackMessage('Only support uploading one file');
        setSnackOpen(true);
        return;
      }

      const formData = new FormData();
      Array.from(files).forEach((file) => {
        formData.append('files', file);
      });

      const response: any = await axios.post(Http.upload_file, formData, {
        params: {
          file_type: FILE_TYPE.Image,
        },
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.result && response.data.urls[0] != '') {
        setAvatarUrl(response.data.urls[0]);
      } else {
        setSnackSeverity('error');
        setSnackMessage('Upload Failed');
        setSnackOpen(true);
      }
    } catch (e) {
      setSnackSeverity('error');
      setSnackMessage('The network error occurred. Please try again later.');
      setSnackOpen(true);
      console.error(e);
    }
  };

  const onClickEditProfile = async () => {
    const response: any = await axios.put(Http.user_setting, {
      username: username,
      avatar_url: avatarUrl,
      bio: bio,
    });

    if (response.result) {
      setSnackSeverity('success');
      setSnackMessage('Update successfully');
      setSnackOpen(true);
      handleClose();

      window.location.href = `/profile/${username}`;
    } else {
      setSnackSeverity('error');
      setSnackMessage(response.message);
      setSnackOpen(true);
    }
  };

  return (
    <Dialog open={props.openDialog} onClose={handleClose} fullWidth>
      <DialogTitle>Edit profile</DialogTitle>
      <DialogContent>
        <Box>
          <Button component="label" role={undefined} tabIndex={-1}>
            <Box textAlign={'center'}>
              <VisuallyHiddenInput
                type="file"
                multiple
                onChange={async (event: any) => {
                  await uploadFile(event.target.files);
                }}
              />
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={<PhotoCamera color={'action'} />}
              >
                {avatarUrl ? (
                  <Avatar sx={{ width: 50, height: 50 }} alt="Avatar" src={avatarUrl} />
                ) : (
                  <Avatar sx={{ width: 50, height: 50 }} alt="Avatar" src={'/images/default_avatar.png'} />
                )}
              </Badge>
            </Box>
          </Button>
        </Box>

        <Box mt={2}>
          <Typography mb={1}>Username</Typography>
          <TextField
            hiddenLabel
            size="small"
            fullWidth
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </Box>
        <Box mt={2}>
          <Typography mb={1}>Bio</Typography>
          <TextField
            hiddenLabel
            size="small"
            fullWidth
            value={bio}
            onChange={(e) => {
              setBio(e.target.value);
            }}
            placeholder="Describe your profile"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant={'contained'} onClick={handleClose}>
          Close
        </Button>
        <Button color="success" variant={'contained'} onClick={onClickEditProfile}>
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
