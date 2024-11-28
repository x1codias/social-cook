import { Button, styled } from '@mui/material';
import theme from '../../../themes/global.theme';

const styles = {
  DefaultButton: styled(Button)(({ variant }) => ({
    backgroundColor:
      variant === 'outlined'
        ? theme.palette.background?.paper
        : theme.palette.default.primary,
    cursor: 'pointer',
    padding: '8px 20px',
    borderRadius: '20px',
    width: 'fit-content',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    color:
      variant === 'outlined'
        ? theme.palette.default.primary
        : theme.palette.customText?.button,
    textTransform: 'none',
    boxShadow: 'none',
    border:
      variant === 'outlined'
        ? `1px solid ${theme.palette.default.primary}`
        : 'none',
    '&:hover': {
      color: theme.palette.customText?.button,
      border:
        variant === 'outlined'
          ? `1px solid ${theme.palette.default.primary}`
          : 'none',
      backgroundColor:
        variant === 'outlined'
          ? theme.palette.default.primary
          : theme.palette.default.dark,
    },
    '&.Mui-disabled': {
      backgroundColor: theme.palette.customBackground.input,
    },
  })),
};

export default styles;
