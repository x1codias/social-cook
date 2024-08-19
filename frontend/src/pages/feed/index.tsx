import React, { useCallback, useEffect } from 'react';
import Masonry, {
  ResponsiveMasonry,
} from 'react-responsive-masonry';
import FoodCard from '../../utils/components/food-card';
import { Typography } from '@mui/material';
import theme from '../../themes/global.theme';
import Footer from '../../utils/components/footer';
import { useDispatch } from 'react-redux';
import { getRecipes } from '../../actions/recipe.actions';
import { AppDispatch } from '../../store';
import { useSelector } from 'react-redux';
import { Recipe } from '../../types/Recipe';

const Feed: React.FC = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const getRandomHeight = () => {
    const minHeight = 300; // minimum height in pixels
    const maxHeight = 800; // maximum height in pixels
    return (
      Math.floor(
        Math.random() * (maxHeight - minHeight + 1)
      ) + minHeight
    );
  };
  const heights = [...Array(12)].map(() =>
    getRandomHeight()
  );
  const scrollData = useSelector(
    (state: { recipe: { scrollData: Recipe[] } }) =>
      state.recipe.scrollData
  );

  const getFeedData = useCallback(async () => {
    await dispatch(getRecipes(10, 0));
  }, [dispatch]);

  useEffect(() => {
    getFeedData();
  }, [getFeedData]);

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flexGrow: 1,
        paddingTop: '54px',
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
          {heights.map((height, index) => (
            <FoodCard key={index} height={height} />
          ))}
        </Masonry>
      </ResponsiveMasonry>
      <Footer />
    </div>
  );
};

export default Feed;
