import {
  ArrowBackIosRounded,
  ArrowForwardIosRounded,
} from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React, { ComponentPropsWithRef } from 'react';

type PropType = Partial<ComponentPropsWithRef<'button'>>;

export const PrevButton: React.FC<PropType> = props => {
  const { children, ...restProps } = props;

  return (
    <IconButton
      className="embla__button embla__button--prev"
      type="button"
      {...restProps}
    >
      <ArrowBackIosRounded />
      {children}
    </IconButton>
  );
};

export const NextButton: React.FC<PropType> = props => {
  const { children, ...restProps } = props;

  return (
    <IconButton
      className="embla__button embla__button--next"
      type="button"
      {...restProps}
    >
      <ArrowForwardIosRounded />
      {children}
    </IconButton>
  );
};
