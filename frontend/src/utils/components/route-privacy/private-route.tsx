import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }: { element: JSX.Element }) => {
  const userToken = useSelector(
    (state: { auth: { token: string } }) => state.auth.token
  );
  return userToken ? <Navigate to="/" /> : element;
};

export default PrivateRoute;
