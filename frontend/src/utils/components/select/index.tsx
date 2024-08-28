import { ExpandMore, Search } from '@mui/icons-material';
import styles from './styles';
import {
  capitalize,
  Divider,
  MenuItem,
  TextField,
} from '@mui/material';
import { Unit } from '../../types/Unit';
import { Ingredient } from '../../types/Ingredient';
import theme from '../../../themes/global.theme';

type DefaultSelectProps<
  T extends string | Ingredient | Unit
> = {
  value: string | number;
  options: T[];
  onChange: (val: string, valToChange: string) => void;
  label: string;
  minWidth: number;
  onOpen?: () => void;
  onClose?: () => void;
  search: boolean;
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
    search,
  } = props;
  const { SelectField, SelectItem } = styles;

  const formattedOptions = () => {
    return options.map((option, index) => {
      switch (typeof option) {
        case 'string':
          return (
            <SelectItem
              key={index}
              value={option as string}
            >
              {capitalize(String(option))}
            </SelectItem>
          );
        case 'object':
          if (option && 'name' in option) {
            return (
              <SelectItem
                key={index}
                value={(option as Ingredient | Unit).id}
              >
                {capitalize(
                  (option as Ingredient | Unit).name
                )}
              </SelectItem>
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
      onChange={e =>
        onChange(e.target.value as string, 'value')
      }
      onOpen={onOpen}
      onClose={onClose}
      MenuProps={{
        PaperProps: {
          sx: {
            maxHeight: '220px',
            '& .MuiList-root': {
              padding: 0, // Remove padding from the list items
            },
          },
        },
      }}
    >
      <MenuItem
        value={''}
        style={{ display: 'none' }}
        disabled
      >
        {label}
      </MenuItem>
      {search && (
        <>
          <div onClick={e => e.stopPropagation()}>
            <TextField
              variant="standard"
              fullWidth
              placeholder="Search..."
              autoFocus
              onKeyDown={e => e.stopPropagation()}
              onChange={e =>
                onChange(e.target.value, 'search')
              }
              sx={{
                padding: '8px',
                backgroundColor:
                  theme.palette.customBackground.input,

                '& .MuiInputBase-input': {
                  padding: 0,
                  fontSize: '12px',
                },
              }}
              InputProps={{
                disableUnderline: true,
                endAdornment: (
                  <Search
                    sx={{
                      fontSize: '16px',
                      fill: theme.palette.grey?.[500],
                    }}
                  />
                ),
              }}
            />
          </div>
          <Divider />
        </>
      )}
      {formattedOptions()}
    </SelectField>
  );
};

export default DefaultSelect;
