import { useSnackPresistStore } from '@/lib';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from '@/utils/http/axios';
import { Http } from '@/utils/http/http';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SiteLogo } from '@/components/Logo/SiteLogo';
import { MailCheck, ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const EmailConfirm = () => {
  const router = useRouter();
  const code = typeof router.query.code === 'string' ? router.query.code : ''

  const [showLogin, setShowLogin] = useState(false);
  const [loading, setLoading] = useState(false);

  const { setSnackOpen, setSnackMessage, setSnackSeverity } = useSnackPresistStore((state) => state);

  const showError = (msg: string) => {
    setSnackSeverity('error');
    setSnackMessage(msg);
    setSnackOpen(true);
  };

  const onClickVerify = async () => {
    if (!code) return showError('Incorrect code input');
    setLoading(true);
    try {
      const response: any = await axios.get(Http.verify_invitation, { params: { code } });
      if (response.result) {
        setShowLogin(true);
        setSnackSeverity('success');
        setSnackMessage('Registration successful, please proceed to log in');
        setSnackOpen(true);
      } else {
        showError('Verification failed, please try again');
      }
    } catch (e) {
      showError('Network error. Please try again later.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md flex flex-col items-center gap-8">
        <SiteLogo />

        <Card className="w-full shadow-lg border-0 rounded-2xl overflow-hidden">
          <div
            className={cn(
              'px-8 py-8 flex flex-col items-center gap-3 text-center text-white transition-all duration-500',
              showLogin
                ? 'bg-gradient-to-br from-green-500 to-emerald-400'
                : 'bg-gradient-to-br from-blue-600 to-sky-400',
            )}
          >
            <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center">
              {showLogin ? (
                <ShieldCheck className="h-8 w-8 text-white" />
              ) : (
                <MailCheck className="h-8 w-8 text-white" />
              )}
            </div>
            <div>
              <h1 className="text-xl font-bold">{showLogin ? 'Email Verified!' : 'Verify your email'}</h1>
              <p className="text-white/80 text-sm mt-1">
                {showLogin
                  ? 'Your account has been created successfully'
                  : 'Click the button below to complete your registration'}
              </p>
            </div>
          </div>

          <CardContent className="p-8 flex flex-col gap-4">
            {!showLogin ? (
              <>
                <div className="bg-sky-50 rounded-xl px-4 py-3 text-sm text-sky-700">
                  We received your registration request. Click <span className="font-semibold">Verify</span> to activate
                  your account.
                </div>

                <Button
                  className="h-11 bg-sky-500 hover:bg-sky-600 text-white font-semibold gap-2"
                  onClick={onClickVerify}
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      Verify my email <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </>
            ) : (
              <>
                <div className="bg-green-50 rounded-xl px-4 py-3 text-sm text-green-700">
                  Your account is ready. You can now log in and start using Deshop.
                </div>

                <Button
                  className="h-11 bg-sky-500 hover:bg-sky-600 text-white font-semibold gap-2"
                  onClick={() => {
                    window.location.href = '/login';
                  }}
                >
                  Go to log in
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </>
            )}

            <Button
              variant="ghost"
              className="h-10 text-muted-foreground hover:text-gray-800"
              onClick={() => {
                window.location.href = '/';
              }}
            >
              Back to home
            </Button>
          </CardContent>
        </Card>

        <p className="text-xs text-muted-foreground text-center">
          By verifying, you agree to our{' '}
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

export default EmailConfirm;
