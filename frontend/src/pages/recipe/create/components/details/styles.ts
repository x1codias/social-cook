import { Button } from '@mui/material';
import { styled } from '@mui/system';
import theme from '../../../../../themes/global.theme';

const styles = {
  ImageBtn: styled(Button)(({ variant }) => ({
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
    fontSize: '14px',
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
