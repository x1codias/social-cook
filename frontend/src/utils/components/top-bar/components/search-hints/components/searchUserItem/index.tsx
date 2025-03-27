import { ArrowForwardRounded } from '@mui/icons-material';
import {
  Avatar,
  ListItem,
  Typography,
} from '@mui/material';
import theme from '../../../../../../../themes/global.theme';
import { useTranslation } from 'react-i18next';
import { Account } from '../../../../../../types/Account';

type SearchUserItemProps = {
  index: number;
  data: Account;
  navigateToUser: () => void;
};

const SearchUserItem: React.FC<SearchUserItemProps> = ({
  index,
  data,
  navigateToUser,
}) => {
  const { t } = useTranslation();

  return (
    <ListItem
      key={index}
      onClick={navigateToUser}
      sx={{
        padding: '12px 24px',
        display: 'flex',
        width: '100%',
        gap: '26px',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer',
        '&:hover': {
          backgroundColor:
            theme.palette.customBackground.default,
        },
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '26px',
          alignItems: 'center',
        }}
      >
        <Avatar
          sx={{ width: 54, height: 54 }}
          src={data.photo}
        />

        <Typography
          sx={{
            fontFamily: 'Roboto',
            fontSize: '16px',
            fontWeight: 500,
            color: theme.palette.text?.primary,
          }}
        >
          {data.username}
        </Typography>
        <Typography
          sx={{
            fontFamily: 'Roboto',
            fontSize: '16px',
            fontWeight: 500,
            color: theme.palette.text?.primary,
          }}
        >
          {'(' +
            data.followersCount +
            ' ' +
            t('followers') +
            ')'}
        </Typography>
      </div>
      <ArrowForwardRounded
        sx={{ justifySelf: 'flex-end' }}
        fontSize={'large'}
      />
    </ListItem>
  );
};

export default SearchUserItem;
