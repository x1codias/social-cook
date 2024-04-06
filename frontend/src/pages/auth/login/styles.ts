import {
  IconButton,
  InputBaseProps,
  TextField,
  Typography,
} from '@mui/material';
import { styled } from '@mui/system';
import theme from '../../../themes/global.theme';

interface CustomTextFieldProps extends InputBaseProps {
  padding?: string;
}

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
    color: theme.palette.text?.primary,
    fontSize: '24px',
    fontFamily: 'Comfortaa',
  }),
  InputField: styled(TextField)(({ padding, value }: CustomTextFieldProps) => ({
    width: '300px',
    '& .MuiInputBase-root': {
      padding: '4px 8px',
      borderRadius: '30px',
    },
    '& .MuiInputLabel-root': {
      fontSize: '14px',
    },
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline legend': {
      padding: value && padding ? padding : 0,
    },
    '& .MuiOutlinedInput-root:focus-within .MuiOutlinedInput-notchedOutline legend':
      {
        padding: padding || 0,
      },
  })),
  ButtonContained: styled('div')({
    background: 'transparent',
    cursor: 'pointer',
    border: '1px solid',
    padding: '8px 16px',
    fontSize: '16px',
    borderRadius: '20px',
    width: 'fit-content',
    alignSelf: 'center',
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
