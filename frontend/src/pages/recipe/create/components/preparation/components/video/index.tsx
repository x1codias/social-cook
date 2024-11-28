import {
  FormatListBulletedRounded,
  VideoCallRounded,
  VideoCameraBackRounded,
} from '@mui/icons-material';
import theme from '../../../../../../../themes/global.theme';
import { Preparation } from '../../../../../../../utils/types/Preparation';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDropzone } from 'react-dropzone';
import styles from './styles';
import { useCallback } from 'react';
import DefaultButton from '../../../../../../../utils/components/button/button';

type PreparationVideoProps = {
  video: File;
  setRecipePreparation: (preparation: Preparation) => void;
  setStepByStepOption: () => void;
};

const PreparationVideo: React.FC<PreparationVideoProps> = (
  props
): JSX.Element => {
  const {
    video,
    setRecipePreparation,
    setStepByStepOption,
  } = props;
  const { t } = useTranslation();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        setRecipePreparation({ steps: [], video: file });
      }
    },
    [setRecipePreparation]
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'video/mp4': ['.mp4'],
      'video/x-msvideo': ['.avi'],
      'video/quicktime': ['.mov'],
    },
    onDrop,
    multiple: false,
  });

  const { DropzoneContainer, VideoBtn } = styles;

  const replaceVideo = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setRecipePreparation({
        steps: [],
        video: file,
      });
    }
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
      }}
    >
      {!video ? (
        <div
          style={{
            backgroundColor:
              theme.palette.customBackground.default,
            padding: '8px',
            borderRadius: '10px',
            flexGrow: 1,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <DropzoneContainer {...getRootProps()}>
            <input {...getInputProps()} />
            <VideoCallRounded
              sx={{
                fontSize: '76px',
                color: theme.palette.customText.secondary,
              }}
            />
            <Typography
              style={{
                fontSize: '18px',
                fontWeight: 700,
                fontFamily: 'Comfortaa',
                color: theme.palette.customText.secondary,
              }}
            >
              {t('addVideoByDragNDrop')}
            </Typography>
            <Typography
              style={{
                fontSize: '18px',
                fontWeight: 700,
                fontFamily: 'Comfortaa',
                color: theme.palette.customText.secondary,
              }}
            >
              {t('or')}
            </Typography>
            <Typography
              style={{
                fontSize: '18px',
                fontWeight: 700,
                fontFamily: 'Comfortaa',
                color: theme.palette.customText.secondary,
              }}
            >
              {t('byClicking')}
            </Typography>
          </DropzoneContainer>
        </div>
      ) : (
        <video
          src={URL.createObjectURL(video)}
          controls
          width={'100%'}
          style={{
            borderRadius: '10px',
            outline: 'none',
            border: 'none',
          }}
        />
      )}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
        }}
      >
        <DefaultButton
          onClick={() => setStepByStepOption()}
          icon={
            <FormatListBulletedRounded fontSize={'large'} />
          }
          label={t('stepByStep')}
          variant={'outlined'}
        />
        {video && (
          <VideoBtn onClick={() => {}} component={'label'}>
            <Typography
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '16px',
              }}
            >
              <VideoCameraBackRounded fontSize={'large'} />
              {t('replaceVideo')}
            </Typography>
            <input
              type="file"
              hidden
              accept="video/*"
              multiple
              onChange={replaceVideo}
            />
          </VideoBtn>
        )}
      </div>
    </div>
  );
};

export default PreparationVideo;
