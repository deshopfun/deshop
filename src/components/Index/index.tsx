// import { useRouter } from 'next/router';
// import { routes } from './Routes';
// import MetaTags from 'components/Common/MetaTags';
// import { useEffect, useState } from 'react';
// import HomeSidebar from 'components/Sidebar';
// import HomeHeader from 'components/Home/HomeHeader';
// import { useSnackPresistStore } from 'lib';
// import HomeFooter from 'components/Home/HomeFooter';
// import { RouteType } from 'utils/types';

// const Home = () => {
//   const router = useRouter();

//   const { snackOpen, snackMessage, snackSeverity, setSnackOpen } = useSnackPresistStore((state) => state);
//   const [currentRoute, setCurrentRoute] = useState<RouteType>();

//   useEffect(() => {
//     const route = routes.find((item) => item.path === router.pathname);

//     if (!route) return;

//     if (route?.needLogin) {
//       window.location.href = '/login';
//     }

//     setCurrentRoute(route);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [router.pathname]);

//   useEffect(() => {
//     setSnackOpen(false);
//   }, []);

//   return (
//     <div className="h-full">
//       <MetaTags title={currentRoute?.title} />

//       {currentRoute?.enableSidebar ? (
//         <div className="flex h-full">
//           <HomeSidebar />

//           <div className="w-full">
//             {/* {getShowProgress() ? <LinearProgress /> : null} */}

//             {currentRoute?.enableHomeHeader && <HomeHeader />}

//             <div className="mt-10">{currentRoute?.component || null}</div>

//             {currentRoute?.enableHomeFooter && (
//               <div className="mt-10">
//                 <HomeFooter />
//               </div>
//             )}
//           </div>
//         </div>
//       ) : (
//         <div>
//           {currentRoute?.component || null}

//           {currentRoute?.enableHomeFooter && (
//             <div className="mt-10">
//               <HomeFooter />
//             </div>
//           )}
//         </div>
//       )}

//       {/* <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={snackOpen} autoHideDuration={2000}>
//         <Alert
//           onClose={() => {
//             setSnackOpen(false);
//           }}
//           severity={snackSeverity}
//           variant="filled"
//           sx={{ width: '100%' }}
//         >
//           {snackMessage}
//         </Alert>
//       </Snackbar> */}
//     </div>
//   );
// };

// export default Home;
import { useRouter } from 'next/router';
import { routes } from './Routes';
import MetaTags from 'components/Common/MetaTags';
import { useEffect, useState } from 'react';
import HomeSidebar from 'components/Sidebar';
import HomeHeader from 'components/Home/HomeHeader';
import HomeFooter from 'components/Home/HomeFooter';
import { useSnackPresistStore } from 'lib';
import { RouteType } from 'utils/types';
import { cn } from '@/lib/utils';
import { CheckCircle2, XCircle, AlertCircle, Info, X } from 'lucide-react';

// Snackbar 图标映射
const snackIcons = {
  success: { icon: CheckCircle2, className: 'text-green-500' },
  error: { icon: XCircle, className: 'text-red-500' },
  warning: { icon: AlertCircle, className: 'text-yellow-500' },
  info: { icon: Info, className: 'text-blue-500' },
};

const Home = () => {
  const router = useRouter();
  const { snackOpen, snackMessage, snackSeverity, setSnackOpen } = useSnackPresistStore((state) => state);
  const [currentRoute, setCurrentRoute] = useState<RouteType>();

  useEffect(() => {
    const route = routes.find((item) => item.path === router.pathname);
    if (!route) return;
    if (route?.needLogin) {
      window.location.href = '/login';
      return;
    }
    setCurrentRoute(route);
  }, [router.pathname]);

  useEffect(() => {
    setSnackOpen(false);
  }, []);

  // snack 自动关闭
  useEffect(() => {
    if (!snackOpen) return;
    const timer = setTimeout(() => setSnackOpen(false), 3000);
    return () => clearTimeout(timer);
  }, [snackOpen]);

  const SnackIcon = snackSeverity ? snackIcons[snackSeverity]?.icon : Info;
  const snackIconClass = snackSeverity ? snackIcons[snackSeverity]?.className : '';

  return (
    <div className="min-h-screen bg-gray-50">
      <MetaTags title={currentRoute?.title} />

      {currentRoute?.enableSidebar ? (
        <div className="flex min-h-screen">
          {/* 侧边栏 */}
          <HomeSidebar />

          {/* 主内容区，左边留出 sidebar 宽度 */}
          <div className="flex flex-col flex-1 ml-60 min-h-screen">
            {currentRoute?.enableHomeHeader && <HomeHeader />}

            <main className="flex-1 p-6">{currentRoute?.component || null}</main>

            {currentRoute?.enableHomeFooter && <HomeFooter />}
          </div>
        </div>
      ) : (
        <div className="flex flex-col min-h-screen">
          <main className="flex-1">{currentRoute?.component || null}</main>

          {currentRoute?.enableHomeFooter && <HomeFooter />}
        </div>
      )}

      {/* Snackbar 通知 */}
      <div
        className={cn(
          'fixed top-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg bg-white border transition-all duration-300',
          snackOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none',
        )}
      >
        {SnackIcon && <SnackIcon className={cn('h-5 w-5 shrink-0', snackIconClass)} />}
        <p className="text-sm font-medium text-gray-700">{snackMessage}</p>
        <button
          onClick={() => setSnackOpen(false)}
          className="ml-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default Home;
