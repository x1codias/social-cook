import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Avatar,
} from '@mui/material';
import { Preparation } from '../../../utils/types/Preparation';
import theme from '../../../themes/global.theme';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/system';

type RecipePreparationProps = { prepData: Preparation };

const RecipePreparation: React.FC<
  RecipePreparationProps
> = ({ prepData }): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div
      style={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        padding: '12px',
        gap: '24px',
        backgroundColor:
          theme.palette.customBackground.input,
        borderRadius: '20px',
      }}
    >
      <Typography
        fontSize={46}
        fontFamily={'Lobster'}
        color={theme.palette.customText.disabled}
        fontStyle={'italic'}
      >
        {t('preparation')}
      </Typography>

      {prepData.prepVideo ? (
        <iframe
          width={'100%'}
          height={'100%'}
          src={`https://www.youtube.com/embed/${
            prepData.prepVideo.split('=')[1]
          }?rel=0`}
          allowFullScreen
          style={{
            borderRadius: '20px',
            outline: 'none',
            border: 'none',
          }}
        />
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          gap={5}
          width="100%"
          sx={{
            overflowY: 'auto',
            padding: '12px',
          }}
        >
          {prepData.steps.map((step, index) => (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start', // Start right, then alternate
                gap: '16px',
                width: '100%',
              }}
            >
              {/* Step Indicator */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor:
                    theme.palette.background?.paper,
                  padding: '6px',
                  borderRadius: '30px',
                  width: 'fit-content',
                }}
              >
                <Avatar
                  sx={{
                    backgroundColor:
                      theme.palette.default.primary,
                    borderRadius: '50%',
                    fontSize: '20px',
                    fontFamily: 'Comfortaa',
                    width: '30px',
                    height: '30px',
                  }}
                >
                  {index + 1}
                </Avatar>
                <Typography
                  fontSize={20}
                  fontFamily={'Comfortaa'}
                  fontWeight={700}
                >
                  {' ' + t('step')}
                </Typography>
              </div>

              {/* Step Card */}
              <Card
                style={{
                  backgroundColor: '#fff',
                  borderRadius: '15px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '16px',
                  width: '100%',
                  alignSelf: 'flex-start', // Start right, then alternate
                }}
              >
                <CardContent>
                  <Typography
                    fontSize={18}
                    fontFamily={'Comfortaa'}
                    fontWeight={700}
                  >
                    {step.description}
                  </Typography>
                </CardContent>
              </Card>
            </div>
          ))}
        </Box>
      )}
    </div>
  );
};

export default RecipePreparation;
