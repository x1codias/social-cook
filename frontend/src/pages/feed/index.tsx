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
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes } from '../../actions/recipe.actions';
import { AppDispatch } from '../../store';
import { Recipe } from '../../utils/types/Recipe';
import { debounce } from 'lodash';

const Feed: React.FC = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const [initialLoading, setInitialLoading] =
    useState(true);
  const [infiniteLoading, setInfiniteLoading] =
    useState(false);

  const scrollData = useSelector(
    (state: { recipe: { scrollData: any } }) =>
      state.recipe.scrollData
  );
  const isFetchingRef = useRef(false); // Reference to track fetch state

  // Fetch feed data function
  const getFeedData = useCallback(async () => {
    if (isFetchingRef.current) return; // Prevent multiple fetches at the same time
    isFetchingRef.current = true; // Mark as fetching
    setInitialLoading(true); // Set loading state for initial fetch

    try {
      const offset = scrollData.offset; // Use the current offset directly
      await dispatch(getRecipes(scrollData.limit, offset)); // Fetch recipes
    } catch (error) {
      console.error('Error fetching recipes:', error);
      // Handle error (optional: show notification)
    } finally {
      setInitialLoading(false); // Reset initial loading state
      isFetchingRef.current = false; // Mark fetching complete
    }
  }, [dispatch, scrollData]); // Include dependencies

  // Effect for fetching data on mount
  useEffect(() => {
    getFeedData(); // Fetch data on initial mount
  }, [getFeedData]); // Only depend on the function

  // Scroll event handling with debounce
  const handleScroll = useCallback(
    debounce(() => {
      const isAtBottom =
        window.innerHeight +
          document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 10; // Allow a small buffer for scrolling

      // Only fetch more if at the bottom, not currently loading, and there are more recipes
      if (
        isAtBottom &&
        !infiniteLoading &&
        scrollData.hasMore
      ) {
        setInfiniteLoading(true); // Set loading state for infinite scroll
        getFeedData(); // Fetch next set of recipes
        setInfiniteLoading(false);
      }
    }, 200),
    [infiniteLoading, scrollData, getFeedData]
  ); // Dependencies for debounce

  // Effect to handle scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll); // Cleanup on unmount
    };
  }, [handleScroll]); // Ensure the listener is set up only once

  const getRandomHeight = () => {
    const minHeight = 300; // Minimum height in pixels
    const maxHeight = 800; // Maximum height in pixels
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
                loading={initialLoading} // Pass loading state to FoodCard
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
