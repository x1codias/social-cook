import { AppBar, Typography } from '@mui/material';
import theme from '../../../themes/global.theme';

const Footer: React.FC = (): JSX.Element => {
  return (
    <AppBar
      style={{
        backgroundColor: theme.palette.default.primary,
        display: 'flex',
        alignItems: 'center',
        padding: '20px',
      }}
      position={'relative'}
    >
      <Typography
        style={{ fontFamily: 'Roboto', fontSize: '14px' }}
      >
        {'SocialCook @ 2024. All rights reserved.'}
      </Typography>
    </AppBar>
  );
};

export default Footer;
