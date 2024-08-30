import {
  styled,
  TextField,
  TextFieldProps,
} from '@mui/material';
import theme from '../../../themes/global.theme';

type CustomTextFieldProps = TextFieldProps & {
  height: string;
  maxWidth: string;
  minWidth: string;
};

const styles = {
  InputField: styled(TextField)<
    Partial<CustomTextFieldProps>
  >(({ height, maxWidth, minWidth }) => ({
    '& .MuiInputBase-root': {
      fontWeight: 500,
      padding: '6px 10px',
      borderRadius: '6px',
      fontSize: '16px',
      height: height || '50px',
      backgroundColor:
        theme.palette.customBackground?.input,
      overflow: 'hidden',
      maxWidth: maxWidth || '300px',
      minWidth: minWidth || '90px',
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
