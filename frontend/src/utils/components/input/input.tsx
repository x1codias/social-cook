import { ChangeEvent, KeyboardEvent } from 'react';
import styles from './styles';

type DefaultInputProps = {
  type: 'number' | 'password' | 'text' | 'email';
  placeholder: string;
  value: string | number | undefined;
  height?: string;
  minWidth?: string;
  maxWidth?: string;
  onKeyDown?: (e: KeyboardEvent<HTMLDivElement>) => void;
  onChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onBlur?: () => void;
  InputProps?: {
    inputProps?: {
      min?: number;
      max?: number;
    };
    endAdornment?: JSX.Element;
  };
  multiline?: boolean;
  name?: string;
  hasError?: boolean;
};

const DefaultInput: React.FC<DefaultInputProps> = (
  props
): JSX.Element => {
  const {
    type,
    placeholder,
    value,
    height,
    maxWidth,
    minWidth,
    InputProps,
    multiline,
    name,
    onKeyDown,
    onChange,
    onBlur,
    hasError,
  } = props;
  const { InputField } = styles;

  return (
    <InputField
      name={name}
      type={type}
      placeholder={placeholder}
      height={height}
      maxWidth={maxWidth}
      minWidth={minWidth}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      InputProps={InputProps}
      multiline={multiline}
      onBlur={onBlur}
      hasError={hasError}
    />
  );
};

export default DefaultInput;
