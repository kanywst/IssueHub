import React from 'react';
import { styled } from '@mui/material/styles';
import { Skeleton as MuiSkeleton, SkeletonProps as MuiSkeletonProps } from '@mui/material';

/**
 * Skeleton loading component
 * Used as a placeholder during content loading
 */
const StyledSkeleton = styled(MuiSkeleton)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)',
  borderRadius: theme.shape.borderRadius,
}));

export interface SkeletonProps extends MuiSkeletonProps {
  width?: number | string;
  height?: number | string;
  variant?: 'text' | 'rectangular' | 'circular';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = 20,
  variant = 'rectangular',
  ...props
}) => {
  return (
    <StyledSkeleton variant={variant} width={width} height={height} animation="wave" {...props} />
  );
};

export default Skeleton;
