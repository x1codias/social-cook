import {
  InfoOutlined,
  RestaurantRounded,
  SoupKitchenRounded,
} from '@mui/icons-material';
import { StepIconProps } from '@mui/material';
import { ReactElement } from 'react';
import styles from './styles';

const StepIcon: React.FC<StepIconProps> = (
  props
): JSX.Element => {
  const { active, completed, className } = props;

  const { StepIconRoot } = styles;

  const icons: { [index: string]: ReactElement<unknown> } =
    {
      1: <InfoOutlined sx={{ fontSize: '30px' }} />,
      2: <RestaurantRounded sx={{ fontSize: '26px' }} />,
      3: <SoupKitchenRounded sx={{ fontSize: '26px' }} />,
    };

  return (
    <StepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </StepIconRoot>
  );
};

export default StepIcon;
