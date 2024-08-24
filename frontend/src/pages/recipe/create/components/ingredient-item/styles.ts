import { TextField } from '@mui/material';
import { styled } from '@mui/system';
import theme from '../../../../../themes/global.theme';

const styles = {
  InputField: styled(TextField)(({ maxWidth, height }) => ({
    '& .MuiInputBase-root': {
      fontWeight: 500,
      maxWidth: `${maxWidth}px`,
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
};

export default styles;
