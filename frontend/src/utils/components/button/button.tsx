import { SxProps, Theme, Typography } from '@mui/material';
import styles from './styles';
import { MouseEvent } from 'react';

type DefaultButtonProps = {
  customStyles?: SxProps<Theme> | undefined;
  variant?: 'outlined' | 'contained' | 'text' | undefined;
  type?: 'submit' | 'button' | 'reset' | undefined;
  label?: string | JSX.Element;
  onClick: (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => void;
  icon?: JSX.Element;
  iconForward?: JSX.Element;
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
    iconForward,
    onClick,
    customStyles,
    disabled,
  } = props;
  const { DefaultButton } = styles;

  return (
    <DefaultButton
      onClick={e => onClick(e)}
      variant={variant}
      type={type}
      sx={customStyles}
      disabled={disabled}
    >
      {icon}
      <Typography fontSize={16}>{label}</Typography>
      {iconForward}
    </DefaultButton>
  );
};

export default DefaultButton;
