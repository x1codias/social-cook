import {
  IoIosAddCircle,
  IoIosSearch,
} from 'react-icons/io';
import styles from './styles';
import { FaUser } from 'react-icons/fa';
import theme from '../../../themes/global.theme';
import { Avatar, IconButton, Tooltip } from '@mui/material';
import { IoStarSharp } from 'react-icons/io5';
import { logout } from '../../../actions/auth.actions';
import { useSelector } from 'react-redux';
import { Account } from '../../../types/Account';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';

const TopBar: React.FC = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const { AppBar, AppTitle, Search } = styles;
  const navigate = useNavigate();
  const user =
    useSelector(
      (state: { auth: { user: Account } }) =>
        state.auth.user
    ) || JSON.parse(localStorage.getItem('user') as string);

  // TODO: dropdown on profile pic click (logout, profile & settings?)

  console.log(user.photo);

  const handleLogout = async () => {
    await dispatch(logout(user.id));
    navigate('/login');
  };

  return (
    <AppBar position={'fixed'}>
      <AppTitle>SocialCook</AppTitle>
      <Search
        placeholder={'Search...'}
        InputProps={{
          startAdornment: (
            <IoIosSearch
              size={20}
              fill={theme.palette.grey?.[700]}
            />
          ),
        }}
      />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        <Tooltip title="Add Recipe" placement="bottom">
          <IconButton>
            <IoIosAddCircle
              size={30}
              fill={theme.palette.grey?.[500]}
            />
          </IconButton>
        </Tooltip>
        <Tooltip title="Favorites" placement="bottom">
          <IconButton>
            <IoStarSharp
              size={30}
              fill={theme.palette.grey?.[500]}
            />
          </IconButton>
        </Tooltip>
        <Tooltip title="Profile" placement="bottom">
          <IconButton onClick={handleLogout}>
            <Avatar
              src={user.photo}
              sx={{ width: 34, height: 34 }}
            />
          </IconButton>
        </Tooltip>
      </div>
    </AppBar>
  );
};

export default TopBar;
