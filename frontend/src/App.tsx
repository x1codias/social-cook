import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/auth/login/login';
import Register from './pages/auth/register/register';
import { ConnectedProps, connect } from 'react-redux';
import TopBar from './utils/components/top-bar';

type AppProps = ConnectedProps<typeof connector>;

const App: React.FC<AppProps> = (): JSX.Element => {
  return (
    <>
      <TopBar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};

const mapStateToProps = () => ({});

const connector = connect(mapStateToProps, {});

export default connector(App);
