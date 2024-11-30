import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/auth/login/login';
import Register from './pages/auth/register/register';
import TopBar from './utils/components/top-bar';
import Feed from './pages/feed';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateRecipeModal from './pages/recipe/create/modal';
import RecipePage from './pages/recipe';

const App: React.FC = (): JSX.Element => {
  const userToken = JSON.parse(
    (localStorage.getItem('token') as string) || 'null'
  );

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100vw',
        height: '100vh',
        alignItems: 'center',
        justifyContent: userToken ? 'flex-start' : 'center',
      }}
    >
      <ToastContainer />
      {userToken && <TopBar />}
      <Routes>
        <Route
          path="/"
          element={
            userToken ? <Feed /> : <Navigate to="/login" />
          }
        />
        {!userToken ? (
          <>
            <Route path="/login" element={<Login />} />
            <Route
              path="/register"
              element={<Register />}
            />
          </>
        ) : (
          <></>
        )}
        <Route
          path="*"
          element={
            <Navigate
              to={userToken ? '/?type=recipes' : '/login'}
            />
          }
        />
        <Route
          path="/recipes/:id"
          element={<RecipePage />}
        />
      </Routes>
      {userToken && <CreateRecipeModal />}
    </div>
  );
};

export default App;
