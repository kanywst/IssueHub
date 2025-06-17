import React from 'react';
import {
  Select as MuiSelect,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  SelectProps as MuiSelectProps,
  SelectChangeEvent,
} from '@mui/material';

/**
 * セレクトコンポーネント
 * ドロップダウン選択用
 */
export interface SelectOption {
  value: string | number;
  label: string;
}

export interface SelectProps extends Omit<MuiSelectProps, 'onChange'> {
  options: SelectOption[];
  label: string;
  helperText?: string;
  error?: boolean;
  onChange?: (value: string | number) => void;
}

export const Select: React.FC<SelectProps> = ({
  options,
  label,
  helperText,
  error = false,
  onChange,
  value,
  ...props
}) => {
  const labelId = `select-${label.toLowerCase().replace(/\s+/g, '-')}`;

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    onChange?.(event.target.value as string | number);
  };

  return (
    <FormControl fullWidth error={error}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <MuiSelect labelId={labelId} value={value} label={label} onChange={handleChange} {...props}>
        {options.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </MuiSelect>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default Select;
