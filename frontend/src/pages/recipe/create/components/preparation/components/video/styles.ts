import { styled } from '@mui/system';
import theme from '../../../../../../../themes/global.theme';
import { Button } from '@mui/material';

const styles = {
  DropzoneContainer: styled('div')(() => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    padding: '16px',
    borderRadius: '20px',
    border: `3px dashed ${theme.palette.default.light}`,
    cursor: 'pointer',
    transition: 'all .15s ease-in',
    '&:hover': {
      backgroundColor: theme.palette.default.light,
    },
  })),
  VideoBtn: styled(Button)(({ variant }) => ({
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
