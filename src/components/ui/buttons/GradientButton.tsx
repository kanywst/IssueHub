import React from "react";
import { Button, ButtonProps, styled } from "@mui/material";

interface GradientButtonProps extends ButtonProps {
  startColor?: string;
  endColor?: string;
  hoverStartColor?: string;
  hoverEndColor?: string;
}

const StyledButton = styled(Button, {
  shouldForwardProp: (prop) =>
    !["startColor", "endColor", "hoverStartColor", "hoverEndColor"].includes(
      prop as string,
    ),
})<GradientButtonProps>(
  ({
    startColor = "#4F46E5",
    endColor = "#10B981",
    hoverStartColor = "#6366F1",
    hoverEndColor = "#34D399",
    theme,
  }) => ({
    background: `linear-gradient(90deg, ${startColor} 0%, ${endColor} 100%)`,
    border: 0,
    color: "white",
    fontWeight: 600,
    transition: "all 0.3s ease",
    "&:hover": {
      background: `linear-gradient(90deg, ${hoverStartColor} 0%, ${hoverEndColor} 100%)`,
      boxShadow: "0 8px 20px rgba(79, 70, 229, 0.4)",
      transform: "translateY(-2px)",
    },
  }),
);

const GradientButton: React.FC<GradientButtonProps> = ({
  children,
  startColor,
  endColor,
  hoverStartColor,
  hoverEndColor,
  ...props
}) => {
  return (
    <StyledButton
      startColor={startColor}
      endColor={endColor}
      hoverStartColor={hoverStartColor}
      hoverEndColor={hoverEndColor}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default GradientButton;
