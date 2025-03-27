import {
  ArrowForwardRounded,
  StarRounded,
} from '@mui/icons-material';
import {
  Avatar,
  Chip,
  ListItem,
  Rating,
  Typography,
} from '@mui/material';
import theme from '../../../../../../../themes/global.theme';
import { Recipe } from '../../../../../../types/Recipe';
import { useTranslation } from 'react-i18next';

type SearchRecipeItemProps = {
  index: number;
  data: Recipe;
  navigateToRecipe: () => void;
};

const SearchRecipeItem: React.FC<SearchRecipeItemProps> = ({
  index,
  data,
  navigateToRecipe,
}) => {
  const { t } = useTranslation();

  return (
    <ListItem
      key={index}
      onClick={navigateToRecipe}
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
            theme.palette.customBackground.default,
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
          src={data.photos[0]}
        />
        <Chip
          sx={{
            fontFamily: 'Comfortaa',
            fontSize: '16px',
            fontWeight: 500,
            color: theme.palette.text?.primary,
            backgroundColor:
              theme.palette.categories[data.category],
          }}
          label={data.title}
        />
        {data.avgRating ? (
          <Rating
            defaultValue={data.avgRating}
            readOnly
            size={'large'}
            sx={{
              backgroundColor: theme.palette.grey?.[300],
              padding: '4px',
              borderRadius: '20px',
            }}
            emptyIcon={
              <StarRounded
                fontSize={'large'}
                sx={{
                  color: theme.palette.background?.paper,
                }}
              />
            }
            icon={
              <StarRounded
                fontSize={'large'}
                sx={{
                  color: theme.palette.warning,
                }}
              />
            }
          />
        ) : (
          <Typography
            sx={{
              backgroundColor: theme.palette.grey?.[300],
              padding: '6px',
              borderRadius: '20px',
              fontFamily: 'Comfortaa',
              fontSize: '14px',
            }}
          >
            {t('noRatingsYet')}
          </Typography>
        )}
      </div>
      <ArrowForwardRounded
        sx={{ justifySelf: 'flex-end' }}
        fontSize={'large'}
      />
    </ListItem>
  );
};

export default SearchRecipeItem;
