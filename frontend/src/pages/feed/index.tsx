import Masonry, {
  ResponsiveMasonry,
} from 'react-responsive-masonry';
import FoodCard from './food-card';
import { Typography } from '@mui/material';
import theme from '../../themes/global.theme';
import Footer from '../../utils/components/footer';
import { useSelector } from 'react-redux';
import { getRecipesFeed } from '../../actions/recipe.actions';
import useFetchDataInfinite from '../../utils/hooks/useFetchDataInfinite';
import { useTranslation } from 'react-i18next';
import DefaultButton from '../../utils/components/button/button';
import { useCallback, useEffect, useMemo } from 'react';
import {
  getFavoriteRecipes,
  getUsersFeed,
} from '../../actions/user.actions';
import { RecipeState } from '../../reducers/types/recipe.reducer.types';
import { UserState } from '../../reducers/types/user.reducer.types';
import UserCard from './user-card';
import { Person, Restaurant } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import {
  RESET_SCROLL_FAVORITES_DATA,
  RESET_SCROLL_RECIPES_DATA,
  RESET_SCROLL_USERS_DATA,
} from '../../actions/types';

type FeedProps = {
  favorites?: boolean;
};

const Feed: React.FC<FeedProps> = ({
  favorites,
}): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location]
  );

  const recipesScrollData = useSelector(
    (state: { recipe: RecipeState }) =>
      state.recipe.scrollData
  );
  const favoritesScrollData = useSelector(
    (state: { recipe: RecipeState }) =>
      state.recipe.favorites
  );
  const usersScrollData = useSelector(
    (state: { user: UserState }) => state.user.scrollData
  );

  const resetScrollData = useCallback(() => {
    let action: string;
    switch (searchParams.get('type')) {
      case 'users':
        action = RESET_SCROLL_USERS_DATA;
        break;
      case 'recipes':
        action = RESET_SCROLL_RECIPES_DATA;
        break;
      default:
        action = RESET_SCROLL_FAVORITES_DATA;
    }

    dispatch({
      type: action,
    });
  }, [searchParams, dispatch]);

  useEffect(() => {
    resetScrollData();
  }, [searchParams, resetScrollData]);

  const getRandomHeight = useCallback(() => {
    const isRecipeType =
      searchParams.get('type') === 'recipes';
    return (
      Math.floor(
        Math.random() *
          ((isRecipeType ? 800 : 900) -
            (isRecipeType ? 300 : 500) +
            1)
      ) + (isRecipeType ? 300 : 500)
    );
  }, [searchParams]);

  // Fetch data before constructing feedData
  const { initialLoading, infiniteLoading } =
    useFetchDataInfinite(
      searchParams.get('type') === 'recipes'
        ? getRecipesFeed
        : searchParams.get('type') === 'users'
        ? getUsersFeed
        : getFavoriteRecipes,
      searchParams.get('type') === 'recipes'
        ? recipesScrollData
        : searchParams.get('type') === 'users'
        ? usersScrollData
        : favoritesScrollData,
      searchParams.get('search')
    );

  const feedData = useMemo(() => {
    switch (searchParams.get('type')) {
      case 'recipes':
        return {
          scrollData: recipesScrollData,
          cards: recipesScrollData.recipes.map(
            (recipe, index) => (
              <FoodCard
                key={index}
                height={getRandomHeight()}
                recipeData={recipe}
                loading={initialLoading}
              />
            )
          ),
          empty: recipesScrollData.recipes.length === 0,
        };
      case 'users':
        return {
          scrollData: usersScrollData,
          cards: usersScrollData.users.map(
            (user, index) => (
              <UserCard
                key={index}
                userData={user}
                loading={initialLoading}
              />
            )
          ),
          empty: usersScrollData.users.length === 0,
        };
      default:
        return {
          scrollData: favoritesScrollData,
          cards: favoritesScrollData.recipes.map(
            (recipe, index) => (
              <FoodCard
                key={index}
                height={getRandomHeight()}
                recipeData={recipe}
                loading={initialLoading}
              />
            )
          ),
          empty: favoritesScrollData.recipes.length === 0,
        };
    }
  }, [
    searchParams,
    recipesScrollData,
    usersScrollData,
    favoritesScrollData,
    initialLoading,
    getRandomHeight,
  ]);

  const feedTitle = () => {
    if (searchParams.get('search'))
      return searchParams.get('search');
    return favorites ? t('favoriteFeast') : t('forYou');
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
            {feedTitle()}
          </Typography>
          {!favorites && (
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
                      color:
                        theme.palette.customText.button,
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
                    navigate(
                      `/?${searchParams.toString()}`
                    ); // Navigate with updated URL
                  }}
                />
              ))}
            </div>
          )}
        </div>
        {feedData.empty ? (
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
              {feedData.cards}
            </Masonry>
          </ResponsiveMasonry>
        )}
        {infiniteLoading && (
          <div>Loading more recipes...</div>
        )}
      </div>
      {/* Loading indicator for infinite scroll */}
      <Footer />
    </div>
  );
};

export default Feed;
