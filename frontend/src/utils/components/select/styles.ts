import { Select } from '@mui/material';
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
};

export default styles;
