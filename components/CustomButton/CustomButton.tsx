"use client";

import { Button, ButtonProps } from "@mui/material";

interface CustomButtonProps extends Omit<ButtonProps, "size"> {
  label: string;
}

const CustomButton = ({ label, sx, ...rest }: CustomButtonProps) => (
  <Button
    size="small"
    variant="outlined"
    disableRipple
    {...rest}
    sx={{
      textTransform: "none",
      fontSize: "12px",
      whiteSpace: "nowrap",
      flexShrink: 0,
      height: "28px",
      px: 1.5,
      ...sx,
    }}
  >
    {label}
  </Button>
);

export default CustomButton;
export type { CustomButtonProps };
