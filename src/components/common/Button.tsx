'use client';

import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';
import { ReactNode } from 'react';

export interface ButtonProps extends Omit<MuiButtonProps, 'variant'> {
  variant?: 'primary' | 'secondary' | 'outlined' | 'text' | 'contained';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  children,
  ...props
}: ButtonProps) {
  // Map our custom variants to MUI variants
  let muiVariant: MuiButtonProps['variant'] = 'contained';
  let color: MuiButtonProps['color'] = 'primary';

  if (variant === 'primary') {
    muiVariant = 'contained';
    color = 'primary';
  } else if (variant === 'secondary') {
    muiVariant = 'contained';
    color = 'secondary';
  } else if (variant === 'outlined') {
    muiVariant = 'outlined';
    color = 'primary';
  } else if (variant === 'text') {
    muiVariant = 'text';
    color = 'primary';
  } else if (variant === 'contained') {
    muiVariant = 'contained';
    color = 'primary';
  }

  return (
    <MuiButton variant={muiVariant} color={color} size={size} fullWidth={fullWidth} {...props}>
      {children}
    </MuiButton>
  );
}
