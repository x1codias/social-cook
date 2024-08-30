import { Divider, Typography } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { Account } from '../../../../types/Account';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../../store';
import { logout } from '../../../../../actions/auth.actions';
import theme from '../../../../../themes/global.theme';
import styles from './styles';

type ProfileDropdownProps = {
  open: HTMLButtonElement | null;
  setOpen: Dispatch<
    SetStateAction<HTMLButtonElement | null>
  >;
  user: Account;
};

const ProfileDropdown: React.FC<ProfileDropdownProps> = (
  props
): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, open, setOpen } = props;
  const navigate = useNavigate();

  const { ProfileMenu, ProfileMenuItem } = styles;

  const handleLogout = async () => {
    await dispatch(logout(user.id));
    navigate('/login');
  };

  return (
    <ProfileMenu
      open={!!open}
      onClose={() => setOpen(null)}
      anchorEl={open}
    >
      <Typography
        style={{
          fontFamily: 'Fredoka',
          fontSize: '16px',
          fontWeight: 600,
          color: theme.palette.default.dark,
          padding: '12px',
        }}
      >
        {user.username}
      </Typography>
      <Divider style={{ width: '100%' }} />
      <ProfileMenuItem>{'Profile'}</ProfileMenuItem>
      <ProfileMenuItem onClick={handleLogout}>
        {'Logout'}
      </ProfileMenuItem>
    </ProfileMenu>
  );
};

export default ProfileDropdown;
