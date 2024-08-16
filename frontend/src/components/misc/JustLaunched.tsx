import { useTranslation } from "react-i18next";

const JustLaunched = () => {
    const { t } = useTranslation();

    return (
        <div className="p-6 py-8 md:py-10 lg:py-12 bg-fuchsia-600 text-gray-50">
            <div className="container mx-auto">
                <div className="flex flex-col lg:flex-row items-center justify-between">
                    <h2 className="text-center w-full text-4xl md:text-5xl lg:text-6xl tracking-tighter font-bold">
                        {t("home.hero")}
                    </h2>
                </div>
            </div>
        </div>
    );
};

export default JustLaunched;
