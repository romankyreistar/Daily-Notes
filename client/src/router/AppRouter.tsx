import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { HomePage, LoginPage, SignUpPage } from '@/pages';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path='/*' element={<LoginPage />} />
      <Route path='/signup/*' element={<SignUpPage />} />
      <Route
        path='/dashboard/*'
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};
