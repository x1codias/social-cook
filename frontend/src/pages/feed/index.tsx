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
import { useCallback, useEffect, useMemo } from 'react';
import { getUsersFeed } from '../../actions/user.actions';
import { RecipeState } from '../../reducers/types/recipe.reducer.types';
import { UserState } from '../../reducers/types/user.reducer.types';
import { Account } from '../../utils/types/Account';
import UserCard from './user-card';
import { Person, Restaurant } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import {
  RESET_SCROLL_RECIPES_DATA,
  RESET_SCROLL_USERS_DATA,
} from '../../actions/types';

const Feed: React.FC = (): JSX.Element => {
  const recipesScrollData = useSelector(
    (state: { recipe: RecipeState }) =>
      state.recipe.scrollData
  );
  const usersScrollData = useSelector(
    (state: { user: UserState }) => state.user.scrollData
  );
  const { t } = useTranslation();
  const location = useLocation();
  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location]
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const resetScrollData = useCallback(
    () => ({
      type:
        searchParams.get('type') === 'users'
          ? RESET_SCROLL_RECIPES_DATA
          : RESET_SCROLL_USERS_DATA,
    }),
    [searchParams]
  );

  const getFunction =
    searchParams.get('type') === 'recipes'
      ? getRecipesFeed
      : getUsersFeed;

  const scrollData =
    searchParams.get('type') === 'recipes'
      ? recipesScrollData
      : usersScrollData;

  useEffect(() => {
    dispatch(resetScrollData());
  }, [searchParams, resetScrollData, dispatch]);

  useEffect(() => {
    if (!searchParams.get('type')) {
      searchParams.set('type', 'recipes');
      navigate(`/?${searchParams.toString()}`);
    }
  }, [searchParams, navigate]);

  const { initialLoading, infiniteLoading } =
    useFetchDataInfinite(
      getFunction,
      scrollData,
      searchParams.get('search')
    );

  const getRandomHeight = () => {
    const minHeight =
      searchParams.get('type') === 'recipes' ? 300 : 500; // Minimum height in pixels
    const maxHeight =
      searchParams.get('type') === 'recipes' ? 800 : 900; // Maximum height in pixels
    return (
      Math.floor(
        Math.random() * (maxHeight - minHeight + 1)
      ) + minHeight
    );
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh', // Ensure the container takes the full viewport height
        width: '100%',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: '64px',
          flex: 1,
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
            {searchParams.get('search')?.length
              ? searchParams.get('search')
              : t('forYou')}
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
                disabled={
                  searchParams.get('type') === label
                }
                variant={'outlined'}
                label={t(label)}
                icon={
                  label === 'recipes' ? (
                    <Restaurant fontSize={'large'} />
                  ) : (
                    <Person fontSize={'large'} />
                  )
                }
                onClick={() => {
                  resetScrollData();
                  searchParams.set('type', label); // Update query parameter
                  navigate(`/?${searchParams.toString()}`); // Navigate with updated URL
                }}
              />
            ))}
          </div>
        </div>
        {!scrollData?.users?.length &&
        !scrollData?.recipes?.length ? (
          <div
            style={{
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography
              fontFamily={'Fredoka'}
              fontSize={30}
              fontWeight={600}
            >
              {searchParams.get('type') === 'recipes'
                ? t('noRecipesFound')
                : t('noUsersFound')}
            </Typography>
          </div>
        ) : (
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
              {searchParams.get('type') === 'recipes'
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
        )}
        {infiniteLoading && (
          <div>Loading more recipes...</div>
        )}{' '}
      </div>
      {/* Loading indicator for infinite scroll */}
      <Footer />
    </div>
  );
};

export default Feed;
