import { useTranslation } from 'react-i18next';
import EsnVutLogo from '../assets/esn-vut-logo.png';
import { FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="px-4 py-8 md:px-10 lg:px-16 dark:bg-gray-100 dark:text-gray-600">
      <div className="container flex flex-wrap items-center justify-center mx-auto space-y-4 sm:justify-between sm:space-y-0">
        <div className="flex flex-row pr-3 space-x-4 sm:space-x-8">
          <div className="flex items-center justify-center flex-shrink-0 w-20 h-12 rounded-full dark:bg-fuchsia-600">
            <img
              src={EsnVutLogo}
              alt="ESN VUT Brno Logo"
              className="object-contain h-16"
            />
          </div>
          <ul className="flex flex-wrap items-center space-x-4 sm:space-x-8">
            <li>
              <Link to="#">{t('legal.tos')}</Link>
            </li>
            <li>
              <Link to="#">{t('legal.privacy')}</Link>
            </li>
          </ul>
        </div>
        <ul className="flex flex-wrap pl-3 space-x-4 sm:space-x-8">
          <li>
            <a
              href="https://www.instagram.com/esnvutbrno/"
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center space-x-1"
            >
              <FaInstagram className="inline mr-1" />
              esnvutbrno
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
