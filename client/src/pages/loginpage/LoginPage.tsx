import React, { useEffect } from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@/auth/provider/AuthProvider';
import { Button, ThemeButton } from '@/components';
import LogoRegular from '@/assets/Notemanager-logo-original.png';
import CoverImg from '@/assets/app-cover.png';
import { useForm } from 'react-hook-form';

import './LoginPage.css';

type LoginFormInputs = {
  email: string;
  password: string;
};

export const LoginPage: React.FC = () => {
  const { login, logged } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onFormSubmit = handleSubmit(async ({ email, password }) => {
    if (email.length <= 1 || password.length <= 1) {
      return;
    }

    await login(email, password);
  });

  useEffect(() => {
    if (logged) navigate('/dashboard/all');
  }, [logged]);

  return (
    <div className='login-page'>
      <header className='login-page-header flex'>
        <div className='brand flex'>
          <img
            src={LogoRegular}
            className='brand-logo'
            alt='NoteManager Logo'
          />
          <h4 className='brand-name'>Daily Notes</h4>
        </div>
        <ThemeButton />
      </header>
      <div className='login-inner-wrapper'>
        <div className='col-left flex animate__animated animate__fadeIn'>
          <h1>
            Simplify Your Day with Efficient <span>Daily Notes.</span>
          </h1>
          <p className='lead'>
            Login with email and password and start using the app!
          </p>
          <form className='login-bar flex flex-col' onSubmit={onFormSubmit}>
            <input
              className='field-input form-input'
              type='text'
              {...register('email', { required: true })}
              placeholder='Email Address'
            />
            {errors.email && (
              <p className='error-msg'>Email Address is required!</p>
            )}
            <input
              className='field-input form-input'
              type='password'
              {...register('password', { required: true })}
              placeholder='Password'
            />
            {errors.password && (
              <p className='error-msg'>Password is required!</p>
            )}
            <Button className='login-btn' text='Login' type='submit' />
          </form>
          <p>
            Don't have an account? <a href='/signup'>Sign up</a>
          </p>
        </div>
        <div className='col-right animate__animated animate__fadeInBottomRight animate__fast'>
          <img src={CoverImg} alt='app-cover-img' />
        </div>
      </div>
    </div>
  );
};
