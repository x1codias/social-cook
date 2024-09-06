import {
  Avatar,
  Dialog,
  Divider,
  Typography,
} from '@mui/material';
import foodImage from '../../../assets/e77ef6d4207c6da257384b67b10efc67.jpeg';
import theme from '../../../themes/global.theme';
import {
  AccessTimeRounded,
  PeopleRounded,
} from '@mui/icons-material';
import { LuChefHat } from 'react-icons/lu';
import DefaultButton from '../../../utils/components/button/button';

type FoodCardExpandedProps = {
  recipeId: boolean;
  onClose: () => void;
};

const FoodCardExpanded: React.FC<FoodCardExpandedProps> = (
  props
): JSX.Element => {
  const { recipeId, onClose } = props;

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
              backgroundImage: `url(${foodImage})`,
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
              {'Cesar Salad'}
            </Typography>
            <Typography
              style={{
                fontFamily: 'Fredoka',
                fontSize: '18px',
                backgroundColor: 'lightgreen',
                padding: '4px 16px',
                borderRadius: '20px',
                textAlign: 'center',
              }}
            >
              {'Salad'}
            </Typography>
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
                  {'1 '}
                  <span>{'H'}</span>
                  {' : 20 '}
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
                      theme.palette.difficulty.easy,
                    borderRadius: '20px',
                  }}
                >
                  {'Easy'}
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
                <Avatar>{'J'}</Avatar>
                <Typography
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: '16px',
                    fontWeight: 500,
                    color: theme.palette.text?.primary,
                  }}
                >
                  {'Jane Doe'}
                </Typography>
              </div>
              <Divider
                orientation={'vertical'}
                style={{
                  borderWidth: '2px',
                  borderRadius: '10px',
                }}
              />
              <Typography
                style={{
                  padding: '4px',
                  fontFamily: 'Comfortaa',
                  fontSize: '14px',
                }}
              >
                {
                  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged"
                }
              </Typography>
            </div>
            <DefaultButton
              variant={'text'}
              label={'Full Recipe'}
            />
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default FoodCardExpanded;
