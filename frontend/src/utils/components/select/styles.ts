import {
  MenuItem,
  Select,
  SelectProps,
} from '@mui/material';
import { styled } from '@mui/system';
import theme from '../../../themes/global.theme';

type CustomSelectFieldProps = SelectProps & {
  minWidth: string;
  defaultValue: number | string;
};

const styles = {
  SelectField: styled(Select)<CustomSelectFieldProps>(
    ({ defaultValue, minWidth }) => ({
      '&.MuiInputBase-root': {
        minWidth,
        backgroundColor:
          theme.palette.customBackground?.input,
        fontWeight: 500,
        padding: '14px 10px',
        borderRadius: '6px',
        fontSize: '16px',
        overflow: 'hidden',
        flexGrow: 1,
        color:
          (defaultValue as string)?.length ||
          (defaultValue as number) > 0
            ? theme.palette.customText.primary
            : theme.palette.customText.secondary,
      },
      '& .MuiSelect-select': {
        padding: 0,
      },
      '&.MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
          border: `2px solid ${theme.palette.default.primary}`,
        },
        '&:hover fieldset': {
          border: `2px solid ${theme.palette.default.primary}`,
        },
      },
    })
  ),
  SelectItem: styled(MenuItem)({
    '&.MuiMenuItem-root': {
      textAlign: 'center',
      fontSize: '12px',
      fontFamily: 'Roboto',
      padding: '8px',
      fontWeight: 500,
    },
    '&.MuiMenuItem-root:hover': {
      backgroundColor:
        theme.palette.customBackground.default,
    },
    '& .MuiTouchRipple-child': {
      backgroundColor: theme.palette.default.dark,
    },
  }),
  AddBtn: styled(MenuItem)({
    '&.MuiMenuItem-root': {
      padding: '8px',
      backgroundColor: theme.palette.default.primary,
    },
    '&.MuiMenuItem-root:hover': {
      backgroundColor: theme.palette.default.dark,
    },
    '& .MuiTouchRipple-child': {
      backgroundColor: theme.palette.default.dark,
    },
  }),
};

export default styles;
