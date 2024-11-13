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
import React, { useState } from 'react';
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
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { StepConnector } = styles;

  const steps: string[] = [
    t('details'),
    t('ingredients'),
    t('preparation'),
  ];

  const handleCloseModal = () =>
    dispatch({
      type: CLOSE_CREATE_RECIPE_MODAL,
    });

  const handleChangeRecipeStep = (step: number) =>
    dispatch({
      type: CHANGE_CREATE_RECIPE_STEP,
      payload: { step },
    });

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
        return <></>;
      default:
        return <></>;
    }
  };

  return (
    <Dialog
      open={openCreateRecipe}
      onClose={handleCloseModal}
      PaperProps={{
        style: {
          width: '650px', // your custom width
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
          />
        )}
        {createRecipeStep === 2 && (
          <DefaultButton
            label={t('finish')}
            onClick={() => ({})}
          />
        )}
      </DialogActions>
    </Dialog>
  );
};

export default CreateRecipeModal;
