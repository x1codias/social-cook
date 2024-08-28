import { Menu, MenuItem, Select } from '@mui/material';
import { styled } from '@mui/system';
import theme from '../../../themes/global.theme';

const styles = {
  SelectField: styled(Select)(
    ({ defaultValue, minWidth }) => ({
      '&.MuiInputBase-root': {
        minWidth: `${minWidth}px`,
        backgroundColor:
          theme.palette.customBackground?.input,
        fontWeight: 500,
        padding: '14px 10px',
        borderRadius: '6px',
        fontSize: '16px',
        overflow: 'hidden',
        color: defaultValue?.length
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
          borderColor: `2px solid ${theme.palette.default.light}`,
        },
      },
    })
  ),
  SelectMenu: styled(Menu)({}),
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
};

export default styles;
