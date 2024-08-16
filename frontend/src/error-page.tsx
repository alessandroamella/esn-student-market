import { useRouteError, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function ErrorPage() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const error = useRouteError() as any;
    console.error(error);

    const { t } = useTranslation();

    return (
        <section
            id="error-page"
            className="flex items-center h-full p-16 dark:bg-gray-50 dark:text-gray-800"
        >
            <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
                <div className="max-w-xl text-center">
                    <h2 className="mb-8 font-extrabold text-6xl md:text-7xl lg:text-8xl xl:text-9xl dark:text-gray-400">
                        <span className="sr-only">Error</span>
                        Whoops!
                    </h2>
                    <p className="text-2xl font-semibold md:text-3xl">
                        {error.status || error.statusText}
                    </p>
                    <p className="mt-4 mb-8 dark:text-gray-600">
                        {error.message || error.statusText}
                    </p>
                    <Link
                        rel="noopener noreferrer"
                        to="/"
                        className="px-8 py-3 font-semibold rounded dark:bg-fuchsia-600 dark:text-gray-50"
                    >
                        {t("navigation.backToHome")}
                    </Link>
                </div>
            </div>
        </section>
    );
}
