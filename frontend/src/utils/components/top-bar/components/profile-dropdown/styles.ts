import { Menu, MenuItem } from '@mui/material';
import { styled } from '@mui/system';
import theme from '../../../../../themes/global.theme';

const styles = {
  ProfileMenu: styled(Menu)({
    '& .MuiList-root': {
      paddingTop: 0,
      paddingBottom: 0,
    },
  }),
  ProfileMenuItem: styled(MenuItem)({
    '&.MuiMenuItem-root': {
      justifyContent: 'center',
      textAlign: 'center',
      fontSize: '12px',
      fontFamily: 'Roboto',
      padding: '8px',
      fontWeight: 500,
    },
    '&.MuiMenuItem-root:hover': {
      backgroundColor:
        theme.palette.customBackground.default,
    },
    '& .MuiTouchRipple-child': {
      backgroundColor: theme.palette.default.dark,
    },
  }),
};

export default styles;
