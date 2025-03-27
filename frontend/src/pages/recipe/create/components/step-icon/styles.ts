import { styled } from '@mui/system';
import theme from '../../../../../themes/global.theme';

const styles = {
  StepIconRoot: styled('div')<{
    ownerState: { completed?: boolean; active?: boolean };
  }>(({}) => ({
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.grey[400],
    variants: [
      {
        props: ({ ownerState }) => ownerState.active,
        style: {
          backgroundColor: theme.palette.default.primary,
          boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
        },
      },
      {
        props: ({ ownerState }) => ownerState.completed,
        style: {
          backgroundColor: theme.palette.default.primary,
        },
      },
    ],
  })),
};

export default styles;
