import Masonry, {
  ResponsiveMasonry,
} from 'react-responsive-masonry';
import FoodCard from './food-card';
import { Typography } from '@mui/material';
import theme from '../../themes/global.theme';
import Footer from '../../utils/components/footer';
import { useSelector } from 'react-redux';
import { getRecipesFeed } from '../../actions/recipe.actions';
import { Recipe } from '../../utils/types/Recipe';
import useFetchDataInfinite from '../../utils/hooks/useFetchDataInfinite';
import { useTranslation } from 'react-i18next';
import DefaultButton from '../../utils/components/button/button';
import { useState } from 'react';
import { getUsersFeed } from '../../actions/user.actions';
import { RecipeState } from '../../reducers/types/recipe.reducer.types';
import { UserState } from '../../reducers/types/user.reducer.types';
import { Account } from '../../utils/types/Account';
import UserCard from './user-card';
import { Person, Restaurant } from '@mui/icons-material';

const Feed: React.FC = (): JSX.Element => {
  const recipesScrollData = useSelector(
    (state: { recipe: RecipeState }) =>
      state.recipe.scrollData
  );
  const usersScrollData = useSelector(
    (state: { user: UserState }) => state.user.scrollData
  );
  const [searchType, setSearchType] =
    useState<string>('recipes');
  const { t } = useTranslation();

  const getFunction =
    searchType === 'recipes'
      ? getRecipesFeed
      : getUsersFeed;

  const scrollData =
    searchType === 'recipes'
      ? recipesScrollData
      : usersScrollData;

  const { initialLoading, infiniteLoading } =
    useFetchDataInfinite(getFunction, scrollData);

  const getRandomHeight = () => {
    const minHeight = searchType === 'recipes' ? 300 : 500; // Minimum height in pixels
    const maxHeight = searchType === 'recipes' ? 800 : 900; // Maximum height in pixels
    return (
      Math.floor(
        Math.random() * (maxHeight - minHeight + 1)
      ) + minHeight
    );
  };

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '64px',
        height: '100vh',
      }}
    >
      <div
        style={{
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <Typography
          style={{
            fontFamily: 'Fredoka',
            fontSize: '28px',
            fontWeight: 600,
            color: theme.palette.default.dark,
            borderBottom: `2px solid ${theme.palette.grey?.[400]}`,
          }}
        >
          {t('forYou')}
        </Typography>
        <div
          style={{
            position: 'absolute',
            right: 30,
            top: 10,
            display: 'flex',
            gap: '16px', // Spacing between buttons
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
      </div>
      <ResponsiveMasonry
        style={{
          padding: '16px 24px',
          width: '100%',
        }}
        columnsCountBreakPoints={{
          350: 1,
          750: 2,
          1200: 3,
          1600: 4,
        }}
      >
        <Masonry gutter="14px">
          {searchType === 'recipes'
            ? scrollData.recipes.map(
                (recipe: Recipe, index: number) => (
                  <FoodCard
                    key={index}
                    height={getRandomHeight()}
                    recipeData={recipe}
                    loading={initialLoading} // Pass loading state to FoodCard
                  />
                )
              )
            : scrollData.users.map(
                (user: Account, index: number) => (
                  <UserCard
                    key={index}
                    userData={user}
                    loading={initialLoading}
                  />
                )
              )}
        </Masonry>
      </ResponsiveMasonry>
      {infiniteLoading && (
        <div>Loading more recipes...</div>
      )}{' '}
      {/* Loading indicator for infinite scroll */}
      <Footer />
    </div>
  );
};

export default Feed;
