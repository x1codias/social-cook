import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/auth/login/login';
import Register from './pages/auth/register/register';
import { ConnectedProps, connect } from 'react-redux';

type AppProps = {} & ConnectedProps<typeof connector>;

const App: React.FC<AppProps> = (props): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

const mapStateToProps = state => ({});

const connector = connect(mapStateToProps, {});

export default connector(App);
