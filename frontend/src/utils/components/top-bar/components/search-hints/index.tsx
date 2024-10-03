import {
  Avatar,
  Box,
  Grid,
  Typography,
} from '@mui/material';
import { RecipeCategories } from '../../../../types/Recipe';
import { useTranslation } from 'react-i18next';
import Grid2 from '@mui/material/Unstable_Grid2';
import theme from '../../../../../themes/global.theme';
import { ArrowForwardRounded } from '@mui/icons-material';
import DefaultButton from '../../../button/button';

type SearchHintsProps = {};

const SearchHints: React.FC<
  SearchHintsProps
> = (): JSX.Element => {
  const { t } = useTranslation();
  return (
    <>
      <div
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            alignSelf: 'center',
            padding: '12px 0',
            gap: '18px',
          }}
        >
          <DefaultButton
            customStyles={{
              padding: '4px 36px',
              borderRadius: '20px',
              fontSize: '18px',
            }}
            variant={'outlined'}
            label={t('recipe')}
          />
          <DefaultButton
            customStyles={{
              padding: '4px 36px',
              borderRadius: '20px',
              fontSize: '18px',
            }}
            variant={'outlined'}
            label={t('user')}
          />
          <DefaultButton
            customStyles={{
              padding: '4px 36px',
              borderRadius: '20px',
              fontSize: '18px',
            }}
            variant={'outlined'}
            label={t('category')}
          />
        </div>
        <Grid2
          container
          wrap={'wrap'}
          sx={{
            width: '100%',
          }}
        >
          {Object.keys(RecipeCategories).map(category => (
            <Grid item flexGrow={1}>
              <Typography
                fontSize={18}
                textAlign={'center'}
                sx={{
                  padding: '12px 4px',
                  backgroundColor:
                    theme.palette.categories[category],
                }}
              >
                {t(category)}
              </Typography>
            </Grid>
          ))}
        </Grid2>
        <div>
          <div
            style={{
              backgroundColor: 'white',
              padding: '12px 24px',
              display: 'grid',
              gridTemplateColumns: 'auto auto 1fr',
              alignItems: 'center',
              justifyContent: 'flex-start',
              width: '100%',
              gap: '26px',
            }}
          >
            <Avatar>{'J'}</Avatar>
            <Typography
              style={{
                fontFamily: 'Roboto',
                fontSize: '16px',
                fontWeight: 500,
                color: theme.palette.text?.primary,
              }}
            >
              {'Jane Doe'}
            </Typography>
            <ArrowForwardRounded
              sx={{ justifySelf: 'flex-end' }}
              fontSize={'large'}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchHints;
