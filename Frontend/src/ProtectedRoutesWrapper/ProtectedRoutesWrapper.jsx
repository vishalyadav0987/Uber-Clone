import Cookies from 'js-cookie'
import { Navigate } from 'react-router-dom';

const ProtectedRoutesWrapper = ({ children }) => {
  const token = Cookies.get('token');
  const isAuth = token !== undefined;
  return isAuth ? children : <Navigate to="/user-login" />;
}

export default ProtectedRoutesWrapper
