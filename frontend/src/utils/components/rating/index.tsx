import { Rating, Typography } from '@mui/material';
import { StarRounded } from '@mui/icons-material';
import theme from '../../../themes/global.theme';
import { useTranslation } from 'react-i18next';

type RecipeRatingProps = {
  rating: number;
  readOnly?: boolean;
  onRatingChange?: (value: number | null) => void;
};

const RecipeRating: React.FC<RecipeRatingProps> = ({
  rating,
  readOnly,
  onRatingChange,
}): JSX.Element => {
  const { t } = useTranslation();

  return (
    <>
      {!readOnly && (
        <Typography fontSize={18} fontFamily={'Comfortaa'}>
          {t('rateRecipe')}
        </Typography>
      )}
      <Rating
        defaultValue={rating}
        readOnly={readOnly}
        size={'large'}
        onChange={(_e, value) =>
          onRatingChange && onRatingChange(value)
        }
        emptyIcon={
          <StarRounded
            fontSize={'large'}
            sx={{
              color: theme.palette.grey?.[400],
              fontSize: '28px',
            }}
          />
        }
        icon={
          <StarRounded
            fontSize={'large'}
            sx={{
              color: theme.palette.warning,
              fontSize: '28px',
            }}
          />
        }
      />
    </>
  );
};

export default RecipeRating;
