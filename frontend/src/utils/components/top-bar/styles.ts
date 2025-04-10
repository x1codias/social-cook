import {
  AppBar,
  TextField,
  Typography,
} from '@mui/material';
import { styled } from '@mui/system';
import theme from '../../../themes/global.theme';

const styles = {
  AppBar: styled(AppBar)({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    background: theme.palette.background?.paper,
    padding: '4px 16px',
    gap: '46px',
    boxShadow: 'none',
    width: '100%',
  }),
  AppTitle: styled(Typography)({
    fontSize: '30px',
    fontWeight: 700,
    color: theme.palette.default.primary,
    boxShadow: 'none',
    fontFamily: 'Comfortaa',
    cursor: 'pointer',
  }),
  Search: styled(TextField)({
    flexGrow: 1,
    '& .MuiInputBase-root': {
      '& fieldset': {
        border: 'unset',
      },
      background: theme.palette.grey?.[300],
      borderRadius: '20px',
    },
    '& .MuiInputBase-input': {
      padding: '8px 12px',
      fontSize: '16px',
    },
  }),
};

export default styles;
