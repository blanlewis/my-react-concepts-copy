"use client";

import { useState, MouseEvent } from "react";
import { Box, Button, Divider, Menu, MenuItem, Typography } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface DropdownFilterProps {
  label: string;
  options: string[];
}

const DropdownFilter = ({ label, options }: DropdownFilterProps) => {
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const [selected, setSelected] = useState<string | null>(null);

  const open = Boolean(anchor);

  const handleOpen = (e: MouseEvent<HTMLButtonElement>) => setAnchor(e.currentTarget);
  const handleClose = () => setAnchor(null);
  const handleSelect = (option: string) => {
    setSelected(option === selected ? null : option);
    handleClose();
  };

  return (
    <>
      <Button
        size="small"
        endIcon={<KeyboardArrowDownIcon sx={{ fontSize: "16px !important" }} />}
        onClick={handleOpen}
        sx={{
          textTransform: "none",
          fontSize: "12px",
          fontWeight: selected ? 600 : 400,
          color: selected ? "primary.main" : "text.primary",
          whiteSpace: "nowrap",
          px: 1,
          minWidth: 0,
          height: "32px",
        }}
      >
        {selected ?? label}
      </Button>
      <Menu anchorEl={anchor} open={open} onClose={handleClose} slotProps={{ paper: { sx: { mt: 0.5 } } }}>
        {options.map((opt) => (
          <MenuItem
            key={opt}
            selected={opt === selected}
            onClick={() => handleSelect(opt)}
            sx={{ fontSize: "13px" }}
          >
            {opt}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

const DateFilter = ({ label }: { label: string }) => (
  <Button
    size="small"
    startIcon={<CalendarTodayIcon sx={{ fontSize: "14px !important" }} />}
    sx={{
      textTransform: "none",
      fontSize: "12px",
      color: "text.secondary",
      whiteSpace: "nowrap",
      px: 1,
      minWidth: 0,
      height: "32px",
      gap: 0,
    }}
  >
    <Typography component="span" sx={{ fontWeight: 600, fontSize: "12px", color: "text.primary", mr: 0.5 }}>
      {label}
    </Typography>
    Select dates
  </Button>
);

const FilterDivider = () => (
  <Divider orientation="vertical" flexItem sx={{ mx: 0.5, my: "auto", height: "20px", alignSelf: "center" }} />
);

const BookingsBar = () => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      width: "100%",
      height: "48px",
      flexShrink: 0,
      borderBottom: "1px solid",
      borderColor: "divider",
      px: 1,
      gap: 0.5,
    }}
  >
    <Typography sx={{ fontSize: "14px", fontWeight: 600, whiteSpace: "nowrap", mr: 1 }}>
      Bookings
    </Typography>

    <Box sx={{ display: "flex", alignItems: "center", overflowX: "auto", flex: 1, "&::-webkit-scrollbar": { display: "none" } }}>
      <DateFilter label="Pickup" />
      <FilterDivider />
      <DateFilter label="Delivery" />
      <FilterDivider />
      <DropdownFilter label="Postal code group" options={["Group A", "Group B", "Group C", "Group D"]} />
      <FilterDivider />
      <DropdownFilter label="Type" options={["Standard", "Express", "Economy", "Fragile"]} />
      <FilterDivider />
      <DropdownFilter label="Planning Type" options={["Planned", "Not Planned", "Pre-planned"]} />
      <FilterDivider />
      <DropdownFilter label="Temperature" options={["Ambient", "Chilled (2-8°C)", "Frozen (-18°C)", "Controlled"]} />
      <FilterDivider />
      <DropdownFilter label="Order Type" options={["Delivery", "Pickup", "Return", "Cross-dock"]} />
      <FilterDivider />
      <DropdownFilter label="Traffic group" options={["Group 1", "Group 2", "Group 3"]} />
      <FilterDivider />
      <DateFilter label="Departure" />
      <FilterDivider />
      <DropdownFilter label="Orderer" options={["Customer A", "Customer B", "Customer C", "Customer D"]} />
      <FilterDivider />
      <Button size="small" sx={{ minWidth: 0, px: 0.5, height: "32px", color: "text.secondary" }}>
        <MoreVertIcon sx={{ fontSize: "18px" }} />
      </Button>
    </Box>
  </Box>
);

export default BookingsBar;
