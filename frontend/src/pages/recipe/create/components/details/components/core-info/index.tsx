import React from 'react';
import DefaultInput from '../../../../../../../utils/components/input/input';
import { InputLabel, Typography } from '@mui/material';
import DefaultSelect from '../../../../../../../utils/components/select';
import {
  Difficulties,
  RecipeCategories,
} from '../../../../../../../utils/types/Recipe';
import { useTranslation } from 'react-i18next';
import { RecipeDetails } from '../../../../types/types';

type CoreRecipeInfoProps = {
  recipeDetails: RecipeDetails;
  setRecipeDetails: (data: RecipeDetails) => void;
};

const CoreRecipeInfo: React.FC<CoreRecipeInfoProps> = ({
  recipeDetails,
  setRecipeDetails,
}): JSX.Element => {
  const { t } = useTranslation();

  return (
    <>
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
    </>
  );
};

export default CoreRecipeInfo;
