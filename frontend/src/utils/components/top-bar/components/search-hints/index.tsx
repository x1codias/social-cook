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

type SearchHintsProps = {
  searchValue: string;
};

const SearchHints: React.FC<SearchHintsProps> = ({
  searchValue,
}): JSX.Element => {
  const { t } = useTranslation();
  const [searchType, setSearchType] =
    useState<string>('recipe');
  const recipes = useSelector(
    (state: { recipe: RecipeState }) =>
      state.recipe.searchDropdownRecipes
  );
  const users = useSelector(
    (state: { user: UserState }) =>
      state.user.searchDropdownUsers
  );

  const getFunction =
    searchType === 'user' ? getUsers : getRecipes;

  const { initialLoading } = useFetchData(
    getFunction,
    searchValue,
    searchType
  );

  console.log(recipes);

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
          {['recipe', 'user'].map(label => (
            <DefaultButton
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
              label={t(label)}
              onClick={() => setSearchType(label)}
            />
          ))}
        </div>
        <div>
          <List>
            {(searchType === 'user' ? users : recipes).map(
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
                        searchType === 'user'
                          ? data.photo
                          : data.photos[0]
                      }
                    />
                    {searchType === 'user' ? (
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
