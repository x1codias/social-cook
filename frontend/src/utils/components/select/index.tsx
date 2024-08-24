import { ExpandMore } from '@mui/icons-material';
import styles from './styles';
import { capitalize, MenuItem } from '@mui/material';
import { Unit } from '../../types/Unit';
import { Ingredient } from '../../types/Ingredient';

type DefaultSelectProps<
  T extends string | Ingredient | Unit
> = {
  value: string | number;
  options: T[];
  onChange: (val: string) => void;
  label: string;
  minWidth: number;
  onOpen?: () => void;
  onClose?: () => void;
};

const DefaultSelect = <
  T extends string | Ingredient | Unit
>(
  props: DefaultSelectProps<T>
): JSX.Element => {
  const {
    value,
    options,
    onChange,
    label,
    minWidth,
    onOpen,
    onClose,
  } = props;
  const { SelectField } = styles;

  const formattedOptions = () => {
    return options.map((option, index) => {
      switch (typeof option) {
        case 'string':
          return (
            <MenuItem key={index} value={option as string}>
              {capitalize(String(option))}
            </MenuItem>
          );
        case 'object':
          if (option && 'name' in option) {
            return (
              <MenuItem
                key={index}
                value={(option as Ingredient | Unit).id}
              >
                {capitalize(
                  (option as Ingredient | Unit).name
                )}
              </MenuItem>
            );
          }
          break;
        default:
          return null;
      }
    });
  };

  return (
    <SelectField
      defaultValue={value}
      displayEmpty
      IconComponent={props => (
        <ExpandMore {...props} fontSize={'large'} />
      )}
      minWidth={minWidth}
      onChange={e => onChange(e.target.value as string)}
      onOpen={onOpen}
      onClose={onClose}
    >
      <MenuItem value={''} disabled>
        {label}
      </MenuItem>
      {formattedOptions()}
    </SelectField>
  );
};

export default DefaultSelect;
