import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '@/auth/provider';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { logged } = useContext(AuthContext);

  return logged ? children : <Navigate to='/' />;
};

export default PrivateRoute;
