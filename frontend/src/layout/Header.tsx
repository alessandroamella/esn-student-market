import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { slide as Menu } from 'react-burger-menu';

interface MenuItemType {
  href: string;
  title: string;
  subItems?: { href: string; title: string }[];
}

interface HeaderProps {
  logoSrc?: string;
  siteName?: string;
  menuItems: MenuItemType[];
}

interface HeaderElemProps {
  title: string;
  to: string;
  subItems?: { href: string; title: string }[];
}

const HeaderElem: FC<HeaderElemProps> = ({ title, to, subItems }) => {
  return (
    <li className="flex relative group">
      <Link
        to={to}
        className="flex items-center px-4 py-3 rounded-lg transition-colors -mb-1 border-b-2 border-transparent hover:text-black hover:bg-gray-50 dark:text-fuchsia-600"
      >
        {title}
      </Link>
      {subItems && (
        <ul className="absolute hidden group-hover:block bg-white border border-gray-200 rounded shadow-md mt-12 py-2 z-10">
          {subItems.map((subItem) => (
            <li key={subItem.title}>
              <Link
                to={subItem.href}
                className="block p-4 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              >
                {subItem.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

const Header: FC<HeaderProps> = ({ logoSrc, siteName, menuItems }) => {
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleStateChange = (state: { isOpen: boolean }) => {
    setIsMobileMenuOpen(state.isOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="p-4 dark:bg-gray-100 dark:text-gray-800 border-b-2 border-gray-100 shadow-md relative z-50">
      <div className="container md:px-12 lg:px-24 flex justify-between h-16 mx-auto">
        <div className="flex items-center">
          <Link
            to="/"
            aria-label="Back to homepage"
            className="flex items-center p-2"
          >
            {logoSrc && (
              <img
                src={logoSrc}
                alt={siteName || 'Logo'}
                className="object-contain h-16"
              />
            )}
            {siteName && (
              <span className="text-xl xl:text-2xl font-bold text-gray-800 ml-2">
                {siteName}
              </span>
            )}
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center">
          <ul className="flex items-stretch space-x-3">
            {menuItems.map((item) => (
              <HeaderElem
                key={item.title}
                title={item.title}
                to={item.href}
                subItems={item.subItems}
              />
            ))}
          </ul>
          <div className="ml-6">
            <button
              type="button"
              className="px-8 py-3 font-semibold border hover:bg-gray-50 focus:bg-gray-100 transition-colors rounded dark:border-gray-800 dark:text-gray-800"
            >
              {t('auth.login')}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div className="lg:hidden block">
          <Menu
            isOpen={isMobileMenuOpen}
            onStateChange={handleStateChange}
            width={280}
            styles={burgerMenuStyles}
            right
            customBurgerIcon={
              <div className="opacity-50 hover:opacity-75">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </div>
            }
          >
            <nav>
              <ul className="space-y-4 text-white">
                {menuItems.map((item) => (
                  <li key={item.title}>
                    <Link
                      to={item.href}
                      className="hover:bg-purple-700 px-4 py-2 rounded block"
                      onClick={closeMobileMenu}
                    >
                      {item.title}
                    </Link>
                    {item.subItems && (
                      <ul className="pl-4">
                        {item.subItems.map((subItem) => (
                          <li key={subItem.title} className="py-1">
                            <Link
                              to={subItem.href}
                              className="hover:underline text-gray-300 block"
                              onClick={closeMobileMenu}
                            >
                              {subItem.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
                <li className="pt-4">
                  <button
                    type="button"
                    className="w-full px-8 py-3 font-semibold border border-white text-white hover:bg-white hover:text-gray-800 transition-colors rounded"
                    onClick={closeMobileMenu}
                  >
                    {t('auth.login')}
                  </button>
                </li>
              </ul>
            </nav>
          </Menu>
        </div>
      </div>
    </header>
  );
};

const burgerMenuStyles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '36px',
    height: '30px',
    right: '20px',
    top: '20px',
  },
  bmBurgerBars: {
    background: '#373a47',
  },
  bmCrossButton: {
    height: '24px',
    width: '24px',
  },
  bmCross: {
    background: '#bdc3c7',
  },
  bmMenu: {
    background: '#373a47',
    padding: '2.5em 1.5em 0',
    fontSize: '1.15em',
  },
  bmMorphShape: {
    fill: '#373a47',
  },
  bmItemList: {
    color: '#b8b7ad',
    padding: '0.8em',
  },
  bmItem: {
    display: 'inline-block',
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)',
  },
};

export default Header;
