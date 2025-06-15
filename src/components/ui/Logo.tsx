import React from 'react';
import { Box, Typography, BoxProps } from '@mui/material';

interface LogoProps extends BoxProps {
  size?: 'small' | 'medium' | 'large';
  variant?: 'full' | 'icon';
  color?: 'primary' | 'white' | 'dark';
}

const Logo: React.FC<LogoProps> = ({
  size = 'medium',
  variant = 'full',
  color = 'primary',
  sx = {},
  ...props
}) => {
  // Size mapping
  const sizeMap = {
    small: {
      iconSize: 24,
      fontSize: '1.2rem',
      spacing: 1,
    },
    medium: {
      iconSize: 32,
      fontSize: '1.5rem',
      spacing: 1.5,
    },
    large: {
      iconSize: 48,
      fontSize: '2rem',
      spacing: 2,
    },
  };

  // Color mapping
  const colorMap = {
    primary: {
      icon: 'primary.main',
      text: 'text.primary',
    },
    white: {
      icon: '#fff',
      text: '#fff',
    },
    dark: {
      icon: '#111827',
      text: '#111827',
    },
  };

  const { iconSize, fontSize, spacing } = sizeMap[size];
  const { icon: iconColor, text: textColor } = colorMap[color];

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        ...sx,
      }}
      {...props}
    >
      {/* Logo icon */}
      <Box
        sx={{
          width: iconSize,
          height: iconSize,
          borderRadius: '8px',
          background: `linear-gradient(135deg, #4F46E5 0%, #10B981 100%)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
        }}
      >
        <Typography
          variant="h6"
          component="span"
          sx={{
            color: '#fff',
            fontWeight: 'bold',
            fontSize: iconSize * 0.5,
            lineHeight: 1,
          }}
        >
          I
        </Typography>
      </Box>

      {/* Logo text (only shown in full variant) */}
      {variant === 'full' && (
        <Typography
          variant="h6"
          component="span"
          sx={{
            ml: spacing,
            fontWeight: 'bold',
            fontSize: fontSize,
            color: textColor,
          }}
        >
          IssueHub
        </Typography>
      )}
    </Box>
  );
};

export default Logo;
