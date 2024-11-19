import { Avatar, Typography } from '@mui/material';
import styles from './styles';
import theme from '../../../../../themes/global.theme';
import { useTranslation } from 'react-i18next';
import useFetchData from '../../../../hooks/useFetchData';
import { useSelector } from 'react-redux';
import {
  getSearchHistory,
  removeFromSearchHistory,
} from '../../../../../actions/search.actions';
import { SearchState } from '../../../../../reducers/types/search.reducer.types';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../../store';

type SearchHistoryProps = {};

const SearchHistory: React.FC<
  SearchHistoryProps
> = (): JSX.Element => {
  const { t } = useTranslation();
  const { SearchChip } = styles;
  const dispatch = useDispatch<AppDispatch>();
  const searchHistory = useSelector(
    (state: { search: SearchState }) =>
      state.search.searchHistory
  );
  const popularUserSearches = useSelector(
    (state: { search: SearchState }) =>
      state.search.popularUserSearches
  );
  const popularRecipeSearches = useSelector(
    (state: { search: SearchState }) =>
      state.search.popularRecipeSearches
  );

  const { initialLoading } = useFetchData(getSearchHistory);

  const handleDeleteSearchItem = async (
    e: any,
    searchId: number
  ) => {
    e.preventDefault();

    await dispatch(removeFromSearchHistory(searchId));
  };

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
          {t('recentSearches')}
        </Typography>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          {searchHistory.length ? (
            searchHistory.map(search => (
              <SearchChip
                avatar={
                  <Avatar
                    src={
                      search.context === 'user'
                        ? search.user.photo
                        : search.recipe.photos?.[0]
                    }
                  />
                }
                label={
                  search.context === 'user'
                    ? search.user.username
                    : search.recipe.title
                }
                backgroundColor={
                  search.context === 'user'
                    ? theme.palette.default.light
                    : theme.palette.categories[
                        search.recipe.category
                      ]
                }
                onDelete={e =>
                  handleDeleteSearchItem(e, search.id)
                }
              />
            ))
          ) : (
            <Typography
              sx={{
                fontSize: '16px',
                fontFamily: 'Comfortaa',
                fontWeight: 700,
                color: theme.palette.customText.primary,
              }}
            >
              {t('searchHistoryEmpty')}
            </Typography>
          )}
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
          {t('popularRecipes')}
        </Typography>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          {popularRecipeSearches.length ? (
            popularRecipeSearches.map(search => (
              <SearchChip
                avatar={
                  <Avatar src={search.recipe.photos?.[0]} />
                }
                label={search.recipe.title}
                backgroundColor={
                  theme.palette.categories[
                    search.recipe.category
                  ]
                }
              />
            ))
          ) : (
            <Typography
              sx={{
                fontSize: '16px',
                fontFamily: 'Comfortaa',
                fontWeight: 700,
                color: theme.palette.customText.primary,
              }}
            >
              {t('notEnoughRecipeSearches')}
            </Typography>
          )}
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
          {t('popularUsers')}
        </Typography>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          {popularUserSearches.length ? (
            popularUserSearches.map(search => (
              <SearchChip
                avatar={<Avatar src={search.user.photo} />}
                label={search.user.username}
                backgroundColor={
                  theme.palette.default.light
                }
              />
            ))
          ) : (
            <Typography
              sx={{
                fontSize: '16px',
                fontFamily: 'Comfortaa',
                fontWeight: 700,
                color: theme.palette.customText.primary,
              }}
            >
              {t('notEnoughUserSearches')}
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchHistory;
