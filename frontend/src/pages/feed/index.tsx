import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import Masonry, {
  ResponsiveMasonry,
} from 'react-responsive-masonry';
import FoodCard from './food-card';
import { Typography } from '@mui/material';
import theme from '../../themes/global.theme';
import Footer from '../../utils/components/footer';
import { useDispatch } from 'react-redux';
import { getRecipes } from '../../actions/recipe.actions';
import { AppDispatch } from '../../store';
import { useSelector } from 'react-redux';
import { Recipe } from '../../utils/types/Recipe';

const Feed: React.FC = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const isInitialFetch = useRef(true); // Add ref to track initial mount
  const [loading, setLoading] = useState(false);
  const getRandomHeight = () => {
    const minHeight = 300; // minimum height in pixels
    const maxHeight = 800; // maximum height in pixels
    return (
      Math.floor(
        Math.random() * (maxHeight - minHeight + 1)
      ) + minHeight
    );
  };
  const scrollData = useSelector(
    (state: { recipe: { scrollData: any } }) =>
      state.recipe.scrollData
  );

  const getFeedData = useCallback(async () => {
    setLoading(true);
    await dispatch(getRecipes(10, 0));
  }, [dispatch]);

  useEffect(() => {
    if (isInitialFetch.current) {
      // Only call getFeedData on initial render
      getFeedData();
      isInitialFetch.current = false;
      setLoading(false);
    }
  }, [getFeedData]);

  console.log(scrollData);

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flexGrow: 1,
        paddingTop: '64px',
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
        {'For You'}
      </Typography>
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
          {scrollData.recipes.map(
            (recipe: Recipe, index: number) => (
              <FoodCard
                key={index}
                height={getRandomHeight()}
                recipeData={recipe}
                loading={loading}
              />
            )
          )}
        </Masonry>
      </ResponsiveMasonry>
      <Footer />
    </div>
  );
};

export default Feed;
