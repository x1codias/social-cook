import { List, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import theme from '../../../../../themes/global.theme';
import {
  ArrowForwardRounded,
  Person,
  Restaurant,
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
import {
  RESET_SCROLL_RECIPES_DATA,
  RESET_SCROLL_USERS_DATA,
} from '../../../../../actions/types';
import { useDispatch } from 'react-redux';
import SearchRecipeItem from './components/search-recipe-item';
import SearchUserItem from './components/searchUserItem';

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
  const dispatch = useDispatch();

  const getFunction =
    searchType === 'users' ? getUsers : getRecipes;

  const { initialLoading } = useFetchData(
    getFunction,
    searchValue,
    searchType
  );

  const resetRecipesScrollData = () => ({
    type: RESET_SCROLL_RECIPES_DATA,
  });

  const resetUsersScrollData = () => ({
    type: RESET_SCROLL_USERS_DATA,
  });

  const updateQueryParams = () => {
    dispatch(resetRecipesScrollData());
    dispatch(resetUsersScrollData());
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
            icon={
              label === 'recipes' ? (
                <Restaurant fontSize={'large'} />
              ) : (
                <Person fontSize={'large'} />
              )
            }
            label={t(label)}
            onClick={() => setSearchType(label)}
          />
        ))}
      </div>
      <div>
        <List>
          {searchType === 'recipes'
            ? recipes.map((recipe, index) => (
                <SearchRecipeItem
                  data={recipe}
                  index={index}
                  navigateToRecipe={() => {
                    onClose();
                    navigate(`/recipes/${recipe.id}`);
                  }}
                />
              ))
            : users.map((user, index) => (
                <SearchUserItem
                  data={user}
                  index={index}
                  navigateToUser={() => {
                    onClose();
                    navigate(`/users/${user.id}`);
                  }}
                />
              ))}
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
  );
};

export default SearchHints;
