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
import { useNavigate } from 'react-router';
import { IoClose, IoStar } from 'react-icons/io5';
import SearchHistory from './components/search-history';
import SearchHints from './components/search-hints';
import {
  OPEN_CREATE_RECIPE_MODAL,
  RESET_SCROLL_RECIPES_DATA,
} from '../../../actions/types';
import { useDispatch } from 'react-redux';

const TopBar: React.FC = (): JSX.Element => {
  const { AppBar, AppTitle, Search } = styles;
  const user =
    useSelector(
      (state: { auth: { user: Account } }) =>
        state.auth.user
    ) || JSON.parse(localStorage.getItem('user') as string);
  const openCreateRecipe = useSelector(
    (state: { recipe: { openCreateRecipe: boolean } }) =>
      state.recipe.openCreateRecipe
  );
  const [openMenu, setOpenMenu] =
    useState<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();
  const [isFocused, setIsFocused] = useState(false);
  const [isClosing, setIsClosing] = useState(false); // New lock flag
  const searchRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useDispatch();

  const resetScrollData = () => ({
    type: RESET_SCROLL_RECIPES_DATA,
  });

  const handleOpenCreateRecipeModal = () =>
    dispatch({
      type: OPEN_CREATE_RECIPE_MODAL,
    });

  const handleFocus = () => {
    if (!isClosing) {
      setIsFocused(true); // Open the popover only if not closing
    }
  };

  const handleBlur = (
    event: React.FocusEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    if (
      searchRef.current &&
      popoverRef.current &&
      !searchRef.current.contains(event.relatedTarget) &&
      !popoverRef.current.contains(event.relatedTarget)
    ) {
      setIsFocused(false);
    }
  };

  return (
    <AppBar position={'fixed'}>
      <AppTitle
        onClick={() => {
          dispatch(resetScrollData());
          navigate('/?type=recipes');
        }}
      >
        SocialCook
      </AppTitle>
      <Search
        ref={searchRef}
        placeholder={'Search...'}
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
        onBlur={handleBlur}
        onFocus={handleFocus}
        InputProps={{
          startAdornment: (
            <IoIosSearch
              size={20}
              fill={theme.palette.grey?.[700]}
            />
          ),
          endAdornment:
            isFocused || searchValue.length ? (
              <IoClose
                size={20}
                fill={theme.palette.grey?.[700]}
                cursor={'pointer'}
                onClick={() => setSearchValue('')}
              />
            ) : (
              <></>
            ),
        }}
        autoComplete={'off'}
      />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
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
            onClick={() => handleOpenCreateRecipeModal()}
          >
            <IoIosAddCircle
              size={30}
              fill={
                openCreateRecipe
                  ? theme.palette.default.primary
                  : theme.palette.grey?.[500]
              }
            />
          </IconButton>
        </Tooltip>
        <Tooltip
          title={
            <Typography fontSize={10}>
              {'Favorites'}
            </Typography>
          }
          placement="bottom"
        >
          <IconButton>
            <IoStar
              size={30}
              fill={theme.palette.grey?.[500]}
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
            backgroundColor: 'white',
            width: searchRef.current?.clientWidth + 'px',
          }}
        >
          {!searchValue.length ? (
            <SearchHistory />
          ) : (
            <SearchHints
              searchValue={searchValue}
              onClose={() => {
                setIsClosing(true); // Lock state
                setIsFocused(false);
              }}
            />
          )}
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
