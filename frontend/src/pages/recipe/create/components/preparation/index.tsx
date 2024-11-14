import { useState } from 'react';
import { Preparation } from '../../../../../utils/types/Preparation';
import ChooseMethod from './components/choose';
import PreparationSteps from './components/steps';
import PreparationVideo from './components/video';

type PreparationPageModalProps = {
  recipePreparation: Preparation;
  setRecipePreparation: (preparation: Preparation) => void;
};

const PreparationPageModal: React.FC<
  PreparationPageModalProps
> = (props): JSX.Element => {
  const { recipePreparation, setRecipePreparation } = props;
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

  return containerToShow();
};

export default PreparationPageModal;
