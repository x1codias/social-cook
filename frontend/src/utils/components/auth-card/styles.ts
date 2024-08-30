import { Button, Typography } from '@mui/material';
import { styled } from '@mui/system';
import theme from '../../../themes/global.theme';

const styles = {
  CardContainer: styled('div')({
    width: 'fit-content',
    height: 'fit-content',
    display: 'flex',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow:
      '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    justifySelf: 'center',
  }),
  CardTitle: styled(Typography)({
    color: theme.palette.customText?.primary,
    fontSize: '24px',
    fontFamily: 'Comfortaa',
    marginBottom: '20px',
  }),
  ButtonText: styled('div')({
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    },
  }),
  PasswordButton: styled(Button)({
    fontFamily: 'Comfortaa',
    color: theme.palette.default.primary,
    fontSize: '14px',
    fontWeight: 900,
    textTransform: 'none',
  }),
};

export default styles;
