import { Box } from '@mui/system';
import { encodeForCSS } from '../../../utils/functions/encodeUrl';
import theme from '../../../themes/global.theme';
import { Recipe } from '../../../utils/types/Recipe';

type ImageContainerProps = {
  recipe: Recipe;
};

const ImageContainer: React.FC<ImageContainerProps> = ({
  recipe,
}): JSX.Element => {
  const generateStylesForPhotos = (
    photos: string[],
    containerHeight: number
  ) => {
    const randomHeight = () =>
      Math.floor(Math.random() * (containerHeight / 2)) +
      containerHeight / 4;
    const styles = [];

    switch (photos.length) {
      case 1:
        styles.push({
          gridRow: `span 2`,
          gridColumn: `span 2`,
          height: `${containerHeight}px`,
        });
        break;
      case 2:
        const firstHeight = randomHeight();
        styles.push({ height: `${firstHeight}px` });
        styles.push({
          height: `${containerHeight - firstHeight}px`,
        });
        break;
      case 3:
        const randomThird = randomHeight();
        styles.push({ height: `${randomThird}px` });
        styles.push({
          height: `${containerHeight - randomThird}px`,
        });
        styles.push({
          gridRow: `span 2`,
          gridColumn: `span 2`,
          height: `${containerHeight}px`,
        });
        break;
      case 4:
        for (let i = 0; i < 4; i++) {
          styles.push({ height: `${randomHeight()}px` });
        }
        break;
      case 5:
        for (let i = 0; i < 4; i++) {
          styles.push({ height: `${randomHeight()}px` });
        }
        styles.push({
          gridRow: `span 2`,
          gridColumn: `span 2`,
          height: `${containerHeight}px`,
        });
        break;
      case 6:
        for (let i = 0; i < 6; i++) {
          styles.push({ height: `${randomHeight()}px` });
        }
        break;
      default:
        console.warn('Unsupported number of photos');
    }

    return styles;
  };

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns:
          recipe.photos.length <= 2
            ? '1fr 1fr'
            : '1fr 1fr 1fr',
        gridAutoRows: 'auto',
        gap: '8px',
        maxHeight: `900px`,
        minWidth: '600px',
        overflow: 'hidden',
        borderRadius: '20px',
        padding: '8px',
        backgroundColor: theme.palette.default.light,
      }}
    >
      {recipe.photos.map((photo, index) => (
        <Box
          key={index}
          sx={{
            borderRadius: '20px',
            backgroundImage: `url(${encodeForCSS(photo)})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            ...generateStylesForPhotos(recipe.photos, 884)[
              index
            ],
          }}
        />
      ))}
    </Box>
  );
};

export default ImageContainer;
