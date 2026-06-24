// import { useSnackPresistStore, useUserPresistStore } from 'lib';
// import { useEffect, useState } from 'react';
// import { IsValidEmail } from 'utils/verify';
// import axios from 'utils/http/axios';
// import { Http } from 'utils/http/http';
// import { SiteLogo } from 'components/Logo/SiteLogo';

// const Login = () => {
//   const [email, setEmail] = useState<string>('');
//   const [code, setCode] = useState<string>('');
//   const [showCode, setShowCode] = useState<boolean>(false);

//   const { setSnackOpen, setSnackMessage, setSnackSeverity } = useSnackPresistStore((state) => state);
//   const { getIsLogin, setIsLogin, setAuth, setUuid } = useUserPresistStore((state) => state);

//   const onLogin = async () => {
//     try {
//       if (!email || email === '' || !IsValidEmail(email)) {
//         setSnackSeverity('error');
//         setSnackMessage('Incorrect email input');
//         setSnackOpen(true);
//         return;
//       }

//       if (showCode) {
//         if (!code || code === '') {
//           setSnackSeverity('error');
//           setSnackMessage('Incorrect code input');
//           setSnackOpen(true);
//           return;
//         }

//         const response: any = await axios.post(Http.login_by_code, {
//           email: email,
//           code: code,
//         });
//         if (response.result) {
//           setAuth(response.data.auth);
//           setUuid(response.data.uuid);
//           setIsLogin(true);

//           window.location.href = '/';
//         } else {
//           setSnackSeverity('error');
//           setSnackMessage('Login failed');
//           setSnackOpen(true);
//         }
//       } else {
//         const response: any = await axios.post(Http.login, {
//           email: email,
//         });
//         if (response.result) {
//           setShowCode(true);
//         } else {
//           setSnackSeverity('error');
//           setSnackMessage('Cannot get the login code, please check your email');
//           setSnackOpen(true);
//         }
//       }
//     } catch (e) {
//       setSnackSeverity('error');
//       setSnackMessage('The network error occurred. Please try again later');
//       setSnackOpen(true);
//       console.error(e);
//     }
//   };

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

//           <Card sx={{ minWidth: 450, mt: 4, padding: 2 }}>
//             <CardContent>
//               <Typography variant="h5">Sign in</Typography>
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

//               {showCode && (
//                 <Box mt={3}>
//                   <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
//                     <Typography>Code</Typography>
//                     <Typography fontWeight={'bold'} color={'warning'} fontSize={14}>
//                       The login code has been sent to your email
//                     </Typography>
//                   </Stack>
//                   <Box mt={1}>
//                     <TextField
//                       fullWidth
//                       hiddenLabel
//                       type={'text'}
//                       size="small"
//                       value={code}
//                       onChange={(e) => {
//                         setCode(e.target.value);
//                       }}
//                     />
//                   </Box>
//                 </Box>
//               )}

//               <Box mt={3}>
//                 <Button fullWidth variant={'contained'} size={'large'} onClick={onLogin}>
//                   {showCode ? 'Sign in' : 'Get code'}
//                 </Button>
//               </Box>

//               <Box mt={2} textAlign={'center'}>
//                 <Button
//                   size={'large'}
//                   fullWidth
//                   onClick={() => {
//                     window.location.href = '/register';
//                   }}
//                 >
//                   Create your account
//                 </Button>
//               </Box>
//             </CardContent>
//           </Card>
//         </Stack>
//       </Container>
//     </Box>
//   );
// };

// export default Login;

import { useSnackPresistStore, useUserPresistStore } from 'lib';
import { useEffect, useState } from 'react';
import { IsValidEmail } from 'utils/verify';
import axios from 'utils/http/axios';
import { Http } from 'utils/http/http';
import { SiteLogo } from 'components/Logo/SiteLogo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, KeyRound, ArrowRight, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const Login = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [showCode, setShowCode] = useState(false);
  const [loading, setLoading] = useState(false);

  const { setSnackOpen, setSnackMessage, setSnackSeverity } = useSnackPresistStore((state) => state);
  const { getIsLogin, setIsLogin, setAuth, setUuid } = useUserPresistStore((state) => state);

  const showError = (msg: string) => {
    setSnackSeverity('error');
    setSnackMessage(msg);
    setSnackOpen(true);
  };

  useEffect(() => {
    if (getIsLogin()) window.location.href = '/';
  }, []);

  const onLogin = async () => {
    if (!email || !IsValidEmail(email)) return showError('Please enter a valid email');

    setLoading(true);
    try {
      if (showCode) {
        if (!code) return showError('Please enter the verification code');

        const response: any = await axios.post(Http.login_by_code, { email, code });
        if (response.result) {
          setAuth(response.data.auth);
          setUuid(response.data.uuid);
          setIsLogin(true);
          window.location.href = '/';
        } else {
          showError('Login failed, please check your code');
        }
      } else {
        const response: any = await axios.post(Http.login, { email });
        if (response.result) {
          setShowCode(true);
        } else {
          showError('Cannot get the login code, please check your email');
        }
      }
    } catch (e) {
      showError('Network error. Please try again later.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') onLogin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md flex flex-col items-center gap-8">
        {/* Logo + 欢迎语 */}
        <div className="flex flex-col items-center gap-3 text-center">
          <SiteLogo />
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">Welcome to Deshop</h1>
            <p className="text-sm text-muted-foreground mt-1">Decentralized digital exchange platform</p>
          </div>
        </div>

        {/* 登录卡片 */}
        <Card className="w-full shadow-lg border-0 rounded-2xl">
          <CardContent className="p-8 flex flex-col gap-6">
            {/* 标题 */}
            <div>
              <h2 className="text-xl font-bold">Sign in</h2>
              <p className="text-sm text-muted-foreground mt-0.5">
                {showCode ? 'Enter the code sent to your email' : 'Enter your email to get started'}
              </p>
            </div>

            {/* 步骤指示器 */}
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  'flex items-center justify-center h-7 w-7 rounded-full text-xs font-bold transition-colors',
                  'bg-sky-500 text-white',
                )}
              >
                1
              </div>
              <div className={cn('flex-1 h-0.5 transition-colors', showCode ? 'bg-sky-500' : 'bg-gray-200')} />
              <div
                className={cn(
                  'flex items-center justify-center h-7 w-7 rounded-full text-xs font-bold transition-colors',
                  showCode ? 'bg-sky-500 text-white' : 'bg-gray-100 text-gray-400',
                )}
              >
                2
              </div>
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
                  disabled={showCode}
                  className={cn('pl-9 h-11', showCode && 'opacity-60')}
                />
              </div>
            </div>

            {/* 验证码输入（第二步） */}
            {showCode && (
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="code">Verification Code</Label>
                  <button
                    className="text-xs text-sky-500 hover:text-sky-600 font-medium"
                    onClick={() => setShowCode(false)}
                  >
                    Change email
                  </button>
                </div>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="code"
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter 6-digit code"
                    className="pl-9 h-11 tracking-widest font-mono"
                    maxLength={6}
                    autoFocus
                  />
                </div>
                <p className="text-xs text-amber-600 bg-amber-50 px-3 py-2 rounded-lg">
                  A login code has been sent to <span className="font-semibold">{email}</span>
                </p>
              </div>
            )}

            {/* 主按钮 */}
            <Button
              className="h-11 bg-sky-500 hover:bg-sky-600 text-white font-semibold gap-2"
              onClick={onLogin}
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  {showCode ? 'Sign in' : 'Get verification code'}
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>

            {/* 分隔线 */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-100" />
              <span className="text-xs text-muted-foreground">or</span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>

            {/* 注册按钮 */}
            <Button
              variant="outline"
              className="h-11 font-medium"
              onClick={() => {
                window.location.href = '/register';
              }}
            >
              Create your account
            </Button>
          </CardContent>
        </Card>

        {/* 底部说明 */}
        <p className="text-xs text-muted-foreground text-center">
          By signing in, you agree to our{' '}
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
  );
};

export default Login;
