import { Button, IconButton, TextField, Typography } from '@mui/material';
import { styled } from '@mui/system';
import theme from '../../../themes/global.theme';

const styles = {
  CardContainer: styled('div')({
    width: 'fit-content',
    height: 'fit-content',
    display: 'flex',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow:
      '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
  }),
  CardTitle: styled(Typography)({
    color: theme.palette.customText?.primary,
    fontSize: '24px',
    fontFamily: 'Comfortaa',
    marginBottom: '20px',
  }),
  InputField: styled(TextField)(({ width, height }) => ({
    '& .MuiInputBase-root': {
      fontWeight: 500,
      width: `${width}px`,
      padding: '6px 10px',
      borderRadius: '6px',
      fontSize: '16px',
      height: height || '50px',
      backgroundColor: theme.palette.customBackground?.input,
      overflow: 'hidden',
    },
    '& .MuiInputBase-input': {
      color: theme.palette.customText?.primary,
      padding: 0,
      minHeight: height ? `${height}px !important` : 'auto',
    },
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        border: `2px solid ${theme.palette.default.primary}`,
      },
      '&:hover fieldset': {
        borderColor: `2px solid ${theme.palette.default.light}`,
      },
    },
  })),
  ButtonContained: styled(Button)({
    background: theme.palette.default.primary,
    cursor: 'pointer',
    padding: '10px 24px',
    fontSize: '16px',
    borderRadius: '20px',
    width: 'fit-content',
    alignSelf: 'center',
    color: theme.palette.customText?.button,
  }),
  ButtonText: styled('div')({
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    },
  }),
  ButtonIcon: styled(IconButton)({}),
  PasswordButton: styled(Button)({
    fontFamily: 'Comfortaa',
    color: theme.palette.default.primary,
    fontSize: '14px',
    fontWeight: 900,
    textTransform: 'none',
  }),
};

export default styles;
