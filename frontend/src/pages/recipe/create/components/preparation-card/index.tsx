import { Delete, Edit } from '@mui/icons-material';
import {
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import theme from '../../../../../themes/global.theme';
import { PreparationStep } from '../../../../../utils/types/Preparation';
import PreparationStepDialog from '../preparation-step-dialog';
import { useState } from 'react';

type PreparationCardProps = {
  stepIndex: number;
  step: PreparationStep;
  onDelete: () => void;
  onEditStep: (step: PreparationStep) => void;
};

const PreparationCard: React.FC<PreparationCardProps> = (
  props
): JSX.Element => {
  const { stepIndex, step, onDelete, onEditStep } = props;
  const [openStepModal, setOpenStepModal] = useState(false);

  return (
    <>
      <div
        key={stepIndex}
        style={{
          flexGrow: 1,
          width: '100%',
          height: 'fit-content',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          backgroundColor: theme.palette.background?.paper,
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '8px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              backgroundColor:
                theme.palette.default.primary,
              borderRadius: '20px',
              padding: '4px 6px',
              paddingRight: '10px',
              color: theme.palette.customText.button,
              flexWrap: 'wrap', // Allow children to wrap if needed
            }}
          >
            <Typography
              style={{
                fontFamily: 'Fredoka',
                fontSize: '18px',
                backgroundColor: theme.palette.default.dark,
                lineHeight: 1,
                textAlign: 'center',
                padding: '4px 10px',
                borderRadius: '20px',
              }}
            >
              {stepIndex + 1}
            </Typography>
            <Typography
              style={{
                fontFamily: 'Fredoka',
                fontSize: '18px',
                lineHeight: 1,
                whiteSpace: 'normal', // Ensure text wraps normally
                overflowWrap: 'break-word', // Ensures long words break and wrap
              }}
            >
              {'Step'}
            </Typography>
          </div>
          <div>
            <Tooltip
              title={
                <Typography fontSize={12}>
                  {'Edit'}
                </Typography>
              }
              placement={'top'}
            >
              <IconButton>
                <Edit
                  style={{
                    fill: theme.palette.default.dark,
                  }}
                  fontSize={'large'}
                  onClick={() => setOpenStepModal(true)}
                />
              </IconButton>
            </Tooltip>
            <Tooltip
              title={
                <Typography fontSize={12}>
                  {'Delete'}
                </Typography>
              }
              placement={'top'}
            >
              <IconButton onClick={onDelete}>
                <Delete
                  style={{
                    fill: theme.palette.error?.main,
                  }}
                  fontSize={'large'}
                />
              </IconButton>
            </Tooltip>
          </div>
        </div>
        <div
          style={{
            backgroundColor:
              theme.palette.customBackground.input,
            padding: '8px',
            borderRadius: '10px',
            width: '100%',
            height: '100%',
            overflow: 'hidden', // Ensures no overflow occurs visually
            wordWrap: 'break-word', // Adds support for breaking long words
          }}
        >
          <Typography
            style={{
              fontFamily: 'Roboto',
              fontSize: '14px',
              lineHeight: '1.5',
              width: '100%',
              whiteSpace: 'normal', // Ensures text wraps normally
              overflowWrap: 'break-word', // Ensures long words break and wrap
            }}
          >
            {step.description}
          </Typography>
          {/* Uncomment the following block if you want to show the image */}
          {/* {step.photo && step.photo.trim().length > 0 && (
          <div
            style={{
              float: 'right',
              width: '190px',
              height: '160px',
              backgroundImage: `url(${foodImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              margin: '0 0 6px 6px', // Space between image and text
            }}
          />
        )} */}
        </div>
      </div>
      <PreparationStepDialog
        edit
        step={step}
        newStepIndex={stepIndex + 1}
        openPrepModal={openStepModal}
        setOpenPrepModal={setOpenStepModal}
        onSaveStep={step => onEditStep(step)}
      />
    </>
  );
};

export default PreparationCard;
