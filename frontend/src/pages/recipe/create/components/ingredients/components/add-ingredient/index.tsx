import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import DefaultInput from '../../../../../../../utils/components/input/input';
import DefaultButton from '../../../../../../../utils/components/button/button';
import theme from '../../../../../../../themes/global.theme';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import { createIngredient } from '../../../../../../../actions/ingredient.actions';
import { AppDispatch } from '../../../../../../../store';

type AddIngredientModalProps = {
  open: boolean;
  onClose: () => void;
};

const AddIngredientModal: React.FC<
  AddIngredientModalProps
> = (props): JSX.Element => {
  const { open, onClose } = props;
  const [newIngredient, setNewIngredient] = useState('');
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const handleSaveIngredient = useCallback(async () => {
    const ingredientToStore = _.camelCase(newIngredient);

    await dispatch(createIngredient(ingredientToStore));

    setNewIngredient('');
    onClose();
  }, [dispatch, newIngredient, onClose]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <Typography
          style={{
            fontFamily: 'Fredoka',
            fontSize: '28px',
            fontWeight: 600,
            color: theme.palette.default.dark,
            borderBottom: `2px solid ${theme.palette.grey?.[400]}`,
            textAlign: 'center',
          }}
        >
          {t('addNewIngredient')}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DefaultInput
          type={'text'}
          value={newIngredient}
          onChange={e => setNewIngredient(e.target.value)}
          placeholder={t('ingredientName')}
          label={t('name')}
          minWidth={'240px'}
          maxWidth={'240px'}
        />
      </DialogContent>
      <DialogActions sx={{ padding: '8px 24px' }}>
        <DefaultButton
          label={t('cancel')}
          variant={'outlined'}
          onClick={() => {
            setNewIngredient('');
            onClose();
          }}
        />
        <DefaultButton
          label={t('save')}
          onClick={handleSaveIngredient}
        />
      </DialogActions>
    </Dialog>
  );
};

export default AddIngredientModal;
