import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ element }: { element: JSX.Element }) => {
  const userToken = useSelector(
    (state: { auth: { token: string } }) => state.auth.token
  );
  return !userToken ? <Navigate to="/" /> : element;
};

export default PublicRoute;
