import { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Modal from '..';
import { useTranslation } from 'react-i18next';
import Button from '../../Button';

interface LoginFormInputs {
  email: string;
  password: string;
}

const Login: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    // Handle login submission logic, e.g., call API
    console.log('Login Data:', data);
  };

  const { t } = useTranslation();

  return (
    <Modal
      dialog="login"
      title={t('auth.login.title')}
      description={t('auth.login.description')}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            {t('auth.email')}
          </label>
          <input
            type="email"
            id="email"
            {...register('email', { required: 'Email is required' })}
            className={`mt-1 block w-full p-2 border ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            {t('auth.password')}
          </label>
          <input
            type="password"
            id="password"
            {...register('password', { required: 'Password is required' })}
            className={`mt-1 block w-full p-2 border ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>
        <Button type="submit" className="w-full py-2 px-4 rounded-md">
          {t('auth.login.submit')}
        </Button>
      </form>
    </Modal>
  );
};

export default Login;
