import { useCallback, useEffect, useState } from 'react';
import { Preparation } from '../../../../../utils/types/Preparation';
import ChooseMethod from './components/choose';
import PreparationSteps from './components/steps';
import PreparationVideo from './components/video';

type PreparationPageModalProps = {
  recipePreparation: Preparation;
  setRecipePreparation: (preparation: Preparation) => void;
  setCanProceed: (val: boolean) => void;
};

const PreparationPageModal: React.FC<
  PreparationPageModalProps
> = (props): JSX.Element => {
  const {
    recipePreparation,
    setRecipePreparation,
    setCanProceed,
  } = props;
  const [option, setOption] = useState<
    'none' | 'video' | 'steps'
  >('none');

  const containerToShow = () => {
    switch (option) {
      case 'none':
        return (
          <ChooseMethod
            setOption={option => {
              setRecipePreparation({
                video: undefined,
                steps: [],
              });
              setOption(option);
            }}
          />
        );
      case 'steps':
        return (
          <PreparationSteps
            steps={recipePreparation.steps}
            setRecipePreparation={setRecipePreparation}
            setVideoOption={() => {
              setRecipePreparation({
                video: undefined,
                steps: [],
              });
              setOption('video');
            }}
          />
        );
      case 'video':
        return (
          <PreparationVideo
            video={recipePreparation.video as File}
            setRecipePreparation={setRecipePreparation}
            setStepByStepOption={() => {
              setRecipePreparation({
                video: undefined,
                steps: [],
              });
              setOption('steps');
            }}
          />
        );
      default:
        return <></>;
    }
  };

  const validateFields = useCallback(() => {
    const hasVideo = !!recipePreparation.video;

    const hasValidSteps =
      recipePreparation.steps.length > 0 &&
      recipePreparation.steps.some(
        step => step.description.length > 0
      );

    return hasVideo || hasValidSteps;
  }, [recipePreparation]);

  useEffect(() => {
    setCanProceed(validateFields());
  }, [validateFields, setCanProceed]);

  return containerToShow();
};

export default PreparationPageModal;
