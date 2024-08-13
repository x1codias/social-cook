import { IoIosAddCircle, IoIosSearch } from 'react-icons/io';
import styles from './styles';
import { FaUser } from 'react-icons/fa';
import theme from '../../../themes/global.theme';
import { IconButton, Tooltip } from '@mui/material';
import { IoStarSharp } from 'react-icons/io5';
import { logout } from '../../../actions/auth.actions';
import { connect, ConnectedProps, useSelector } from 'react-redux';
import { Account } from '../../../types/Account';
import { useNavigate } from 'react-router';

type TopBarProps = ConnectedProps<typeof connector>;

const TopBar: React.FC<TopBarProps> = (props): JSX.Element => {
  const { logout } = props;
  const { AppBar, AppTitle, Search } = styles;
  const navigate = useNavigate();
  const user = useSelector(
    (state: { auth: { user: Account } }) => state.auth.user
  );

  console.log(user);

  // TODO: dropdown on profile pic click (logout, profile & settings?)

  const handleLogout = () => {
    logout(user.id);
    navigate('/');
  };

  return (
    <AppBar position={'fixed'}>
      <AppTitle>SocialCook</AppTitle>
      <Search
        placeholder={'Search...'}
        InputProps={{
          startAdornment: <IoIosSearch size={20} fill={'#000'} />,
        }}
      />
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Tooltip title="Add Recipe" placement="bottom">
          <IconButton>
            <IoIosAddCircle size={30} fill={theme.palette.grey?.[600]} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Favorites" placement="bottom">
          <IconButton>
            <IoStarSharp size={30} fill={theme.palette.grey?.[600]} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Profile" placement="bottom">
          <IconButton onClick={handleLogout}>
            <FaUser size={26} fill={theme.palette.grey?.[600]} />
          </IconButton>
        </Tooltip>
      </div>
    </AppBar>
  );
};

const connector = connect(() => ({}), { logout });

export default connector(TopBar);
