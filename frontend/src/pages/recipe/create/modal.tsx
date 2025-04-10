import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';
import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
  CHANGE_CREATE_RECIPE_STEP,
  CLOSE_CREATE_RECIPE_MODAL,
} from '../../../actions/types';
import { useTranslation } from 'react-i18next';
import DefaultButton from '../../../utils/components/button/button';
import styles from './styles';
import StepIcon from './components/step-icon';
import DetailsPageModal from './components/details';
import { RecipeDetails } from './types/types';
import { IngredientItem } from '../../../utils/types/Ingredient';
import IngredientsPageModal from './components/ingredients/indext';
import { Preparation } from '../../../utils/types/Preparation';
import PreparationPageModal from './components/preparation';
import { RecipeInput } from '../../../utils/types/Recipe';
import { createRecipe } from '../../../actions/recipe.actions';
import { AppDispatch } from '../../../store';
import useValidateRecipe from '../../../utils/hooks/useValidateRecipe';

const CreateRecipeModal: React.FC = (): JSX.Element => {
  const openCreateRecipe = useSelector(
    (state: { recipe: { openCreateRecipe: boolean } }) =>
      state.recipe.openCreateRecipe
  );
  const createRecipeStep = useSelector(
    (state: { recipe: { createRecipeStep: number } }) =>
      state.recipe.createRecipeStep
  );
  const [recipeDetails, setRecipeDetails] =
    useState<RecipeDetails>({
      title: '',
      category: '',
      duration: {
        hours: 0,
        minutes: 0,
      },
      servings: 0,
      difficulty: '',
      description: '',
      photos: [],
    });
  const [recipeIngredients, setRecipeIngredients] =
    useState<IngredientItem[]>([]);
  const [recipePreparation, setRecipePreparation] =
    useState<Preparation>({
      video: undefined,
      steps: [],
    });
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const { StepConnector } = styles;
  const handleCloseCreateRecipeModal = useCallback(
    () =>
      dispatch({
        type: CLOSE_CREATE_RECIPE_MODAL,
      }),
    [dispatch]
  );

  const steps: string[] = [
    t('details'),
    t('ingredients'),
    t('preparation'),
  ];

  const handleCloseModal = () =>
    dispatch({
      type: CLOSE_CREATE_RECIPE_MODAL,
    });

  const handleChangeRecipeStep = useCallback(
    (step: number) =>
      dispatch({
        type: CHANGE_CREATE_RECIPE_STEP,
        payload: { step },
      }),
    [dispatch]
  );

  const displayModalPage = () => {
    switch (createRecipeStep) {
      case 0:
        return (
          <DetailsPageModal
            recipeDetails={recipeDetails}
            setRecipeDetails={setRecipeDetails}
          />
        );
      case 1:
        return (
          <IngredientsPageModal
            recipeIngredients={recipeIngredients}
            setRecipeIngredients={setRecipeIngredients}
          />
        );
      case 2:
        return (
          <PreparationPageModal
            recipePreparation={recipePreparation}
            setRecipePreparation={setRecipePreparation}
          />
        );
      default:
        return <></>;
    }
  };

  const { canProceed } = useValidateRecipe(
    createRecipeStep,
    recipeDetails,
    recipeIngredients,
    recipePreparation
  );

  const handleSaveRecipe = useCallback(
    async (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      e.preventDefault();

      const recipe: RecipeInput = {
        ...recipeDetails,
        ingredients: [...recipeIngredients],
        preparation: { ...recipePreparation },
      };

      const formData = new FormData();

      formData.append('title', recipe.title);
      formData.append('description', recipe.description);
      formData.append('category', recipe.category);
      formData.append('difficulty', recipe.difficulty);
      formData.append(
        'duration',
        JSON.stringify(recipe.duration) // Convert object to JSON
      );
      formData.append(
        'servings',
        recipe.servings.toString()
      );

      formData.append(
        'ingredients',
        JSON.stringify(recipe.ingredients)
      );

      // Add recipe photos
      recipe.photos.forEach(photo => {
        if (photo instanceof File) {
          formData.append(`photos`, photo);
        } else {
          formData.append(`photos`, photo); // For URLs, if applicable
        }
      });

      // Add preparation steps
      if (recipe.preparation.steps.length) {
        recipe.preparation.steps.forEach(step => {
          formData.append(
            `preparationStepsDescription`,
            step.description
          );
          if (step.photo) {
            formData.append(
              `preparationStepsPhotos`,
              step.photo
            );
          }
        });
      }

      // Add preparation video (if exists)
      if (recipe.preparation.video) {
        formData.append(
          'preparationVideo',
          recipe.preparation.video
        );
      }

      await dispatch(createRecipe(formData));

      setRecipeDetails({
        title: '',
        category: '',
        duration: {
          hours: 0,
          minutes: 0,
        },
        servings: 0,
        difficulty: '',
        description: '',
        photos: [],
      });
      setRecipeIngredients([]);
      setRecipePreparation({
        video: undefined,
        steps: [],
      });
      handleChangeRecipeStep(0);
      handleCloseCreateRecipeModal();
    },
    [
      recipeDetails,
      recipeIngredients,
      recipePreparation,
      dispatch,
      handleCloseCreateRecipeModal,
      handleChangeRecipeStep,
    ]
  );

  return (
    <Dialog
      open={openCreateRecipe}
      onClose={handleCloseModal}
      PaperProps={{
        style: {
          width: '650px', // your custom width
          height: '650px',
          maxWidth: '80vw', // optional max width relative to the viewport
        },
      }}
    >
      <DialogTitle>
        <Stepper
          alternativeLabel
          activeStep={createRecipeStep}
          connector={<StepConnector />}
        >
          {steps.map((step, index) => (
            <Step key={index}>
              <StepLabel StepIconComponent={StepIcon}>
                <Typography fontSize={16}>
                  {step}
                </Typography>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </DialogTitle>
      <DialogContent>{displayModalPage()}</DialogContent>
      <DialogActions sx={{ padding: '8px 24px' }}>
        {createRecipeStep !== 0 && (
          <DefaultButton
            label={t('back')}
            variant={'outlined'}
            onClick={() =>
              handleChangeRecipeStep(createRecipeStep - 1)
            }
          />
        )}
        {createRecipeStep !== 2 && (
          <DefaultButton
            label={t('next')}
            onClick={() =>
              handleChangeRecipeStep(createRecipeStep + 1)
            }
            disabled={!canProceed}
          />
        )}
        {createRecipeStep === 2 && (
          <DefaultButton
            label={t('finish')}
            onClick={e => handleSaveRecipe(e)}
            disabled={!canProceed}
          />
        )}
      </DialogActions>
    </Dialog>
  );
};

export default CreateRecipeModal;
