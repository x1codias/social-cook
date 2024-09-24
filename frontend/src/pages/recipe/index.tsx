import { Avatar, Divider, Typography } from '@mui/material';
import theme from '../../themes/global.theme';
import { LuChefHat } from 'react-icons/lu';
import {
  AccessTimeRounded,
  PeopleRounded,
} from '@mui/icons-material';
import ImageGallery from '../../utils/components/image-gallery';
import imageOne from '../../assets/beautiful-colorful-vector-illustration-seamless-food-wallpaper-background_950558-4988.avif';
import imageTwo from '../../assets/e77ef6d4207c6da257384b67b10efc67.jpeg';
import imageThree from '../../assets/react.svg';
import IngredientsContainer from './create/components/ingredients-container';
import PreparationContainer from './create/components/preparation-container';

const Recipe: React.FC = (): JSX.Element => {
  return (
    <div
      style={{
        padding: '74px 40px 40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '100%',
        gap: '18px',
      }}
    >
      <Typography
        style={{
          fontFamily: 'Fredoka',
          fontSize: '18px',
          backgroundColor: 'lightgreen',
          padding: '4px 16px',
          borderRadius: '20px',
          textAlign: 'center',
        }}
      >
        {'Salad'}
      </Typography>
      <Typography
        style={{
          fontFamily: 'Fredoka',
          fontSize: '38px',
          fontWeight: 600,
          color: theme.palette.default.dark,
          borderBottom: `2px solid ${theme.palette.grey?.[400]}`,
          lineHeight: '100%',
          paddingBottom: '6px',
        }}
      >
        {'Cesar Salad'}
      </Typography>
      <div
        style={{
          padding: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          borderRadius: '30px',
          border: `1px solid ${theme.palette.default.dark}`,
          backgroundColor:
            theme.palette.customBackground.input,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <AccessTimeRounded fontSize={'large'} />
          <Typography
            style={{
              fontFamily: 'Fredoka',
              fontSize: '16px',
              padding: '2px 6px',
              backgroundColor:
                theme.palette.background?.paper,
              borderRadius: '20px',
              border: `1px solid ${theme.palette.default.dark}`,
            }}
          >
            {'1 '}
            <span>{'H'}</span>
            {' : 20 '}
            <span>{'M'}</span>
          </Typography>
        </div>
        <Divider
          style={{
            borderColor: theme.palette.default.dark,
          }}
          orientation={'vertical'}
        />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <PeopleRounded fontSize={'large'} />
          <Typography
            style={{
              fontFamily: 'Fredoka',
              fontSize: '16px',
              padding: '2px 6px',
              backgroundColor:
                theme.palette.background?.paper,
              borderRadius: '20px',
              border: `1px solid ${theme.palette.default.dark}`,
            }}
          >
            {'2 Servings'}
          </Typography>
        </div>
        <Divider
          style={{
            borderColor: theme.palette.default.dark,
          }}
          orientation={'vertical'}
        />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <LuChefHat fontSize={'22px'} />
          <Typography
            style={{
              fontFamily: 'Fredoka',
              fontSize: '16px',
              padding: '4px 8px',
              color: theme.palette.customText.button,
              backgroundColor:
                theme.palette.difficulty.easy,
              borderRadius: '20px',
            }}
          >
            {'Easy'}
          </Typography>
        </div>
      </div>
      <div
        style={{
          padding: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px',
          flexGrow: 1,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            gap: '8px',
            minWidth: 'fit-content',
            padding: '4px',
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
        </div>
        <Divider
          orientation={'vertical'}
          style={{
            borderWidth: '2px',
            borderRadius: '10px',
            borderColor: theme.palette.default.dark,
          }}
        />
        <Typography
          style={{
            padding: '8px',
            fontFamily: 'Comfortaa',
            fontSize: '14px',
          }}
        >
          {
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged"
          }
        </Typography>
      </div>
      <ImageGallery
        images={[imageOne, imageTwo, imageThree]}
      />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          width: '100%',
        }}
      >
        <IngredientsContainer />
        <PreparationContainer />
      </div>
    </div>
  );
};

export default Recipe;
