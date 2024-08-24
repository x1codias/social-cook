import { Button } from '@mui/material';
import { styled } from '@mui/system';
import theme from '../../../../../themes/global.theme';

const styles = {
  DefaultButton: styled(Button)({
    backgroundColor: theme.palette.default.primary,
    cursor: 'pointer',
    padding: '8px 14px',
    fontSize: '16px',
    borderRadius: '20px',
    width: 'fit-content',
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.customText?.button,
    textTransform: 'none',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: theme.palette.default.dark,
    },
  }),
};

export default styles;
