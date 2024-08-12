import { IoIosAddCircle, IoIosSearch } from 'react-icons/io';
import styles from './styles';
import { FaUser } from 'react-icons/fa';
import theme from '../../../themes/global.theme';
import { IconButton, Tooltip } from '@mui/material';
import { IoStarSharp } from 'react-icons/io5';

const TopBar = (): JSX.Element => {
  const { AppBar, AppTitle, Search } = styles;

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
          <IconButton>
            <FaUser size={26} fill={theme.palette.grey?.[600]} />
          </IconButton>
        </Tooltip>
      </div>
    </AppBar>
  );
};

export default TopBar;
