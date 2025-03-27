import { RecipeDetails } from '../../types/types';
import CoreRecipeInfo from './components/core-info';
import RecipePhotos from './components/photos';

type DetailsPageModalProps = {
  recipeDetails: RecipeDetails;
  setRecipeDetails: (details: RecipeDetails) => void;
};

const DetailsPageModal: React.FC<DetailsPageModalProps> = (
  props
): JSX.Element => {
  const { recipeDetails, setRecipeDetails } = props;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      <CoreRecipeInfo
        recipeDetails={recipeDetails}
        setRecipeDetails={setRecipeDetails}
      />
      <RecipePhotos
        recipeDetails={recipeDetails}
        setRecipeDetails={setRecipeDetails}
      />
    </div>
  );
};

export default DetailsPageModal;
