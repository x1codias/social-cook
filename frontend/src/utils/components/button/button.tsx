import { Typography } from '@mui/material';
import styles from './styles';

type DefaultButtonProps = {
  variant?: 'outlined' | 'contained' | 'text' | undefined;
  type?: 'submit' | 'button' | 'reset' | undefined;
  label?: string;
  onClick?: () => void;
  icon?: JSX.Element;
};

const DefaultButton: React.FC<DefaultButtonProps> = (
  props
): JSX.Element => {
  const { variant, type, label, icon, onClick } = props;
  const { DefaultButton } = styles;

  return (
    <DefaultButton
      onClick={onClick}
      variant={variant}
      type={type}
    >
      {icon && icon}
      <Typography fontSize={16}>{label}</Typography>
    </DefaultButton>
  );
};

export default DefaultButton;
