import { Button, TextField } from '@mui/material';
import { styled } from '@mui/system';
import theme from '../../../themes/global.theme';

const styles = {
  InputField: styled(TextField)(({ height }) => ({
    '& .MuiInputBase-root': {
      fontWeight: 500,
      padding: '6px 10px',
      borderRadius: '6px',
      fontSize: '16px',
      height: height || '50px',
      backgroundColor:
        theme.palette.customBackground?.input,
      overflow: 'hidden',
    },
    '& .MuiInputBase-input': {
      color: theme.palette.customText?.primary,
      padding: 0,
      minHeight: height ? `${height} !important` : 'auto',
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
