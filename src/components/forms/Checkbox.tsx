import React from 'react';
import {
  FormControl,
  FormControlLabel,
  Checkbox as MuiCheckbox,
  CheckboxProps as MuiCheckboxProps,
  FormHelperText,
} from '@mui/material';

/**
 * チェックボックスコンポーネント
 * フォーム内でのブール値入力用
 */
export interface CheckboxProps extends Omit<MuiCheckboxProps, 'onChange'> {
  label: string;
  helperText?: string;
  error?: boolean;
  onChange?: (checked: boolean) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  helperText,
  error = false,
  onChange,
  checked,
  ...props
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.checked);
  };

  return (
    <FormControl error={error} component="fieldset">
      <FormControlLabel
        control={<MuiCheckbox checked={checked} onChange={handleChange} {...props} />}
        label={label}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default Checkbox;
