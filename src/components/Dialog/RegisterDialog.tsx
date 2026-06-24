// type DialogType = {
//   email: string;
//   openDialog: boolean;
//   setOpenDialog: (value: boolean) => void;
// };

// export default function RegisterDialog(props: DialogType) {
//   const handleClose = () => {
//     props.setOpenDialog(false);
//   };

//   return (
//     <Dialog open={props.openDialog} onClose={handleClose} fullWidth>
//       <DialogTitle>Check your email</DialogTitle>
//       <DialogContent>
//         <Typography>Please click the link in the email to complete your registration.</Typography>
//         <Stack direction={'row'} alignItems={'center'} mt={2}>
//           <Typography>Your email:</Typography>
//           <Typography fontWeight={'bold'} pl={1}>
//             {props.email}
//           </Typography>
//         </Stack>
//       </DialogContent>
//       <DialogActions>
//         <Button variant={'contained'} onClick={handleClose}>
//           Close
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// }

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MailCheck } from 'lucide-react';

type DialogType = {
  email: string;
  openDialog: boolean;
  setOpenDialog: (value: boolean) => void;
};

export default function RegisterDialog({ email, openDialog, setOpenDialog }: DialogType) {
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent className="sm:max-w-md rounded-2xl p-0 overflow-hidden">
        {/* 顶部渐变区 */}
        <div className="bg-gradient-to-br from-blue-600 to-sky-400 px-8 py-8 flex flex-col items-center gap-3 text-white text-center">
          <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center">
            <MailCheck className="h-8 w-8 text-white" />
          </div>
          <DialogHeader>
            <DialogTitle className="text-white text-xl font-bold">Check your email</DialogTitle>
          </DialogHeader>
          <p className="text-white/80 text-sm">We've sent a confirmation link to complete your registration</p>
        </div>

        {/* 内容区 */}
        <div className="px-8 py-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1 bg-gray-50 rounded-xl px-4 py-3">
            <p className="text-xs text-muted-foreground">Email sent to</p>
            <p className="font-semibold text-gray-900 text-sm">{email}</p>
          </div>

          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <p>Please click the link in the email to complete your registration.</p>
            <p>Didn't receive it? Check your spam folder or try registering again.</p>
          </div>
        </div>

        <DialogFooter className="px-8 pb-6">
          <Button
            className="w-full h-11 bg-sky-500 hover:bg-sky-600 text-white font-semibold"
            onClick={() => setOpenDialog(false)}
          >
            Got it
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
