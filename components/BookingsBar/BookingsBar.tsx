"use client";

import { useRef, useState, useMemo } from "react";
import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import useResizeObserver from "use-resize-observer";
import { DateFilter, DropdownFilter, MeasureItem } from "@/components/BookingFilters/BookingFilters";

type FilterItem =
  | { type: "date"; label: string }
  | { type: "dropdown"; label: string; options: string[] };

const FILTER_ITEMS: FilterItem[] = [
  { type: "date",     label: "Pickup" },
  { type: "date",     label: "Delivery" },
  { type: "dropdown", label: "Postal code group", options: ["Group A", "Group B", "Group C", "Group D"] },
  { type: "dropdown", label: "Type",              options: ["Standard", "Express", "Economy", "Fragile"] },
  { type: "dropdown", label: "Planning Type",     options: ["Planned", "Not Planned", "Pre-planned"] },
  { type: "dropdown", label: "Temperature",       options: ["Ambient", "Chilled (2-8°C)", "Frozen (-18°C)", "Controlled"] },
  { type: "dropdown", label: "Order Type",        options: ["Delivery", "Pickup", "Return", "Cross-dock"] },
  { type: "dropdown", label: "Traffic group",     options: ["Group 1", "Group 2", "Group 3"] },
  { type: "date",     label: "Departure" },
];

const GAP = 4;
const MORE_BTN_WIDTH = 36;

const BookingsBar = () => {
  const measureRef = useRef<HTMLDivElement>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { ref: containerRef, width: containerWidth = 0 } = useResizeObserver<HTMLDivElement>();

  const visibleCount = useMemo(() => {
    if (!measureRef.current || containerWidth === 0) return FILTER_ITEMS.length;
    const children = Array.from(measureRef.current.children) as HTMLElement[];
    const totalWidth = children.reduce((sum, el) => sum + el.offsetWidth + GAP, 0);
    if (totalWidth <= containerWidth) return FILTER_ITEMS.length;
    let used = 0;
    let count = 0;
    for (const el of children) {
      if (used + el.offsetWidth + GAP + MORE_BTN_WIDTH > containerWidth) break;
      used += el.offsetWidth + GAP;
      count++;
    }
    return count;
  }, [containerWidth]);

  const visibleItems = FILTER_ITEMS.slice(0, visibleCount);
  const overflowItems = FILTER_ITEMS.slice(visibleCount);
  const hasOverflow = overflowItems.length > 0;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flex: 1,
        minWidth: 0,
        overflow: "hidden",
        px: 1,
        gap: `${GAP}px`,
      }}
    >
      {/* <Typography sx={{ fontSize: "14px", fontWeight: 600, whiteSpace: "nowrap", flexShrink: 0 }}>
        Bookings
      </Typography> */}

      {/* Hidden measurement div */}
      <Box
        ref={measureRef}
        aria-hidden="true"
        sx={{ position: "fixed", top: -9999, left: 0, visibility: "hidden", pointerEvents: "none", display: "flex", gap: `${GAP}px` }}
      >
        {FILTER_ITEMS.map(item => <MeasureItem key={item.label} item={item} />)}
      </Box>

      {/* Visible filter buttons */}
      <Box ref={containerRef} sx={{ display: "flex", flex: 1, alignItems: "center", gap: `${GAP}px`, overflow: "hidden" }}>
        {visibleItems.map(item =>
          item.type === "date"
            ? <DateFilter key={item.label} label={item.label} />
            : <DropdownFilter key={item.label} label={item.label} options={item.options} />
        )}
      </Box>

      {/* ⋮ overflow */}
      <Button
        size="small"
        variant="outlined"
        disableRipple
        onClick={(e) => hasOverflow && setAnchorEl(e.currentTarget)}
        sx={{ minWidth: 0, px: 0.5, height: "25px", flexShrink: 0, visibility: hasOverflow ? "visible" : "hidden", borderColor: "#D5D7DA", "&:hover": { borderColor: "#b0b3b8" } }}
      >
        <MoreVertIcon sx={{ fontSize: "16px" }} />
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)} slotProps={{ paper: { sx: { mt: 0.5, minWidth: 180 } } }}>
        {overflowItems.map(item => (
          <MenuItem key={item.label} onClick={() => setAnchorEl(null)} sx={{ fontSize: "13px" }}>
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default BookingsBar;
