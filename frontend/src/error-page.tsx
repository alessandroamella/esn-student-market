import { useRouteError, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import _ from 'lodash';
import { BiArrowBack } from 'react-icons/bi';

interface Error {
  status?: number;
  statusText?: string;
  message?: string;
}

export default function ErrorPage() {
  const error = useRouteError() as Error;
  console.error(error);

  const { t } = useTranslation();

  const translations = useMemo(
    () => ({
      en: 'We have a problem',
      de: 'Wir haben ein Problem',
      fr: 'Nous avons un problème',
      it: 'Abbiamo un problema',
      es: 'Tenemos un problema',
      pl: 'Mamy problem',
      uk: 'У нас проблема',
      ru: 'У нас проблема',
      ro: 'Avem o problemă',
      nl: 'We hebben een probleem',
      el: 'Έχουμε πρόβλημα',
      cs: 'Máme problém',
      sv: 'Vi har ett problem',
      hu: 'Van egy problémánk',
      bg: 'Имаме проблем',
      fi: 'Meillä on ongelma',
      da: 'Vi har et problem',
      no: 'Vi har et problem',
      sk: 'Máme problém',
      hr: 'Imamo problem',
    }),
    [],
  );

  const navigate = useNavigate();

  return (
    <section
      id="error-page"
      className="relative flex items-center h-full py-16 dark:bg-gray-50 dark:text-gray-800"
    >
      <button
        className="absolute top-8 left-8 p-3 font-semibold border hover:bg-gray-100 focus:bg-gray-200 transition-colors rounded-full dark:border-gray-800 dark:text-gray-800"
        onClick={() => navigate(-1)}
      >
        <BiArrowBack />
      </button>
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="text-center">
          <h2 className="mb-8 font-extrabold text-4xl md:text-5xl lg:text-6xl xl:text-7xl dark:text-gray-400">
            <span className="sr-only">{t('common.error')}</span>
            {_.sample(Object.values(translations))} 😭😭
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
            {t('navigation.backToHome')}
          </Link>
        </div>
      </div>
    </section>
  );
}
