import React from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@/auth/provider/AuthProvider';
import { Button, ThemeButton } from '@/components';
import LogoRegular from '@/assets/Notemanager-logo-original.png';
import CoverImg from '@/assets/app-cover.png';
import { useForm } from 'react-hook-form';

import './Signuppage.css';

type LoginFormInputs = {
  email: string;
  password: string;
  repeatPassword: string;
};

export const SignUpPage: React.FC = () => {
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onFormSubmit = handleSubmit(({ email, password, repeatPassword }) => {
    if (
      email.length <= 1 ||
      password.length <= 1 ||
      repeatPassword.length <= 1
    ) {
      return;
    }

    if (password !== repeatPassword) {
      alert('Password and Repeat Password do not match!');
      return;
    }

    signup(email, password);
    navigate('/dashboard/all', {
      replace: true,
    });
  });

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
          <p className='lead'>Sign up an account and start using the app!</p>
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
            <input
              className='field-input form-input'
              type='password'
              {...register('repeatPassword', { required: true })}
              placeholder='repeatPassword'
            />
            {errors.repeatPassword && (
              <p className='error-msg'>Password is required!</p>
            )}
            <Button className='login-btn' text='Sign Up' type='submit' />
          </form>
          <p>
            Do you have an account? <a href='/login'>Log In</a>
          </p>
        </div>
        <div className='col-right animate__animated animate__fadeInBottomRight animate__fast'>
          <img src={CoverImg} alt='app-cover-img' />
        </div>
      </div>
    </div>
  );
};
