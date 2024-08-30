import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import theme from '../../../../../themes/global.theme';
import { useState } from 'react';
import { PreparationStep } from '../../../../../utils/types/Preparation';
import ImageInput from '../../../../../utils/components/image-input';
import DefaultButton from '../../../../../utils/components/button/button';
import DefaultInput from '../../../../../utils/components/input/input';

type PreparationStepDialogProps = {
  edit?: boolean;
  step?: PreparationStep;
  newStepIndex: number;
  openPrepModal: boolean;
  setOpenPrepModal: (val: boolean) => void;
  onSaveStep: (step: PreparationStep) => void;
};

const PreparationStepDialog: React.FC<
  PreparationStepDialogProps
> = (props): JSX.Element => {
  const {
    edit,
    step,
    newStepIndex,
    openPrepModal,
    setOpenPrepModal,
    onSaveStep,
  } = props;
  const [stepData, setStepData] = useState<PreparationStep>(
    edit && step
      ? step
      : {
          photo: '',
          description: '',
        }
  );

  const handleStepDataChange = (
    val: string,
    valToChange: 'photo' | 'description'
  ) => {
    const stepDataCopy = { ...stepData };
    stepDataCopy[valToChange] = val;
    setStepData(stepDataCopy);
  };

  return (
    <Dialog
      open={openPrepModal}
      onClose={() => {
        !edit &&
          setStepData({ description: '', photo: '' });
        setOpenPrepModal(false);
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          paddingTop: '4px',
        }}
      >
        <DialogTitle
          style={{
            width: 'fit-content',
            fontFamily: 'Fredoka',
            fontSize: '28px',
            fontWeight: 600,
            color: theme.palette.default.dark,
            borderBottom: `2px solid ${theme.palette.grey?.[400]}`,
            textAlign: 'center',
            alignSelf: 'center',
            padding: 0,
          }}
        >
          {`${newStepIndex}º Step`}
        </DialogTitle>
        <DialogContent
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            paddingBottom: 0,
          }}
        >
          <ImageInput
            onImageChanged={file => {}}
            onDeleteImage={() => {}}
          />
          <DefaultInput
            type={'text'}
            multiline
            placeholder={'Description'}
            height={'100px'}
            minWidth={'450px'}
            value={stepData.description}
            onChange={e =>
              handleStepDataChange(
                e.target.value,
                'description'
              )
            }
          />
        </DialogContent>
        <DialogActions>
          <DefaultButton
            onClick={() => {
              !edit &&
                setStepData({ description: '', photo: '' });
              setOpenPrepModal(false);
            }}
            variant={'outlined'}
            label={'Cancel'}
          />
          <DefaultButton
            onClick={() => {
              onSaveStep(stepData);
              !edit &&
                setStepData({ description: '', photo: '' });
              setOpenPrepModal(false);
            }}
            label={'Save'}
          />
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default PreparationStepDialog;
