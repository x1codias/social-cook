import { Chip, ChipProps } from '@mui/material';
import { styled } from '@mui/system';
import theme from '../../../../../themes/global.theme';

type CustomChipProps = ChipProps & {
  backgroundColor: string;
};

const styles = {
  SearchChip: styled(Chip)<CustomChipProps>(
    ({ backgroundColor }) => ({
      fontSize: '18px',
      color: theme.palette.customText.primary,
      backgroundColor,
      cursor: 'pointer',
    })
  ),
};

export default styles;
