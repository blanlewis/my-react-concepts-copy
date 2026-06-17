"use client";

import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface ToggleDataProps {
  readonly label: string;
  readonly icon: React.ReactNode;
  readonly value: string;
}

interface CustomToggleButtonProps {
  readonly toggleData: ToggleDataProps[];
  readonly selectedToggle: string | null;
  readonly setSelectedToggle: (value: string | null) => void;
  readonly isDeselectionNotAllowed?: boolean;
  readonly height?: number;
  readonly autoWidth?: boolean;
}

const CustomToggleButton = ({
  toggleData,
  selectedToggle,
  setSelectedToggle,
  isDeselectionNotAllowed = false,
  height = 40,
  autoWidth = false,
}: CustomToggleButtonProps) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    selected: string | null
  ) => {
    if (isDeselectionNotAllowed && selected === null) return;
    setSelectedToggle(selected);
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={selectedToggle}
      exclusive
      onChange={handleChange}
      sx={{
        height,
        borderRadius: 2,
        backgroundColor: isDark ? theme.palette.grey[800] : "#FFF",
        border: `1px solid ${isDark ? theme.palette.grey[700] : "#D5D7DA"}`,
        boxShadow: isDark
          ? "none"
          : "inset 0px 0px 0px 1px rgba(10, 13, 18, 0.18), inset 0px -2px 0px 0px rgba(10, 13, 18, 0.05), 0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
        "& .MuiToggleButtonGroup-firstButton": {
          borderTopLeftRadius: "8px",
          borderBottomLeftRadius: "8px",
        },
        "& .MuiToggleButtonGroup-lastButton": {
          borderTopRightRadius: "8px",
          borderBottomRightRadius: "8px",
        },
      }}
    >
      {toggleData.map(({ icon, value: toggleValue }) => (
        <ToggleButton
          key={toggleValue}
          value={toggleValue}
          disableRipple
          sx={{
            minWidth: autoWidth ? "unset" : 44,
            px: autoWidth ? 1.5 : undefined,
            py: 0,
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
        >
          {autoWidth ? icon : (
            <Box
              sx={{
                width: 20,
                height: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {icon}
            </Box>
          )}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default CustomToggleButton;