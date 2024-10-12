import { CloseRounded } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import theme from '../../../../../themes/global.theme';
import { FC } from 'react';
import { ValidationResults } from '../..';

type InputErrorsType = {
  validationResults: ValidationResults;
  inputName: keyof ValidationResults;
};

const InputErrors: FC<InputErrorsType> = ({
  validationResults,
  inputName,
}): JSX.Element => {
  const { t } = useTranslation();

  return (
    <>
      {validationResults[inputName] &&
        Object.keys(validationResults[inputName]).length >
          0 &&
        Object.keys(validationResults[inputName]).map(
          (key, index) =>
            validationResults[inputName][key] && (
              <div
                key={key}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <CloseRounded
                  sx={{
                    fontSize: '18px',
                    fill: theme.palette.default.primary,
                  }}
                />
                <Typography
                  fontSize={12}
                  color={theme.palette.default.primary}
                  key={index}
                >
                  {t(key)}
                </Typography>
              </div>
            )
        )}
    </>
  );
};

export default InputErrors;
