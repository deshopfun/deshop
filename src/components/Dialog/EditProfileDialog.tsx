// import { useSnackPresistStore } from 'lib';
// import { FILE_TYPE } from 'packages/constants';
// import { useEffect, useState } from 'react';
// import axios from 'utils/http/axios';
// import { Http } from 'utils/http/http';

// type DialogType = {
//   avatarUrl?: string;
//   username?: string;
//   bio?: string;
//   openDialog: boolean;
//   setOpenDialog: (value: boolean) => void;
// };

// export default function EditProfileDialog(props: DialogType) {
//   const [avatarUrl, setAvatarUrl] = useState<string>();
//   const [username, setUsername] = useState<string>();
//   const [bio, setBio] = useState<string>();

//   const { setSnackSeverity, setSnackOpen, setSnackMessage } = useSnackPresistStore((state) => state);

//   const VisuallyHiddenInput = styled('input')({
//     clip: 'rect(0 0 0 0)',
//     clipPath: 'inset(50%)',
//     height: 1,
//     overflow: 'hidden',
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     whiteSpace: 'nowrap',
//     width: 1,
//   });

//   const handleClose = () => {
//     props.setOpenDialog(false);
//   };

//   useEffect(() => {
//     setAvatarUrl(props.avatarUrl || '');
//     setUsername(props.username || '');
//     setBio(props.bio || '');
//   }, [props.avatarUrl, props.username, props.bio]);

//   const uploadFile = async (files: FileList) => {
//     try {
//       if (!files.length || files.length !== 1) {
//         setSnackSeverity('error');
//         setSnackMessage('Only support uploading one file');
//         setSnackOpen(true);
//         return;
//       }

//       const formData = new FormData();
//       Array.from(files).forEach((file) => {
//         formData.append('files', file);
//       });

//       const response: any = await axios.post(Http.upload_file, formData, {
//         params: {
//           file_type: FILE_TYPE.Image,
//         },
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       if (response.result && response.data.urls[0] != '') {
//         setAvatarUrl(response.data.urls[0]);
//       } else {
//         setSnackSeverity('error');
//         setSnackMessage('Upload Failed');
//         setSnackOpen(true);
//       }
//     } catch (e) {
//       setSnackSeverity('error');
//       setSnackMessage('The network error occurred. Please try again later.');
//       setSnackOpen(true);
//       console.error(e);
//     }
//   };

//   const onClickEditProfile = async () => {
//     try {
//       const response: any = await axios.put(Http.user_setting, {
//         username: username,
//         avatar_url: avatarUrl,
//         bio: bio,
//       });

//       if (response.result) {
//         setSnackSeverity('success');
//         setSnackMessage('Update successfully');
//         setSnackOpen(true);
//         handleClose();

//         window.location.href = `/profile/${username}`;
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
//     <Dialog open={props.openDialog} onClose={handleClose} fullWidth>
//       <DialogTitle>Edit profile</DialogTitle>
//       <DialogContent>
//         <Box>
//           <Button component="label" role={undefined} tabIndex={-1}>
//             <Box textAlign={'center'}>
//               <VisuallyHiddenInput
//                 type="file"
//                 multiple
//                 onChange={async (event: any) => {
//                   await uploadFile(event.target.files);
//                 }}
//               />
//               <Badge
//                 overlap="circular"
//                 anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//                 badgeContent={<PhotoCamera color={'action'} />}
//               >
//                 {avatarUrl ? (
//                   <Avatar sx={{ width: 50, height: 50 }} alt="Avatar" src={avatarUrl} />
//                 ) : (
//                   <Avatar sx={{ width: 50, height: 50 }} alt="Avatar" src={'/images/default_avatar.png'} />
//                 )}
//               </Badge>
//             </Box>
//           </Button>
//         </Box>

//         <Box mt={2}>
//           <Typography mb={1}>Username</Typography>
//           <TextField
//             hiddenLabel
//             size="small"
//             fullWidth
//             value={username}
//             onChange={(e) => {
//               setUsername(e.target.value);
//             }}
//           />
//         </Box>
//         <Box mt={2}>
//           <Typography mb={1}>Bio</Typography>
//           <TextField
//             hiddenLabel
//             size="small"
//             fullWidth
//             value={bio}
//             onChange={(e) => {
//               setBio(e.target.value);
//             }}
//             placeholder="Describe your profile"
//           />
//         </Box>
//       </DialogContent>
//       <DialogActions>
//         <Button variant={'contained'} onClick={handleClose}>
//           Close
//         </Button>
//         <Button color="success" variant={'contained'} onClick={onClickEditProfile}>
//           Save Changes
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// }

import { useSnackPresistStore } from 'lib';
import { FILE_TYPE } from 'packages/constants';
import { useEffect, useState } from 'react';
import axios from 'utils/http/axios';
import { Http } from 'utils/http/http';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { Camera, User } from 'lucide-react';

type DialogType = {
  avatarUrl?: string;
  username?: string;
  bio?: string;
  openDialog: boolean;
  setOpenDialog: (value: boolean) => void;
};

export default function EditProfileDialog(props: DialogType) {
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [bio, setBio] = useState<string>('');

  const { setSnackSeverity, setSnackOpen, setSnackMessage } = useSnackPresistStore((state) => state);

  const handleClose = () => {
    props.setOpenDialog(false);
  };

  useEffect(() => {
    setAvatarUrl(props.avatarUrl || '');
    setUsername(props.username || '');
    setBio(props.bio || '');
  }, [props.avatarUrl, props.username, props.bio]);

  const uploadFile = async (files: FileList | null) => {
    if (!files || files.length !== 1) {
      setSnackSeverity('error');
      setSnackMessage('Only support uploading one file');
      setSnackOpen(true);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('files', files[0]);

      const response: any = await axios.post(Http.upload_file, formData, {
        params: { file_type: FILE_TYPE.Image },
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.result && response.data.urls?.[0]) {
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
    try {
      const response: any = await axios.put(Http.user_setting, {
        username,
        avatar_url: avatarUrl,
        bio,
      });

      if (response.result) {
        setSnackSeverity('success');
        setSnackMessage('Update successfully');
        setSnackOpen(true);
        handleClose();
        window.location.href = `/profile/${username}`;
      } else {
        setSnackSeverity('error');
        setSnackMessage(response.message || 'Update failed');
        setSnackOpen(true);
      }
    } catch (e) {
      setSnackSeverity('error');
      setSnackMessage('The network error occurred. Please try again later.');
      setSnackOpen(true);
      console.error(e);
    }
  };

  return (
    <Dialog open={props.openDialog} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>Update your profile information and avatar.</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-6 py-4">
          {/* Avatar Upload */}
          <div className="relative">
            <label htmlFor="avatar-upload" className="cursor-pointer group">
              <Avatar className="w-24 h-24 border-4 border-background shadow-md">
                <AvatarImage src={avatarUrl} alt="Avatar" />
                <AvatarFallback>
                  <User className="w-12 h-12 text-muted-foreground" />
                </AvatarFallback>
              </Avatar>

              {/* Camera Badge */}
              <Badge className="absolute bottom-0 right-0 h-8 w-8 rounded-full flex items-center justify-center border-2 border-background hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                <Camera className="w-4 h-4" />
              </Badge>
            </label>

            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => uploadFile(e.target.files)}
            />
          </div>

          {/* Username */}
          <div className="w-full space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your username"
            />
          </div>

          {/* Bio */}
          <div className="w-full space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Input id="bio" value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Describe your profile" />
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="button" onClick={onClickEditProfile}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
