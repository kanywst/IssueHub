import React from 'react';
import { styled } from '@mui/material/styles';
import { Paper, PaperProps } from '@mui/material';

/**
 * Card component
 * Basic card UI component for displaying information
 */
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
  transition: 'box-shadow 0.3s ease-in-out',
  '&:hover': {
    boxShadow: theme.shadows[3],
  },
}));

export interface CardProps extends PaperProps {
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, ...props }) => {
  return <StyledPaper {...props}>{children}</StyledPaper>;
};

export default Card;
