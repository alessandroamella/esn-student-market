import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { FC } from "react";

interface LayoutProps {}
const Layout: FC<LayoutProps> = () => {
    return (
        <div>
            <Header />
            <main className="bg-gray-50 dark:bg-gray-800 dark:text-white min-h-screen">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
