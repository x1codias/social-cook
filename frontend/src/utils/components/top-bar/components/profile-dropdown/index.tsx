import { Menu, MenuItem } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { Account } from '../../../../../types/Account';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../../store';
import { logout } from '../../../../../actions/auth.actions';

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

  const handleLogout = async () => {
    await dispatch(logout(user.id));
    navigate('/login');
  };

  return (
    <Menu
      open={!!open}
      onClose={() => setOpen(null)}
      anchorEl={open}
    >
      <MenuItem>{user.username}</MenuItem>
      <MenuItem>{'Profile'}</MenuItem>
      <MenuItem onClick={handleLogout}>{'Logout'}</MenuItem>
    </Menu>
  );
};

export default ProfileDropdown;
