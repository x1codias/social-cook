import { useTranslation } from 'react-i18next';
import DefaultInput from '../../../../../utils/components/input/input';
import { RecipeDetails } from '../../types/types';
import DefaultSelect from '../../../../../utils/components/select';
import {
  Difficulties,
  RecipeCategories,
} from '../../../../../utils/types/Recipe';
import {
  IconButton,
  ImageList,
  ImageListItem,
  InputLabel,
  Typography,
} from '@mui/material';
import { CloseRounded } from '@mui/icons-material';
import theme from '../../../../../themes/global.theme';
import styles from './styles';

type DetailsPageModalProps = {
  recipeDetails: RecipeDetails;
  setRecipeDetails: (details: RecipeDetails) => void;
};

const DetailsPageModal: React.FC<DetailsPageModalProps> = (
  props
): JSX.Element => {
  const { recipeDetails, setRecipeDetails } = props;
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
        gap: '16px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '16px',
          width: '100%',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '12px',
          }}
        >
          <DefaultInput
            type={'text'}
            placeholder={t('title')}
            value={recipeDetails.title}
            onChange={e =>
              setRecipeDetails({
                ...recipeDetails,
                title: e.target.value,
              })
            }
            label={t('title')}
            inputStyle={{
              '&.MuiTextField-root': {
                flexGrow: 1,
              },
            }}
          />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <DefaultInput
              type={'number'}
              placeholder={t('hours')}
              value={recipeDetails.duration.hours}
              onChange={e =>
                setRecipeDetails({
                  ...recipeDetails,
                  duration: {
                    ...recipeDetails.duration,
                    hours: parseInt(e.target.value),
                  },
                })
              }
              label={t('Duration')}
              min={0}
              maxWidth={'80px'}
              minWidth={'80px'}
            />
            <Typography
              fontSize={16}
              fontFamily={'Comfortaa'}
            >
              {'h'}
            </Typography>
            <DefaultInput
              type={'number'}
              placeholder={t('minutes')}
              value={recipeDetails.duration.minutes}
              onChange={e =>
                setRecipeDetails({
                  ...recipeDetails,
                  duration: {
                    ...recipeDetails.duration,
                    minutes: parseInt(e.target.value),
                  },
                })
              }
              maxWidth={'100px'}
              minWidth={'100px'}
              min={0}
              max={59}
            />
            <Typography
              fontSize={16}
              fontFamily={'Comfortaa'}
            >
              {'m'}
            </Typography>
          </div>
          <DefaultSelect
            options={Object.values(Difficulties)}
            value={recipeDetails.difficulty}
            placeholder={t('selectDifficulty')}
            label={t('difficulty')}
            onChange={val =>
              setRecipeDetails({
                ...recipeDetails,
                difficulty: val.toString(),
              })
            }
          />
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '16px',
            flexGrow: 1,
          }}
        >
          <DefaultInput
            type={'number'}
            placeholder={t('servings')}
            value={recipeDetails.servings}
            onChange={e =>
              setRecipeDetails({
                ...recipeDetails,
                servings: parseInt(e.target.value),
              })
            }
            label={t('servings')}
            maxWidth={'110px'}
            minWidth={'110px'}
            min={0}
          />
          <DefaultSelect
            options={Object.values(RecipeCategories)}
            value={recipeDetails.category}
            placeholder={t('selectCategory')}
            label={t('category')}
            onChange={val =>
              setRecipeDetails({
                ...recipeDetails,
                category: val.toString(),
              })
            }
          />
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '4px',
        }}
      >
        <InputLabel
          sx={{
            fontSize: '16px',
            fontFamily: 'Comfortaa',
            fontWeight: 700,
          }}
        >
          {t('description')}:
        </InputLabel>
        <DefaultInput
          type={'text'}
          placeholder={t('description')}
          value={recipeDetails.description}
          onChange={e =>
            setRecipeDetails({
              ...recipeDetails,
              description: e.target.value,
            })
          }
          multiline
          height={'100%'}
          inputStyle={{
            '&.MuiTextField-root': {
              width: '100%',
              height: '100px',
            },
          }}
        />
      </div>
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
    </div>
  );
};

export default DetailsPageModal;
