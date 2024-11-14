import {
  AddRounded,
  ExpandMore,
  Search,
} from '@mui/icons-material';
import styles from './styles';
import {
  InputLabel,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import { Unit } from '../../types/Unit';
import { Ingredient } from '../../types/Ingredient';
import theme from '../../../themes/global.theme';
import { useTranslation } from 'react-i18next';

type DefaultSelectProps<
  T extends string | Ingredient | Unit
> = {
  value: string | number;
  options: T[];
  onChange: (
    val: string | number,
    valToChange: string
  ) => void;
  placeholder: string;
  minWidth?: string;
  onOpen?: () => void;
  onClose?: () => void;
  search?: boolean;
  addBtnLbl?: string;
  onAddClick?: () => void;
  label?: string;
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
    placeholder,
    minWidth,
    onOpen,
    onClose,
    search,
    addBtnLbl,
    onAddClick,
    label,
  } = props;
  const { SelectField, SelectItem, AddBtn } = styles;
  const { t } = useTranslation();

  const formattedOptions = () => {
    return options.map((option, index) => {
      switch (typeof option) {
        case 'string':
          return (
            <SelectItem
              key={index}
              value={option as string}
            >
              {t(option)}
            </SelectItem>
          );
        case 'object':
          return (
            <SelectItem
              key={index}
              value={(option as Ingredient | Unit).id}
            >
              {t((option as Ingredient | Unit).name)}
            </SelectItem>
          );
        default:
          return [];
      }
    });
  };

  // Preparing children elements to be passed to SelectField as a flat array
  const selectChildren = [
    // Search input field if search is enabled
    search && (
      <div key="search" onClick={e => e.stopPropagation()}>
        <TextField
          variant="standard"
          fullWidth
          placeholder="Search..."
          autoFocus
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onKeyDown={e => e.stopPropagation()}
          onChange={e => onChange(e.target.value, 'search')}
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
    ),
    addBtnLbl && (
      <AddBtn
        value={''}
        style={{
          padding: '8px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
        }}
        onClick={e => {
          e.preventDefault();
          e.stopPropagation(); // Prevent the dropdown from closing
          if (onAddClick) onAddClick();
        }}
      >
        <AddRounded
          sx={{
            color: theme.palette.customText.button,
            fontSize: '18px',
          }}
        />
        <Typography
          sx={{
            color: theme.palette.customText.button,
            fontSize: '14px',
            fontFamily: 'Fredoka',
            marginLeft: '8px',
          }}
        >
          {addBtnLbl}
        </Typography>
      </AddBtn>
    ),
    // Disabled MenuItem as the placeholder
    <MenuItem
      key="placeholder"
      value={''}
      style={{ display: 'none' }}
      disabled
    >
      {placeholder}
    </MenuItem>,
    // Add all formatted options as children
    ...formattedOptions(),
  ].filter(Boolean); // Filter out any `false` elements if `search` or `addBtnLbl` are not provided

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
      <SelectField
        defaultValue={value}
        displayEmpty
        IconComponent={props => (
          <ExpandMore {...props} fontSize={'large'} />
        )}
        minWidth={minWidth ? minWidth : '100px'}
        onChange={e => {
          onChange(
            e.target.value as string | number,
            'value'
          );
        }}
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
        {selectChildren}
      </SelectField>
    </div>
  );
};

export default DefaultSelect;
