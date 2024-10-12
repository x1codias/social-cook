import { SxProps, Theme, Typography } from '@mui/material';
import styles from './styles';

type DefaultButtonProps = {
  customStyles?: SxProps<Theme> | undefined;
  variant?: 'outlined' | 'contained' | 'text' | undefined;
  type?: 'submit' | 'button' | 'reset' | undefined;
  label?: string;
  onClick?: () => void;
  icon?: JSX.Element;
  disabled?: boolean;
};

const DefaultButton: React.FC<DefaultButtonProps> = (
  props
): JSX.Element => {
  const {
    variant,
    type,
    label,
    icon,
    onClick,
    customStyles,
    disabled,
  } = props;
  const { DefaultButton } = styles;

  return (
    <DefaultButton
      onClick={onClick}
      variant={variant}
      type={type}
      sx={customStyles}
      disabled={disabled}
    >
      {icon && icon}
      <Typography fontSize={18}>{label}</Typography>
    </DefaultButton>
  );
};

export default DefaultButton;
