import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import styles from '../../styles';
import theme from '../../../../../themes/global.theme';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../../store';
import { useState } from 'react';
import { createIngredient } from '../../../../../actions/ingredient.actions';

type AddIngredientProps = {
  openAddModal: boolean;
  setOpenAddModal: (val: boolean) => void;
};

const AddIngredient: React.FC<AddIngredientProps> = ({
  openAddModal,
  setOpenAddModal,
}): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const { InputField, DefaultButton } = styles;
  const [newIngredientName, setNewIngredientName] =
    useState('');

  const onCLickAddIngredient = async () => {
    await dispatch(createIngredient(newIngredientName));
    setOpenAddModal(false);
  };

  return (
    <Dialog
      open={openAddModal}
      onClose={() => setOpenAddModal(false)}
    >
      <DialogTitle
        sx={{ display: 'flex', justifyContent: 'center' }}
      >
        <Typography
          style={{
            width: 'fit-content',
            fontFamily: 'Fredoka',
            fontSize: '28px',
            fontWeight: 600,
            color: theme.palette.default.dark,
            borderBottom: `2px solid ${theme.palette.grey?.[400]}`,
            textAlign: 'center',
          }}
        >
          {'New Ingredient'}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <InputField
          value={newIngredientName}
          placeholder={'Name'}
          minWidth={'340px'}
          onChange={e =>
            setNewIngredientName(e.target.value)
          }
        />
      </DialogContent>
      <DialogActions
        sx={{ display: 'flex', justifyContent: 'center' }}
      >
        <DefaultButton
          onClick={() => onCLickAddIngredient()}
        >
          {'Add'}
        </DefaultButton>
      </DialogActions>
    </Dialog>
  );
};

export default AddIngredient;
