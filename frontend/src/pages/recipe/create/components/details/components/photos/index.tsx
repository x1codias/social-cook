import {
  IconButton,
  ImageList,
  ImageListItem,
  InputLabel,
} from '@mui/material';
import styles from './styles';
import { useTranslation } from 'react-i18next';
import { CloseRounded } from '@mui/icons-material';
import { RecipeDetails } from '../../../../types/types';
import theme from '../../../../../../../themes/global.theme';

type RecipePhotosProps = {
  recipeDetails: RecipeDetails;
  setRecipeDetails: (data: RecipeDetails) => void;
};

const RecipePhotos: React.FC<RecipePhotosProps> = ({
  recipeDetails,
  setRecipeDetails,
}): JSX.Element => {
  const { t } = useTranslation();
  const { ImageBtn } = styles;

  const handlePhotoChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setRecipeDetails({
        ...recipeDetails,
        photos: [...recipeDetails.photos, ...filesArray],
      });
    }
  };

  const handlePhotoRemoval = (index: number) => {
    setRecipeDetails({
      ...recipeDetails,
      photos: recipeDetails.photos.filter(
        (_, i) => i !== index
      ),
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
      }}
    >
      <InputLabel
        sx={{
          fontSize: '16px',
          fontFamily: 'Comfortaa',
          fontWeight: 700,
        }}
      >
        {t('photos') + ' (max: 6)'}:
      </InputLabel>
      <ImageBtn
        variant="contained"
        disabled={recipeDetails.photos.length === 6}
        component="label"
      >
        {t('uploadPhoto')}
        <input
          type="file"
          hidden
          accept="image/*"
          multiple
          onChange={handlePhotoChange}
        />
      </ImageBtn>
      <ImageList
        variant="masonry"
        cols={3}
        gap={8}
        sx={{
          marginTop: '8px',
          width: '100%',
        }}
      >
        {recipeDetails.photos.map((photo, index) => (
          <ImageListItem
            key={index}
            onClick={() => handlePhotoRemoval(index)}
            style={{
              position: 'relative',
            }}
          >
            <img
              src={URL.createObjectURL(photo as File)}
              alt={`Preview ${index + 1}`}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '12px',
                objectFit: 'cover',
              }}
              loading="lazy"
            />
            <IconButton
              onClick={() => handlePhotoRemoval(index)}
              size="small"
              sx={{
                position: 'absolute',
                top: 3,
                right: 3,
                backgroundColor:
                  theme.palette.default.primary,
                color: 'white',
                '&:hover': {
                  backgroundColor:
                    theme.palette.default.dark,
                },
              }}
            >
              <CloseRounded fontSize="small" />
            </IconButton>
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
};

export default RecipePhotos;
