import { FC } from "react";
import EsnVutLogo from "../assets/esn-vut-logo.png";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import TelegramLoginButton, { TelegramUser } from "telegram-login-button";

interface HeaderElemProps {
    title: string;
    to: string;
}
const HeaderElem: FC<HeaderElemProps> = ({ title, to }) => {
    return (
        <li className="flex">
            <Link
                rel="noopener noreferrer"
                to={to}
                className="flex items-center px-4 -mb-1 border-b-2 dark:border- hover:text-black hover:bg-gray-50 transition-colors dark:text-fuchsia-600 dark:border-fuchsia-600"
            >
                {title}
            </Link>
        </li>
    );
};

const Header = () => {
    const { t } = useTranslation();

    return (
        <header className="p-4 dark:bg-gray-100 dark:text-gray-800 border-b-2 border-gray-100">
            <div className="container md:px-12 lg:px-24 flex justify-between h-16 mx-auto">
                <div className="flex">
                    <Link
                        rel="noopener noreferrer"
                        to="/"
                        aria-label="Back to homepage"
                        className="flex items-center p-2"
                    >
                        <img
                            src={EsnVutLogo}
                            alt="ESN VUT Brno Logo"
                            className="object-contain h-16"
                        />
                    </Link>
                    <ul className="ml-3 hidden items-stretch space-x-3 md:flex">
                        <HeaderElem title="Test" to="/" />
                        <HeaderElem title="Test" to="/" />
                    </ul>
                </div>
                <div className="items-center flex-shrink-0 hidden lg:flex">
                    {/* <button
                        type="button"
                        className="px-8 py-3 font-semibold border hover:bg-gray-50 focus:bg-gray-100 transition-colors rounded dark:border-gray-800 dark:text-gray-800"
                    >
                        {t("auth.login")}
                    </button> */}
                    <TelegramLoginButton
                        botName="esn_vut_brno_market_bot"
                        usePic
                        dataOnauth={(user: TelegramUser) => console.log(user)}
                    />
                </div>
            </div>
        </header>
    );
};

export default Header;
