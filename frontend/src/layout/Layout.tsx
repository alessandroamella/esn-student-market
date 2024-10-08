import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { FC } from 'react';
import Login from '../components/Dialogs/Login';

interface LayoutProps {
  children?: React.ReactNode;
}
const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      {/* Modals */}
      <Login />

      {/* App */}
      <div>
        <Header
          siteName="Student Market"
          logoSrc="https://www.esn.org/sites/default/files/ESN_full-logo-Satellite.png"
          menuItems={[
            {
              href: '/',
              title: 'Home',
            },
            {
              href: '/about',
              title: 'About',
            },
            {
              href: '/contact',
              title: 'Contact',
            },
          ]}
        />
        <main className="bg-gray-50 dark:bg-gray-800 dark:text-white min-h-screen">
          <Outlet />
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
