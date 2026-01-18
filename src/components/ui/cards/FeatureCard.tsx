import React, { ReactNode } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  CardProps,
  SxProps,
  Theme,
  alpha,
  useTheme,
} from '@mui/material';

interface FeatureCardProps extends Omit<CardProps, 'children'> {
  title: string;
  description: string;
  icon: ReactNode;
  iconColor?: 'primary' | 'secondary' | 'info' | 'warning' | 'error';
  contentSx?: SxProps<Theme>;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  iconColor = 'primary',
  contentSx = {},
  sx = {},
  ...cardProps
}) => {
  const theme = useTheme();
  const colorHex = theme.palette[iconColor].main;

  return (
    <Card
      sx={{
        height: '100%',
        width: '100%',
        maxWidth: 350,
        position: 'relative',
        overflow: 'visible',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: -1,
          left: -1,
          right: -1,
          bottom: -1,
          borderRadius: 'inherit',
          padding: '1px',
          background: `linear-gradient(135deg, ${alpha(colorHex, 0.5)}, transparent 60%)`,
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          pointerEvents: 'none',
        },
        ...sx,
      }}
      {...cardProps}
    >
      <CardContent
        sx={{
          textAlign: 'center',
          py: 5,
          px: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          ...contentSx,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mb: 3,
            width: 80,
            height: 80,
            borderRadius: '24px',
            backgroundColor: alpha(colorHex, 0.1),
            color: colorHex,
            boxShadow: `0 0 40px ${alpha(colorHex, 0.2)}`,
            border: `1px solid ${alpha(colorHex, 0.2)}`,
            '& > *': {
              fontSize: 40,
            },
          }}
        >
          {icon}
        </Box>
        <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 700 }}>
          {title}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mx: 'auto', maxWidth: '90%', lineHeight: 1.7 }}
        >
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
