import React, { ReactNode } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  CardProps,
  SxProps,
  Theme,
} from "@mui/material";

interface FeatureCardProps extends Omit<CardProps, "children"> {
  title: string;
  description: string;
  icon: ReactNode;
  iconColor?: string;
  contentSx?: SxProps<Theme>;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  iconColor = "primary.main",
  contentSx = {},
  sx = {},
  ...cardProps
}) => {
  return (
    <Card
      sx={{
        height: "100%",
        width: "100%",
        maxWidth: 350,
        ...sx,
      }}
      {...cardProps}
    >
      <CardContent
        sx={{
          textAlign: "center",
          py: 5,
          px: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          ...contentSx,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 2,
            color: iconColor,
            "& > *": {
              fontSize: 48,
            },
          }}
        >
          {icon}
        </Box>
        <Typography variant="h6" component="h3" gutterBottom>
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mx: "auto", maxWidth: "90%" }}
        >
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
