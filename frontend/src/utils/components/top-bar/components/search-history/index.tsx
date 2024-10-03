import { Typography } from '@mui/material';
import styles from './styles';
import theme from '../../../../../themes/global.theme';

type SearchHistoryProps = {};

const SearchHistory: React.FC<
  SearchHistoryProps
> = (): JSX.Element => {
  const { SearchChip } = styles;
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '24px 36px',
        gap: '12px',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        <Typography
          sx={{
            fontSize: '16px',
            fontFamily: 'Fredoka',
            fontWeight: 500,
            color: theme.palette.grey?.[600],
          }}
        >
          {'Recent Searches'}
        </Typography>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <SearchChip
            label={'Ceaser Salad'}
            backgroundColor={
              theme.palette.categories.salads
            }
            onDelete={() => {}}
          />
          <SearchChip
            label={'Ceaser Salad'}
            backgroundColor={
              theme.palette.categories.salads
            }
            onDelete={() => {}}
          />
          <SearchChip
            label={'Ceaser Salad'}
            backgroundColor={
              theme.palette.categories.salads
            }
            onDelete={() => {}}
          />
          <SearchChip
            label={'Ceaser Salad'}
            backgroundColor={
              theme.palette.categories.salads
            }
            onDelete={() => {}}
          />
          <SearchChip
            label={'Ceaser Salad'}
            backgroundColor={
              theme.palette.categories.salads
            }
            onDelete={() => {}}
          />
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        <Typography
          sx={{
            fontSize: '16px',
            fontFamily: 'Fredoka',
            fontWeight: 500,
            color: theme.palette.grey?.[600],
          }}
        >
          {'Popular Publications'}
        </Typography>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <SearchChip
            label={'Ceaser Salad'}
            backgroundColor={
              theme.palette.categories.salads
            }
          />
          <SearchChip
            label={'Ceaser Salad'}
            backgroundColor={
              theme.palette.categories.salads
            }
          />
          <SearchChip
            label={'Ceaser Salad'}
            backgroundColor={
              theme.palette.categories.salads
            }
          />
          <SearchChip
            label={'Ceaser Salad'}
            backgroundColor={
              theme.palette.categories.salads
            }
          />
          <SearchChip
            label={'Ceaser Salad'}
            backgroundColor={
              theme.palette.categories.salads
            }
          />
          <SearchChip
            label={'Ceaser Salad'}
            backgroundColor={
              theme.palette.categories.salads
            }
          />
          <SearchChip
            label={'Ceaser Salad'}
            backgroundColor={
              theme.palette.categories.salads
            }
          />
          <SearchChip
            label={'Ceaser Salad'}
            backgroundColor={
              theme.palette.categories.salads
            }
          />
        </div>
      </div>
    </div>
  );
};

export default SearchHistory;
