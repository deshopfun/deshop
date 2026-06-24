// import { useRouter } from 'next/router';
// import { useState } from 'react';
// import SidebarHeader from './SidebarHeader';
// import { Button } from '@/components/ui/button';
// import Link from 'next/link';
// import { House, Compass, Bitcoin, Tv, MessageCircle, Info, CircleEllipsis } from 'lucide-react';

// type Theme = 'light' | 'dark';

// const themes = {
//   light: {
//     sidebar: {
//       backgroundColor: '#ffffff',
//       color: '#607489',
//     },
//     menu: {
//       menuContent: '#fbfcfd',
//       icon: '#000000',
//       hover: {
//         backgroundColor: '#c5e4ff',
//         color: '#44596e',
//       },
//       disabled: {
//         color: '#9fb6cf',
//       },
//     },
//   },
//   dark: {
//     sidebar: {
//       backgroundColor: '#0b2948',
//       color: '#8ba1b7',
//     },
//     menu: {
//       menuContent: '#082440',
//       icon: '#59d0ff',
//       hover: {
//         backgroundColor: '#00458b',
//         color: '#b6c8d9',
//       },
//       disabled: {
//         color: '#3e5e7e',
//       },
//     },
//   },
// };

// // hex to rgba converter
// const hexToRgba = (hex: string, alpha: number) => {
//   const r = parseInt(hex.slice(1, 3), 16);
//   const g = parseInt(hex.slice(3, 5), 16);
//   const b = parseInt(hex.slice(5, 7), 16);

//   return `rgba(${r}, ${g}, ${b}, ${alpha})`;
// };

// const HomeSidebar = () => {
//   const router = useRouter();

//   const [collapsed, setCollapsed] = useState(false);
//   const [toggled, setToggled] = useState(false);
//   const [broken, setBroken] = useState(false);
//   const [hasImage, setHasImage] = useState(false);
//   const [theme, setTheme] = useState<Theme>('light');

//   const menuItemStyles: MenuItemStyles = {
//     root: {
//       fontSize: 14,
//     },
//     icon: {
//       color: themes[theme].menu.icon,
//       [`&.${menuClasses.disabled}`]: {
//         color: themes[theme].menu.disabled.color,
//       },
//       [`&.ps-active`]: {
//         color: '#0098e5',
//       },
//     },
//     SubMenuExpandIcon: {
//       color: '#b6b7b9',
//     },
//     subMenuContent: ({ level }) => ({
//       backgroundColor:
//         level === 0 ? hexToRgba(themes[theme].menu.menuContent, hasImage && !collapsed ? 0.4 : 1) : 'transparent',
//     }),
//     button: {
//       [`&.${menuClasses.disabled}`]: {
//         color: themes[theme].menu.disabled.color,
//       },
//       '&:hover': {
//         backgroundColor: 'none',
//         color: themes[theme].menu.hover.color,
//         fontWeight: 'bold',
//       },
//       [`&.ps-active`]: {
//         color: '#0098e5',
//         backgroundColor: 'rgba(197, 228, 255, 1)',
//         fontWeight: 'bold',
//       },
//     },
//     label: ({ open }) => ({
//       fontWeight: open ? 600 : undefined,
//     }),
//   };

//   return (
//     <Sidebar
//       collapsed={false}
//       toggled={toggled}
//       onBackdropClick={() => setToggled(false)}
//       onBreakPoint={setBroken}
//       breakPoint="md"
//       rtl={false}
//       style={{ height: '100%' }}
//     >
//       <div className="h-full fixed flex flex-col w-60 border-r border-gray-200 overflow-y-auto overflow-x-hidden">
//         <SidebarHeader />
//         <div className="flex-1">
//           <Menu menuItemStyles={menuItemStyles}>
//             <MenuItem icon={<House />} active={router.pathname === '/' ? true : false} component={<Link href={'/'} />}>
//               Home
//             </MenuItem>
//             <MenuItem
//               icon={<Compass />}
//               active={router.pathname === '/explore' ? true : false}
//               component={<Link href={'/explore'} />}
//             >
//               Explore
//             </MenuItem>
//             <MenuItem
//               icon={<Bitcoin />}
//               active={router.pathname === '/blockchain' ? true : false}
//               component={<Link href={'/blockchain'} />}
//             >
//               Blockchain
//             </MenuItem>
//             <MenuItem
//               icon={<Tv />}
//               active={router.pathname === '/live' ? true : false}
//               component={<Link href={'/live'} />}
//             >
//               Livestreams
//             </MenuItem>
//             <MenuItem
//               icon={<MessageCircle />}
//               active={router.pathname === '/chat' ? true : false}
//               component={<Link href={'/chat'} />}
//             >
//               Chat
//             </MenuItem>
//             <MenuItem
//               icon={<Info />}
//               active={router.pathname === '/support' ? true : false}
//               component={<Link href={'/support'} />}
//             >
//               Support
//             </MenuItem>
//             <MenuItem
//               icon={<CircleEllipsis />}
//               active={router.pathname === '/more' ? true : false}
//               component={<Link href={'#'} />}
//             >
//               More
//             </MenuItem>
//           </Menu>

//           <div className="mt-4 px-4">
//             <Button
//               color={'green'}
//               className="w-full bg-green-700 hover:bg-green-900 text-white"
//               size="lg"
//               onClick={() => {
//                 window.location.href = '/create';
//               }}
//             >
//               Create product
//             </Button>
//           </div>
//         </div>
//         {/* <SidebarFooter collapsed={collapsed} /> */}
//       </div>
//     </Sidebar>
//   );
// };

// export default HomeSidebar;
import { useRouter } from 'next/router';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { House, Compass, Bitcoin, Tv, MessageCircle, Info, CircleEllipsis, Plus } from 'lucide-react';
import SidebarHeader from './SidebarHeader';
import SidebarFooter from './SidebarFooter';

const navItems = [
  { label: 'Home', href: '/', icon: House },
  { label: 'Explore', href: '/explore', icon: Compass },
  { label: 'Blockchain', href: '/blockchain', icon: Bitcoin },
  { label: 'Livestreams', href: '/live', icon: Tv },
  { label: 'Chat', href: '/chat', icon: MessageCircle },
  { label: 'Support', href: '/support', icon: Info },
  { label: 'More', href: '#', icon: CircleEllipsis },
];

const HomeSidebar = () => {
  const router = useRouter();

  return (
    <aside className="fixed top-0 left-0 h-full w-60 flex flex-col border-r border-gray-100 bg-white shadow-sm z-40 overflow-y-auto overflow-x-hidden">
      {/* Logo */}
      {/* <div className="h-16 flex items-center px-4 border-b border-gray-100">
        <SiteLogo />
      </div> */}
      <SidebarHeader />

      {/* 导航菜单 */}
      <nav className="flex-1 py-4 px-3 flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive = router.pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 cursor-pointer',
                  isActive ? 'bg-sky-50 text-sky-600' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900',
                )}
              >
                <item.icon className={cn('h-5 w-5 shrink-0', isActive ? 'text-sky-500' : 'text-gray-400')} />
                <span>{item.label}</span>
                {/* 激活指示条 */}
                {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-sky-500" />}
              </div>
            </Link>
          );
        })}
      </nav>

      <SidebarFooter />
    </aside>
  );
};

export default HomeSidebar;
