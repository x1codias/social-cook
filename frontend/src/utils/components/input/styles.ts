import {
  styled,
  TextField,
  TextFieldProps,
} from '@mui/material';
import theme from '../../../themes/global.theme';

type CustomTextFieldProps = TextFieldProps & {
  height?: string;
  maxWidth?: string;
  minWidth?: string;
  hasError?: boolean;
};

const styles = {
  InputField: styled(TextField)<
    Partial<CustomTextFieldProps>
  >(({ height, maxWidth, minWidth, hasError }) => ({
    '& .MuiInputBase-root': {
      fontWeight: 500,
      padding: '10px 10px',
      borderRadius: '6px',
      fontSize: '16px',
      maxHeight: height || '50px',
      backgroundColor:
        theme.palette.customBackground?.input,
      maxWidth: maxWidth || '300px',
      minWidth: minWidth || '90px',
      overflow: 'hidden',
    },
    '& .MuiInputBase-input': {
      color: theme.palette.customText?.primary,
      minHeight: height ? `${height} !important` : 'auto',
      padding: '10px 0',
    },
    '& .MuiOutlinedInput-root': {
      border: hasError
        ? `1px solid ${theme.palette.customError.main}`
        : undefined,
      '&.Mui-focused': {
        border: `2px solid ${theme.palette.default.primary}`,
      },
      '&:hover': {
        border: `2px solid ${theme.palette.default.primary}`,
      },
      '&.Mui-focused fieldset': {
        border: 'none',
      },
      '&:hover fieldset': {
        border: 'none',
      },
      '&   fieldset': {
        border: hasError ? 'none' : undefined,
      },
    },
  })),
};

export default styles;
