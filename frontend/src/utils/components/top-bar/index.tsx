import {
  IoIosAddCircle,
  IoIosSearch,
} from 'react-icons/io';
import styles from './styles';
import theme from '../../../themes/global.theme';
import { Avatar, IconButton, Tooltip } from '@mui/material';
import { IoStarSharp } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { Account } from '../../../types/Account';
import ProfileDropdown from './components/profile-dropdown';
import { useRef, useState } from 'react';

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

  // TODO: dropdown on profile pic click (logout, profile & settings?)

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
