import React from 'react';
import { ConnectedProps, connect } from 'react-redux';
import Masonry, {
  ResponsiveMasonry,
} from 'react-responsive-masonry';
import FoodCard from '../../utils/components/food-card';
import { Divider, Typography } from '@mui/material';
import theme from '../../themes/global.theme';
import Footer from '../../utils/components/footer';

type FeedProps = ConnectedProps<typeof connector>;

const Feed: React.FC<FeedProps> = (props): JSX.Element => {
  const getRandomHeight = () => {
    const minHeight = 300; // minimum height in pixels
    const maxHeight = 800; // maximum height in pixels
    return (
      Math.floor(
        Math.random() * (maxHeight - minHeight + 1)
      ) + minHeight
    );
  };
  const heights = [...Array(21)].map(() =>
    getRandomHeight()
  );

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '12px',
      }}
    >
      <Typography
        style={{
          fontFamily: 'Fredoka',
          fontSize: '28px',
          fontWeight: 600,
          color: theme.palette.default.dark,
          borderBottom: `2px solid ${theme.palette.grey?.[400]}`,
        }}
      >
        {'For You'}
      </Typography>
      <ResponsiveMasonry
        style={{
          padding: '16px 24px',
          width: '100%',
        }}
        columnsCountBreakPoints={{
          350: 1,
          750: 2,
          1200: 3,
          1600: 4,
        }}
      >
        <Masonry gutter="14px">
          {heights.map((height, index) => (
            <FoodCard key={index} height={height} />
          ))}
        </Masonry>
      </ResponsiveMasonry>
      <Footer />
    </div>
  );
};

const mapStateToProps = () => ({});

const connector = connect(mapStateToProps, {});

export default connector(Feed);
