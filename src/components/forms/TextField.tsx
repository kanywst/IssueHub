'use client';

import { TextField as MuiTextField, TextFieldProps as MuiTextFieldProps } from '@mui/material';
import { forwardRef } from 'react';

export interface TextFieldProps extends MuiTextFieldProps {
  label: string;
  error?: boolean;
  helperText?: string;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, error, helperText, ...props }, ref) => {
    return (
      <MuiTextField
        ref={ref}
        label={label}
        error={error}
        helperText={helperText}
        variant="outlined"
        fullWidth
        {...props}
      />
    );
  }
);

TextField.displayName = 'TextField';
