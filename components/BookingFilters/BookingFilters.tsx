"use client";

import { useState, MouseEvent } from "react";
import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export const FILTER_BTN_SX = {
  textTransform: "none",
  fontSize: "12px",
  whiteSpace: "nowrap",
  px: 1,
  minWidth: 0,
  height: "25px",
  flexShrink: 0,
  borderColor: "#D5D7DA",
  "&:hover": { borderColor: "#b0b3b8" },
} as const;

export const DateFilter = ({ label }: { label: string }) => (
  <Button
    size="small"
    variant="outlined"
    startIcon={<CalendarTodayIcon sx={{ fontSize: "14px !important" }} />}
    sx={{ ...FILTER_BTN_SX, color: "text.secondary", gap: 0 }}
  >
    <Typography component="span" sx={{ fontWeight: 600, fontSize: "12px", color: "text.primary", mr: 0.5 }}>
      {label}
    </Typography>
    Select dates
  </Button>
);

export const DropdownFilter = ({ label, options }: { label: string; options: string[] }) => {
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const [selected, setSelected] = useState<string | null>(null);

  const handleOpen = (e: MouseEvent<HTMLButtonElement>) => setAnchor(e.currentTarget);
  const handleClose = () => setAnchor(null);
  const handleSelect = (opt: string) => { setSelected(opt === selected ? null : opt); handleClose(); };

  return (
    <>
      <Button
        size="small"
        variant="outlined"
        endIcon={<KeyboardArrowDownIcon sx={{ fontSize: "16px !important" }} />}
        onClick={handleOpen}
        sx={{ ...FILTER_BTN_SX, fontWeight: selected ? 600 : 400, color: selected ? "primary.main" : "text.primary" }}
      >
        {selected ?? label}
      </Button>
      <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={handleClose} slotProps={{ paper: { sx: { mt: 0.5 } } }}>
        {options.map(opt => (
          <MenuItem key={opt} selected={opt === selected} onClick={() => handleSelect(opt)} sx={{ fontSize: "13px" }}>
            {opt}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export const MeasureItem = ({ item }: { item: { type: string; label: string } }) => (
  <Box sx={{ display: "inline-flex", alignItems: "center", fontSize: "12px", px: 1, height: "25px", whiteSpace: "nowrap", gap: 0.5 }}>
    {item.type === "date" && <CalendarTodayIcon sx={{ fontSize: "14px" }} />}
    {item.label}
    {item.type === "date" && <Typography component="span" sx={{ fontSize: "12px", ml: 0.5 }}>Select dates</Typography>}
    {item.type === "dropdown" && <KeyboardArrowDownIcon sx={{ fontSize: "16px" }} />}
  </Box>
);
