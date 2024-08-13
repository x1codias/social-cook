import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/auth/login/login';
import Register from './pages/auth/register/register';
import TopBar from './utils/components/top-bar';
import { useSelector } from 'react-redux';

const App: React.FC = (): JSX.Element => {
  const userToken = useSelector(
    (state: { auth: { token: string } }) => state.auth.token
  );

  console.log(userToken);

  return (
    <>
      {userToken && <TopBar />}
      <Routes>
        <Route
          path="/"
          element={userToken ? <></> : <Navigate to="/login" />}
        />
        {!userToken && (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default App;
