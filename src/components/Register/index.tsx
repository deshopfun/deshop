// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import { IsValidEmail } from 'utils/verify';
// import { useSnackPresistStore, useUserPresistStore } from 'lib';
// import axios from 'utils/http/axios';
// import { Http } from 'utils/http/http';
// import RegisterDialog from 'components/Dialog/RegisterDialog';
// import { SiteLogo } from 'components/Logo/SiteLogo';

// const Register = () => {
//   const router = useRouter();

//   const [email, setEmail] = useState<string>('');
//   const [open, setOpen] = useState<boolean>(false);

//   const { setSnackOpen, setSnackMessage, setSnackSeverity } = useSnackPresistStore((state) => state);
//   const { getIsLogin } = useUserPresistStore((state) => state);

//   const onRegister = async () => {
//     try {
//       if (!email || email === '' || !IsValidEmail(email)) {
//         setSnackSeverity('error');
//         setSnackMessage('Incorrect email input');
//         setSnackOpen(true);
//         return;
//       }

//       const response: any = await axios.post(Http.register, {
//         email: email,
//       });
//       if (response.result) {
//         setOpen(true);
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
//     const enterEmail = router.query.email;
//     if (enterEmail) {
//       setEmail(String(enterEmail));
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [router.query]);

//   useEffect(() => {
//     if (getIsLogin()) {
//       window.location.href = '/';
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return (
//     <Box>
//       <Container>
//         <Stack alignItems={'center'} mt={8}>
//           <SiteLogo />
//           <Typography variant="h5" fontWeight={'bold'} mt={4}>
//             Welcome to Deshop
//           </Typography>
//           <Typography mt={2}>
//             This is a decentralized digital exchange platform where anyone can list products, anyone can purchase
//             products, and no third-party constraints.
//           </Typography>

//           <Card sx={{ minWidth: 450, mt: 4, padding: 2 }}>
//             <CardContent>
//               <Typography variant="h5">Create account</Typography>
//               <Box mt={3}>
//                 <Typography>Email</Typography>
//                 <Box mt={1}>
//                   <TextField
//                     fullWidth
//                     hiddenLabel
//                     size="small"
//                     value={email}
//                     onChange={(e) => {
//                       setEmail(e.target.value);
//                     }}
//                   />
//                 </Box>
//               </Box>

//               <Box mt={3}>
//                 <Button fullWidth variant={'contained'} size={'large'} onClick={onRegister}>
//                   Create account
//                 </Button>
//               </Box>

//               <Box mt={2} textAlign={'center'}>
//                 <Button
//                   size={'large'}
//                   fullWidth
//                   onClick={() => {
//                     window.location.href = '/login';
//                   }}
//                 >
//                   Log in
//                 </Button>
//               </Box>
//             </CardContent>
//           </Card>
//         </Stack>
//       </Container>

//       <RegisterDialog openDialog={open} setOpenDialog={setOpen} email={email} />
//     </Box>
//   );
// };

// export default Register;

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { IsValidEmail } from '@/utils/verify';
import { useSnackPresistStore, useUserPresistStore } from '@/lib';
import axios from '@/utils/http/axios';
import { Http } from '@/utils/http/http';
import RegisterDialog from '@/components/Dialog/RegisterDialog';
import { SiteLogo } from '@/components/Logo/SiteLogo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, ArrowRight, Loader2, ShieldCheck, Zap, Globe } from 'lucide-react';

const features = [
  { icon: Globe, title: 'Decentralized', desc: 'No third-party constraints, fully open platform' },
  { icon: Zap, title: 'Free Trading', desc: 'List and sell products with zero platform fees' },
  { icon: ShieldCheck, title: 'Crypto Payments', desc: 'Receive payments directly in cryptocurrency' },
];

const Register = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { setSnackOpen, setSnackMessage, setSnackSeverity } = useSnackPresistStore((state) => state);
  const { getIsLogin } = useUserPresistStore((state) => state);

  const showError = (msg: string) => {
    setSnackSeverity('error');
    setSnackMessage(msg);
    setSnackOpen(true);
  };

  useEffect(() => {
    if (router.query.email) setEmail(String(router.query.email));
  }, [router.query]);

  useEffect(() => {
    if (getIsLogin()) window.location.href = '/';
  }, []);

  const onRegister = async () => {
    if (!email || !IsValidEmail(email)) return showError('Please enter a valid email');
    setLoading(true);
    try {
      const response: any = await axios.post(Http.register, { email });
      if (response.result) {
        setOpen(true);
      } else {
        showError(response.message);
      }
    } catch (e) {
      showError('Network error. Please try again later.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') onRegister();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* 左侧：品牌介绍 */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <SiteLogo />
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 leading-tight">
                Trade freely,
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-sky-400 bg-clip-text text-transparent">
                  earn everything.
                </span>
              </h1>
              <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                Deshop is a decentralized digital exchange platform where anyone can list products, anyone can purchase
                products, with no third-party constraints.
              </p>
            </div>
          </div>

          {/* 特性列表 */}
          <div className="flex flex-col gap-4">
            {features.map((f, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="h-9 w-9 rounded-xl bg-sky-50 flex items-center justify-center shrink-0">
                  <f.icon className="h-5 w-5 text-sky-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{f.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 右侧：注册表单 */}
        <div className="flex flex-col gap-6">
          <Card className="w-full shadow-lg border-0 rounded-2xl">
            <CardContent className="p-8 flex flex-col gap-6">
              <div>
                <h2 className="text-xl font-bold">Create account</h2>
                <p className="text-sm text-muted-foreground mt-0.5">Start selling in minutes, completely free</p>
              </div>

              {/* Email 输入 */}
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="email">Email address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="you@example.com"
                    className="pl-9 h-11"
                    autoFocus
                  />
                </div>
              </div>

              {/* 注册按钮 */}
              <Button
                className="h-11 bg-sky-500 hover:bg-sky-600 text-white font-semibold gap-2"
                onClick={onRegister}
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    Create account
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>

              {/* 分隔线 */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-gray-100" />
                <span className="text-xs text-muted-foreground">already have an account?</span>
                <div className="flex-1 h-px bg-gray-100" />
              </div>

              {/* 登录按钮 */}
              <Button
                variant="outline"
                className="h-11 font-medium"
                onClick={() => {
                  window.location.href = '/login';
                }}
              >
                Log in
              </Button>
            </CardContent>
          </Card>

          {/* 底部条款 */}
          <p className="text-xs text-muted-foreground text-center">
            By creating an account, you agree to our{' '}
            <a href="/docs/terms-and-conditions" className="text-sky-500 hover:underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="/docs/privacy-policy" className="text-sky-500 hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>

      <RegisterDialog openDialog={open} setOpenDialog={setOpen} email={email} />
    </div>
  );
};

export default Register;
