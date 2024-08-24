import {
  IoIosAddCircle,
  IoIosSearch,
  IoIosNotifications,
  IoIosChatboxes,
} from 'react-icons/io';
import styles from './styles';
import theme from '../../../themes/global.theme';
import {
  Avatar,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { Account } from '../../types/Account';
import ProfileDropdown from './components/profile-dropdown';
import { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

const TopBar: React.FC = (): JSX.Element => {
  const { AppBar, AppTitle, Search } = styles;
  const user =
    useSelector(
      (state: { auth: { user: Account } }) =>
        state.auth.user
    ) || JSON.parse(localStorage.getItem('user') as string);
  const [openMenu, setOpenMenu] =
    useState<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // TODO: dropdown on profile pic click (logout, profile & settings?)

  return (
    <AppBar position={'fixed'}>
      <AppTitle onClick={() => navigate('/')}>
        SocialCook
      </AppTitle>
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
          gap: '12px',
        }}
      >
        <Tooltip
          title={
            <Typography fontSize={10}>
              {'Add Recipe'}
            </Typography>
          }
          placement="bottom"
        >
          <IconButton
            onClick={() => navigate('/recipes/create')}
          >
            <IoIosAddCircle
              size={30}
              fill={
                location.pathname.includes(
                  '/recipes/create'
                )
                  ? theme.palette.default.primary
                  : theme.palette.grey?.[500]
              }
            />
          </IconButton>
        </Tooltip>
        <Tooltip
          title={
            <Typography fontSize={10}>
              {'Notifications'}
            </Typography>
          }
          placement="bottom"
        >
          <IconButton>
            <IoIosNotifications
              size={30}
              fill={theme.palette.grey?.[500]}
            />
          </IconButton>
        </Tooltip>
        <Tooltip
          title={
            <Typography fontSize={10}>{'Chat'}</Typography>
          }
          placement="bottom"
        >
          <IconButton>
            <IoIosChatboxes
              size={30}
              fill={theme.palette.grey?.[500]}
            />
          </IconButton>
        </Tooltip>
        <Tooltip
          title={
            <Typography fontSize={10}>
              {'Profile'}
            </Typography>
          }
          placement="bottom"
        >
          <IconButton
            ref={menuRef}
            onClick={e => setOpenMenu(e.currentTarget)}
          >
            <Avatar
              src={user.photo}
              sx={{ width: 34, height: 34 }}
            >
              {user.username}
            </Avatar>
          </IconButton>
        </Tooltip>
      </div>
      <ProfileDropdown
        open={openMenu}
        setOpen={setOpenMenu}
        user={user}
      />
    </AppBar>
  );
};

export default TopBar;
