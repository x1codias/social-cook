import { Typography } from '@mui/material';
import theme from '../../../../../themes/global.theme';
import styles from './styles';
import { Add } from '@mui/icons-material';

const PreparationContainer: React.FC = (): JSX.Element => {
  const { DefaultButton } = styles;
  return (
    <div
      style={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        borderRadius: '8px',
        backgroundColor: theme.palette.default.light,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        gap: '16px',
      }}
    >
      <Typography
        style={{
          width: 'fit-content',
          fontFamily: 'Fredoka',
          fontSize: '28px',
          fontWeight: 600,
          color: theme.palette.default.dark,
          borderBottom: `2px solid ${theme.palette.grey?.[400]}`,
        }}
      >
        {'Preparation'}
      </Typography>
      <div>
        <DefaultButton variant={'contained'}>
          <Add fontSize={'large'} />
          <Typography
            style={{
              fontFamily: 'Fredoka',
              fontSize: '16px',
              textAlign: 'center',
            }}
          >
            {'Add Preparation'}
          </Typography>
        </DefaultButton>
      </div>
    </div>
  );
};

export default PreparationContainer;
