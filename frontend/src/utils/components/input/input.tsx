import { ChangeEvent, KeyboardEvent } from 'react';
import styles from './styles';
import {
  InputLabel,
  InputProps,
  SxProps,
} from '@mui/material';

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
  InputProps?: Partial<InputProps>;
  multiline?: boolean;
  name?: string;
  hasError?: boolean;
  label?: string;
  min?: number;
  max?: number;
  inputStyle?: SxProps | undefined;
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
    label,
    min,
    max,
    inputStyle,
  } = props;
  const { InputField } = styles;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        width: '100%',
      }}
    >
      {label && (
        <InputLabel
          sx={{
            fontSize: '16px',
            fontFamily: 'Comfortaa',
            fontWeight: 700,
          }}
        >
          {label}:
        </InputLabel>
      )}
      <InputField
        sx={inputStyle}
        name={name}
        type={type}
        placeholder={placeholder}
        height={height}
        maxWidth={maxWidth}
        minWidth={minWidth}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        InputProps={{
          ...InputProps,
          inputProps: { min, max }, // Use `inputProps` inside `InputProps` for min and max
        }}
        multiline={multiline}
        onBlur={onBlur}
        hasError={hasError}
      />
    </div>
  );
};

export default DefaultInput;
