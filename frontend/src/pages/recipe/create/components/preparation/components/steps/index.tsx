import {
  Avatar,
  IconButton,
  ImageList,
  Typography,
} from '@mui/material';
import theme from '../../../../../../../themes/global.theme';
import {
  Preparation,
  PreparationStep,
} from '../../../../../../../utils/types/Preparation';
import { useTranslation } from 'react-i18next';
import DefaultButton from '../../../../../../../utils/components/button/button';
import {
  AddRounded,
  CloseRounded,
  DeleteRounded,
  InsertPhotoRounded,
  VideoCameraBackRounded,
} from '@mui/icons-material';
import DefaultInput from '../../../../../../../utils/components/input/input';
import styles from './styles';

type PreparationStepsProps = {
  steps: PreparationStep[];
  setRecipePreparation: (preparation: Preparation) => void;
  setVideoOption: () => void;
};

const PreparationSteps: React.FC<PreparationStepsProps> = (
  props
): JSX.Element => {
  const { steps, setRecipePreparation, setVideoOption } =
    props;
  const { t } = useTranslation();
  const { ImgBtn } = styles;

  const handleAddStep = () => {
    setRecipePreparation({
      steps: [
        ...steps,
        { description: '', photo: undefined },
      ],
    });
  };

  const handleInputChange = (
    index: number,
    field: string,
    value: string | File | undefined
  ) => {
    const updatedSteps = [...steps];
    updatedSteps[index][field] = value;
    setRecipePreparation({ steps: updatedSteps });
  };

  const handleRemoveStep = (index: number) => {
    const updatedSteps = steps.filter(
      (_, i) => i !== index
    );
    setRecipePreparation({ steps: updatedSteps });
  };

  const handlePhotoRemoval = (index: number) => {
    setRecipePreparation({
      steps: steps.map((step, i) =>
        i === index ? { ...step, photo: undefined } : step
      ),
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
      }}
    >
      <div
        style={{
          backgroundColor:
            theme.palette.customBackground.default,
          padding: '8px',
          borderRadius: '10px',
          width: '100%',
          maxHeight: '395px',
          overflow: 'auto',
        }}
      >
        {steps.length ? (
          <ImageList cols={2} gap={12} variant={'woven'}>
            {steps.map((step, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: '6px',
                  backgroundColor:
                    theme.palette.default.light,
                  padding: '8px',
                  borderRadius: '10px',
                }}
              >
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      backgroundColor:
                        theme.palette.background?.paper,
                      padding: '6px',
                      borderRadius: '30px',
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
                  <IconButton
                    onClick={() => handleRemoveStep(index)}
                  >
                    <DeleteRounded
                      sx={{
                        color:
                          theme.palette.customError.main,
                        fontSize: '24px',
                      }}
                    />
                  </IconButton>
                </div>
                {step.photo ? (
                  <div
                    key={index}
                    style={{
                      position: 'relative',
                    }}
                  >
                    <img
                      src={URL.createObjectURL(
                        step.photo as File
                      )}
                      alt={`Preview ${index + 1}`}
                      style={{
                        width: '100%',
                        height: 'auto',
                        borderRadius: '12px',
                        objectFit: 'cover',
                      }}
                      loading="lazy"
                    />
                    <IconButton
                      onClick={() =>
                        handlePhotoRemoval(index)
                      }
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 3,
                        right: 3,
                        backgroundColor:
                          theme.palette.default.primary,
                        color: 'white',
                        '&:hover': {
                          backgroundColor:
                            theme.palette.default.dark,
                        },
                      }}
                    >
                      <CloseRounded fontSize="small" />
                    </IconButton>
                  </div>
                ) : (
                  <ImgBtn
                    variant="contained"
                    component="label"
                  >
                    <Typography
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '16px',
                      }}
                    >
                      <InsertPhotoRounded
                        fontSize={'large'}
                      />
                      {t('uploadPhoto')}
                    </Typography>
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      multiple
                      onChange={e =>
                        handleInputChange(
                          index,
                          'photo',
                          e.target.files
                            ? e.target.files[0]
                            : undefined
                        )
                      }
                    />
                  </ImgBtn>
                )}
                <DefaultInput
                  type={'text'}
                  value={step.description}
                  placeholder={t('stepDescription')}
                  multiline
                  inputStyle={{
                    flexGrow: 1,
                  }}
                  height={'140px'}
                  onChange={e =>
                    handleInputChange(
                      index,
                      'description',
                      e.target.value
                    )
                  }
                />
              </div>
            ))}
          </ImageList>
        ) : (
          <Typography
            sx={{
              fontSize: '16px',
              fontFamily: 'Comfortaa',
              fontWeight: 700,
              textAlign: 'center',
              color: theme.palette.customText.secondary,
            }}
          >
            {t('noStepsAdded')}
          </Typography>
        )}
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <DefaultButton
          onClick={() => setVideoOption()}
          variant={'outlined'}
          label={
            <Typography
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '16px',
              }}
            >
              <VideoCameraBackRounded fontSize={'large'} />
              {t('addVideo')}
            </Typography>
          }
        />
        <DefaultButton
          onClick={handleAddStep}
          label={
            <Typography
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '16px',
              }}
            >
              <AddRounded fontSize={'large'} />
              {t('addStep')}
            </Typography>
          }
        />
      </div>
    </div>
  );
};

export default PreparationSteps;
