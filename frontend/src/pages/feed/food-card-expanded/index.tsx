import {
  Avatar,
  Dialog,
  Divider,
  Rating,
  Tooltip,
  Typography,
} from '@mui/material';
import theme from '../../../themes/global.theme';
import {
  AccessTimeRounded,
  PeopleRounded,
  StarRounded,
} from '@mui/icons-material';
import { LuChefHat } from 'react-icons/lu';
import DefaultButton from '../../../utils/components/button/button';
import { useNavigate } from 'react-router';
import { Recipe } from '../../../utils/types/Recipe';
import { encodeForCSS } from '../../../utils/functions/encodeUrl';
import { capitalizeFirstLetter } from '../../../utils/functions/capitalizeFirstLetter';
import RecipeRating from '../../../utils/components/rating';

type FoodCardExpandedProps = {
  recipeId: boolean;
  onClose: () => void;
  recipeData: Recipe;
};

const FoodCardExpanded: React.FC<FoodCardExpandedProps> = (
  props
): JSX.Element => {
  const { recipeId, onClose, recipeData } = props;
  const navigate = useNavigate();

  return (
    <Dialog
      open={recipeId}
      sx={{
        '& .MuiPaper-root': {
          maxWidth: '1000px',
          borderRadius: '20px',
        },
      }}
      onClose={() => onClose()}
    >
      <div style={{ minHeight: '400px' }}>
        <div style={{ display: 'flex' }}>
          <div
            style={{
              backgroundImage: `url(${
                recipeData.photos
                  ? encodeForCSS(recipeData.photos[0])
                  : ''
              })`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              minWidth: '500px',
              minHeight: '400px',
            }}
          />
          <div
            style={{
              padding: '8px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
              backgroundColor:
                theme.palette.customBackground.default,
            }}
          >
            <Typography
              style={{
                fontFamily: 'Fredoka',
                fontSize: '28px',
                fontWeight: 600,
                color: theme.palette.default.dark,
                borderBottom: `2px solid ${theme.palette.grey?.[400]}`,
              }}
            >
              {recipeData.title}
            </Typography>
            <Typography
              style={{
                fontFamily: 'Fredoka',
                fontSize: '18px',
                backgroundColor:
                  theme.palette.categories[
                    recipeData.category
                  ],
                padding: '4px 16px',
                borderRadius: '20px',
                textAlign: 'center',
              }}
            >
              {capitalizeFirstLetter(recipeData.category)}
            </Typography>
            {recipeData.avgRating && (
              <RecipeRating
                readOnly
                rating={recipeData.avgRating}
              />
            )}
            <div
              style={{
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
                borderRadius: '30px',
                border: `1px solid ${theme.palette.default.dark}`,
                backgroundColor:
                  theme.palette.customBackground.input,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <AccessTimeRounded fontSize={'large'} />
                <Typography
                  style={{
                    fontFamily: 'Fredoka',
                    fontSize: '16px',
                    padding: '2px 6px',
                    backgroundColor:
                      theme.palette.background?.paper,
                    borderRadius: '20px',
                    border: `1px solid ${theme.palette.default.dark}`,
                  }}
                >
                  {`${recipeData.duration.hours} `}
                  <span>{'H'}</span>
                  {` : ${recipeData.duration.minutes} `}
                  <span>{'M'}</span>
                </Typography>
              </div>
              <Divider
                style={{
                  borderColor: theme.palette.default.dark,
                }}
                orientation={'vertical'}
              />
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <PeopleRounded fontSize={'large'} />
                <Typography
                  style={{
                    fontFamily: 'Fredoka',
                    fontSize: '16px',
                    padding: '2px 6px',
                    backgroundColor:
                      theme.palette.background?.paper,
                    borderRadius: '20px',
                    border: `1px solid ${theme.palette.default.dark}`,
                  }}
                >
                  {'2 Servings'}
                </Typography>
              </div>
              <Divider
                style={{
                  borderColor: theme.palette.default.dark,
                }}
                orientation={'vertical'}
              />
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <LuChefHat fontSize={'22px'} />
                <Typography
                  style={{
                    fontFamily: 'Fredoka',
                    fontSize: '16px',
                    padding: '4px 8px',
                    color: theme.palette.customText.button,
                    backgroundColor:
                      theme.palette.difficulty[
                        recipeData.difficulty
                      ],
                    borderRadius: '20px',
                  }}
                >
                  {capitalizeFirstLetter(
                    recipeData.difficulty
                  )}
                </Typography>
              </div>
            </div>
            <div
              style={{
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '8px',
                flexGrow: 1,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  minWidth: 'fit-content',
                }}
              >
                <Avatar src={recipeData.user.photo}>
                  {recipeData.user.username}
                </Avatar>
                <Tooltip
                  title={recipeData.user.username}
                  placement="bottom"
                >
                  <Typography
                    style={{
                      fontFamily: 'Roboto',
                      fontSize: '16px',
                      fontWeight: 500,
                      color: theme.palette.text?.primary,
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap', // Prevents text from wrapping
                      overflow: 'hidden', // Ensures overflow is clipped
                      maxWidth: '200px',
                    }}
                  >
                    {recipeData.user.username}
                  </Typography>
                </Tooltip>
              </div>
              <Divider
                orientation={'vertical'}
                style={{
                  borderWidth: '2px',
                  borderRadius: '10px',
                  borderColor: theme.palette.default.dark,
                }}
              />
              <Typography
                style={{
                  padding: '4px',
                  fontFamily: 'Comfortaa',
                  fontSize: '14px',
                }}
              >
                {recipeData.description}
              </Typography>
            </div>
            <DefaultButton
              variant={'text'}
              label={'Full Recipe'}
              onClick={() => {
                navigate(`/recipes/${recipeData.id}`);
              }}
            />
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default FoodCardExpanded;
