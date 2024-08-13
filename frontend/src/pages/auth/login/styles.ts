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
  InputField: styled(TextField)({
    '& .MuiInputBase-root': {
      fontWeight: 500,
      width: '400px',
      padding: '6px 10px',
      borderRadius: '6px',
      fontSize: '16px',
      height: '50px',
      backgroundColor: theme.palette.customBackground?.input,
    },
    '& > input': {
      color: theme.palette.customText?.secondary,
      padding: 0,
    },
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        border: `2px solid ${theme.palette.default.primary}`,
      },
      '&:hover fieldset': {
        borderColor: `2px solid ${theme.palette.default.light}`,
      },
    },
  }),
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
};

export default styles;
