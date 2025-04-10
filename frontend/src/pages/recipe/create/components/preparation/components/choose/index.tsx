import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import theme from '../../../../../../../themes/global.theme';
import DefaultButton from '../../../../../../../utils/components/button/button';
import {
  FormatListBulletedRounded,
  VideoCameraBackRounded,
} from '@mui/icons-material';

type ChooseMethodProps = {
  setOption: (option: 'video' | 'steps') => void;
};

const ChooseMethod: React.FC<ChooseMethodProps> = ({
  setOption,
}): JSX.Element => {
  const { t } = useTranslation();
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        gap: '14px',
      }}
    >
      <Typography
        sx={{
          fontSize: '16px',
          fontFamily: 'Comfortaa',
          fontWeight: 700,
          textAlign: 'center',
          color: theme.palette.customText.primary,
        }}
      >
        {t('describeHowToPrepare')}
      </Typography>
      <DefaultButton
        onClick={() => setOption('video')}
        icon={<VideoCameraBackRounded fontSize={'large'} />}
        label={t('addingVideo')}
      />
      <Typography
        sx={{
          fontSize: '16px',
          fontFamily: 'Comfortaa',
          fontWeight: 700,
          textAlign: 'center',
          color: theme.palette.customText.primary,
        }}
      >
        {t('or')}
      </Typography>
      <DefaultButton
        onClick={() => setOption('steps')}
        icon={
          <FormatListBulletedRounded fontSize={'large'} />
        }
        label={t('stepByStep')}
        variant={'outlined'}
      />
    </div>
  );
};

export default ChooseMethod;
