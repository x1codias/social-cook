import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/auth/login/login';
import Register from './pages/auth/register/register';
import TopBar from './utils/components/top-bar';
import { useSelector } from 'react-redux';
import Feed from './pages/feed';

const App: React.FC = (): JSX.Element => {
  const userToken = useSelector(
    (state: { auth: { token: string } }) => state.auth.token
  );

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100vw',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'auto',
      }}
    >
      {userToken && <TopBar />}
      <Routes>
        <Route
          path="/"
          element={
            userToken ? <Feed /> : <Navigate to="/login" />
          }
        />
        {!userToken && (
          <>
            <Route path="/login" element={<Login />} />
            <Route
              path="/register"
              element={<Register />}
            />
          </>
        )}
      </Routes>
    </div>
  );
};

export default App;
