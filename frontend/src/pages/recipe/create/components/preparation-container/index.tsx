import { Typography } from '@mui/material';
import theme from '../../../../../themes/global.theme';
import { Add } from '@mui/icons-material';
import { useState } from 'react';
import {
  Preparation,
  PreparationStep,
} from '../../../../../utils/types/Preparation';
import PreparationStepDialog from '../preparation-step-dialog';
import Masonry, {
  ResponsiveMasonry,
} from 'react-responsive-masonry';
import PreparationCard from '../preparation-card';
import DefaultButton from '../../../../../utils/components/button/button';

type PreparationContainerProps = {
  preparationData: Preparation;
  setPreparationData: (val: Preparation) => void;
};

const PreparationContainer: React.FC<
  PreparationContainerProps
> = (props): JSX.Element => {
  const { preparationData, setPreparationData } = props;
  const [openPrepModal, setOpenPrepModal] = useState(false);

  const handleAddPreparationStep = (
    step: PreparationStep
  ) => {
    let preparationDataCopy = { ...preparationData };
    preparationDataCopy = {
      ...preparationDataCopy,
      steps: preparationDataCopy.steps
        ? [...preparationDataCopy.steps, step]
        : [step],
    };
    setPreparationData(preparationDataCopy);
  };

  const handleEditPreparationStep = (
    step: PreparationStep,
    index: number
  ) => {
    const preparationDataCopy = { ...preparationData };

    preparationDataCopy.steps[index] = step;

    setPreparationData(preparationDataCopy);
  };

  const handleDeleteStep = (stepIndex: number) => {
    const preparationDataCopy = { ...preparationData };
    preparationDataCopy.steps =
      preparationDataCopy.steps.filter(
        (_step, index) => index !== stepIndex
      );
    setPreparationData(preparationDataCopy);
  };

  return (
    <>
      <div
        style={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: '20px',
          borderRadius: '8px',
          backgroundColor: theme.palette.default.light,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          gap: '16px',
        }}
      >
        <Typography
          style={{
            width: 'fit-content',
            fontFamily: 'Fredoka',
            fontSize: '28px',
            fontWeight: 600,
            color: theme.palette.default.dark,
            borderBottom: `2px solid ${theme.palette.grey?.[400]}`,
          }}
        >
          {'Preparation'}
        </Typography>
        {preparationData.steps.length > 0 && (
          <ResponsiveMasonry
            style={{
              width: '100%',
            }}
            columnsCountBreakPoints={{
              350: 1, // Single column on very small screens
              1380: 2, // Two columns on small screens
              1810: 3, // Three columns on medium screens
              2105: 4,
            }}
          >
            <Masonry gutter="14px">
              {preparationData.steps.map((step, index) => (
                <PreparationCard
                  key={index}
                  stepIndex={index}
                  step={step}
                  onDelete={() => handleDeleteStep(index)}
                  onEditStep={(step: PreparationStep) =>
                    handleEditPreparationStep(step, index)
                  }
                />
              ))}
            </Masonry>
          </ResponsiveMasonry>
        )}
        <DefaultButton
          variant={'contained'}
          onClick={() => setOpenPrepModal(true)}
          icon={<Add fontSize={'large'} />}
          label={'Add Step'}
        />
      </div>
      <PreparationStepDialog
        newStepIndex={preparationData.steps.length + 1}
        openPrepModal={openPrepModal}
        setOpenPrepModal={setOpenPrepModal}
        onSaveStep={step => handleAddPreparationStep(step)}
      />
    </>
  );
};

export default PreparationContainer;
