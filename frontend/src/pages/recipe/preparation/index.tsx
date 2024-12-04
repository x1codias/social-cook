import { Preparation } from '../../../utils/types/Preparation';
import PrepStepContainer from './components/prep-step-container';

type RecipePreparationProps = { prepData: Preparation };

const RecipePreparation: React.FC<
  RecipePreparationProps
> = ({ prepData }): JSX.Element => {
  return (
    <div
      style={{
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        padding: '24px',
      }}
    >
      {prepData.prepVideo ? (
        <iframe
          width={'100%'}
          height={'100%'}
          src={`https://www.youtube.com/embed/${
            prepData.prepVideo.split('=')[1]
          }`}
          allowFullScreen
          style={{
            borderRadius: '20px',
            outline: 'none',
            border: 'none',
          }}
        />
      ) : (
        <PrepStepContainer steps={prepData.steps} />
      )}
    </div>
  );
};

export default RecipePreparation;
