import {
  Avatar,
  Chip,
  List,
  ListItem,
  Rating,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import theme from '../../../../../themes/global.theme';
import {
  ArrowForwardRounded,
  Person,
  Restaurant,
  StarRounded,
} from '@mui/icons-material';
import DefaultButton from '../../../button/button';
import { useState } from 'react';
import { getRecipes } from '../../../../../actions/recipe.actions';
import { getUsers } from '../../../../../actions/user.actions';
import useFetchData from '../../../../hooks/useFetchData';
import { useSelector } from 'react-redux';
import { RecipeState } from '../../../../../reducers/types/recipe.reducer.types';
import { UserState } from '../../../../../reducers/types/user.reducer.types';
import { useLocation, useNavigate } from 'react-router';

type SearchHintsProps = {
  searchValue: string;
  onClose: () => void;
};

const SearchHints: React.FC<SearchHintsProps> = ({
  searchValue,
  onClose,
}): JSX.Element => {
  const { t } = useTranslation();
  const [searchType, setSearchType] =
    useState<string>('recipes');
  const recipes = useSelector(
    (state: { recipe: RecipeState }) =>
      state.recipe.searchDropdownRecipes
  );
  const users = useSelector(
    (state: { user: UserState }) =>
      state.user.searchDropdownUsers
  );
  const navigate = useNavigate();
  const location = useLocation();

  const getFunction =
    searchType === 'users' ? getUsers : getRecipes;

  const { initialLoading } = useFetchData(
    getFunction,
    searchValue,
    searchType
  );

  const updateQueryParams = () => {
    onClose();
    const searchParams = new URLSearchParams(
      location.search
    );

    // Add or update query params
    Object.entries({
      search: searchValue,
      type: searchType,
    }).forEach(([key, value]) => {
      if (value === null || value === undefined) {
        searchParams.delete(key); // Remove param if value is null/undefined
      } else {
        searchParams.set(key, value);
      }
    });

    // Navigate to the same path with updated query params
    navigate(`/?${searchParams.toString()}`);
  };

  return (
    <>
      <div
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            alignSelf: 'center',
            padding: '12px 0',
            gap: '18px',
          }}
        >
          {['recipes', 'users'].map(label => (
            <DefaultButton
              key={label}
              customStyles={{
                padding: '4px 36px',
                borderRadius: '20px',
                fontSize: '18px',
                '&.Mui-disabled': {
                  backgroundColor:
                    theme.palette.default.primary,
                  color: theme.palette.customText.button,
                  border: `1px solid ${theme.palette.default.primary}`,
                },
              }}
              disabled={searchType === label}
              variant={'outlined'}
              label={
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  {label === 'recipes' ? (
                    <Restaurant fontSize={'large'} />
                  ) : (
                    <Person fontSize={'large'} />
                  )}
                  <Typography fontSize={16}>
                    {t(label)}
                  </Typography>
                </div>
              }
              onClick={() => setSearchType(label)}
            />
          ))}
        </div>
        <div>
          <List>
            {(searchType === 'users' ? users : recipes).map(
              (data, index) => (
                <ListItem
                  key={index}
                  sx={{
                    padding: '12px 24px',
                    display: 'flex',
                    width: '100%',
                    gap: '26px',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor:
                        theme.palette.customBackground
                          .default,
                    },
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      gap: '26px',
                      alignItems: 'center',
                    }}
                  >
                    <Avatar
                      sx={{ width: 54, height: 54 }}
                      src={
                        searchType === 'users'
                          ? data.photo
                          : data.photos[0]
                      }
                    />
                    {searchType === 'users' ? (
                      <>
                        <Typography
                          sx={{
                            fontFamily: 'Roboto',
                            fontSize: '16px',
                            fontWeight: 500,
                            color:
                              theme.palette.text?.primary,
                          }}
                        >
                          {data.username}
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: 'Roboto',
                            fontSize: '16px',
                            fontWeight: 500,
                            color:
                              theme.palette.text?.primary,
                          }}
                        >
                          {'(' +
                            data.followersCount +
                            ' ' +
                            t('followers') +
                            ')'}
                        </Typography>
                      </>
                    ) : (
                      <>
                        <Chip
                          sx={{
                            fontFamily: 'Comfortaa',
                            fontSize: '16px',
                            fontWeight: 500,
                            color:
                              theme.palette.text?.primary,
                            backgroundColor:
                              theme.palette.categories[
                                data.category
                              ],
                          }}
                          label={data.title}
                        />
                        {data.avgRating ? (
                          <Rating
                            defaultValue={data.avgRating}
                            readOnly
                            size={'large'}
                            sx={{
                              backgroundColor:
                                theme.palette.grey?.[300],
                              padding: '4px',
                              borderRadius: '20px',
                            }}
                            emptyIcon={
                              <StarRounded
                                fontSize={'large'}
                                sx={{
                                  color:
                                    theme.palette.background
                                      ?.paper,
                                }}
                              />
                            }
                            icon={
                              <StarRounded
                                fontSize={'large'}
                                sx={{
                                  color:
                                    theme.palette.warning,
                                }}
                              />
                            }
                          />
                        ) : (
                          <Typography
                            sx={{
                              backgroundColor:
                                theme.palette.grey?.[300],
                              padding: '6px',
                              borderRadius: '20px',
                              fontFamily: 'Comfortaa',
                              fontSize: '14px',
                            }}
                          >
                            {t('noRatingsYet')}
                          </Typography>
                        )}
                      </>
                    )}
                  </div>
                  <ArrowForwardRounded
                    sx={{ justifySelf: 'flex-end' }}
                    fontSize={'large'}
                  />
                </ListItem>
              )
            )}
          </List>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              padding: '12px 0',
              width: '100%',
            }}
          >
            <DefaultButton
              onClick={updateQueryParams}
              label={
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <Typography fontSize={18}>
                    {t('seeMore')}
                  </Typography>
                  <ArrowForwardRounded fontSize={'large'} />
                </div>
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchHints;
