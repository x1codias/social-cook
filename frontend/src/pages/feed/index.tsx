import Masonry, {
  ResponsiveMasonry,
} from 'react-responsive-masonry';
import FoodCard from './food-card';
import { Typography } from '@mui/material';
import theme from '../../themes/global.theme';
import Footer from '../../utils/components/footer';
import { useSelector } from 'react-redux';
import { getRecipes } from '../../actions/recipe.actions';
import { Recipe } from '../../utils/types/Recipe';
import useFetchData from '../../utils/hooks/useFetchData';

const Feed: React.FC = (): JSX.Element => {
  const scrollData = useSelector(
    (state: { recipe: { scrollData: any } }) =>
      state.recipe.scrollData
  );

  const { initialLoading, infiniteLoading } = useFetchData(
    getRecipes,
    scrollData
  );

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
