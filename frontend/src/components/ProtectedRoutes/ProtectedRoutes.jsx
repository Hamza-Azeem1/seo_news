import PropTypes from 'prop-types';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoutes = () => {
  const isLogged = useSelector(state => state.admin.isAuthenticated);

  return isLogged ? <Outlet /> : <Navigate to='/admin-login' />;
};

ProtectedRoutes.propTypes = {
  isLogged: PropTypes.bool.isRequired,
};

export default ProtectedRoutes;
