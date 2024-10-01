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
  Popover,
  Tooltip,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { Account } from '../../types/Account';
import ProfileDropdown from './components/profile-dropdown';
import { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { IoClose, IoStar } from 'react-icons/io5';

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
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const handleFocus = () => {
    setIsFocused(true); // Open the popover when input is focused
  };

  const handleBlur = (
    event: React.FocusEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    // Check if focus moved outside the input and the popover
    if (
      searchRef.current &&
      popoverRef.current &&
      !searchRef.current.contains(event.relatedTarget) &&
      !popoverRef.current.contains(event.relatedTarget)
    ) {
      setIsFocused(false); // Close popover only if focus moves outside
    }
  };

  return (
    <AppBar position={'fixed'}>
      <AppTitle onClick={() => navigate('/')}>
        SocialCook
      </AppTitle>
      <Search
        ref={searchRef}
        placeholder={'Search...'}
        onBlur={handleBlur}
        onFocus={handleFocus}
        InputProps={{
          startAdornment: (
            <IoIosSearch
              size={20}
              fill={theme.palette.grey?.[700]}
            />
          ),
          endAdornment: isFocused && (
            <IoClose
              size={20}
              fill={theme.palette.grey?.[700]}
              cursor={'pointer'}
            />
          ),
        }}
        autoComplete={''}
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
              {'Add Recipe'}
            </Typography>
          }
          placement="bottom"
        >
          <IconButton
            onClick={() => navigate('/recipes/create')}
          >
            <IoStar
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
      <Popover
        open={isFocused}
        anchorEl={searchRef.current}
        ref={popoverRef}
        onClose={() => setIsFocused(false)}
        disableAutoFocus
        disableEnforceFocus
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <div
          ref={popoverRef}
          style={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'white',
            width: searchRef.current?.clientWidth + 'px',
          }}
        >
          <div>
            <Typography
              sx={{
                fontSize: '16px',
                fontFamily: 'Fredoka',
                fontWeight: 500,
                color: theme.palette.grey?.[600],
              }}
            >
              {'Recent Searches'}
            </Typography>
            <div></div>
          </div>
          <div>
            <Typography
              sx={{
                fontSize: '16px',
                fontFamily: 'Fredoka',
                fontWeight: 500,
                color: theme.palette.grey?.[600],
              }}
            >
              {'Popular Publications'}
            </Typography>
            <div></div>
          </div>
        </div>
      </Popover>
      <ProfileDropdown
        open={openMenu}
        setOpen={setOpenMenu}
        user={user}
      />
    </AppBar>
  );
};

export default TopBar;
