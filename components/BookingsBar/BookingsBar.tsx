"use client";

import { useRef, useState, useMemo, MouseEvent } from "react";
import { Box, Button, Divider, Menu, MenuItem, Typography } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import useResizeObserver from "use-resize-observer";

// ── Filter item types ──────────────────────────────────────────────────────────

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

// ── Sub-components ─────────────────────────────────────────────────────────────

const BTN_SX = {
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

const DateFilter = ({ label }: { label: string }) => (
  <Button
    size="small"
    variant="outlined"
    startIcon={<CalendarTodayIcon sx={{ fontSize: "14px !important" }} />}
    sx={{ ...BTN_SX, color: "text.secondary", gap: 0 }}
  >
    <Typography component="span" sx={{ fontWeight: 600, fontSize: "12px", color: "text.primary", mr: 0.5 }}>
      {label}
    </Typography>
    Select dates
  </Button>
);

const DropdownFilter = ({ label, options }: { label: string; options: string[] }) => {
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
        sx={{ ...BTN_SX, fontWeight: selected ? 600 : 400, color: selected ? "primary.main" : "text.primary" }}
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

// ── Measure element (lightweight, no state) ────────────────────────────────────

const MeasureItem = ({ item }: { item: FilterItem }) => (
  <Box
    sx={{
      display: "inline-flex",
      alignItems: "center",
      fontSize: "12px",
      px: 1,
      height: "25px",
      whiteSpace: "nowrap",
      gap: 0.5,
    }}
  >
    {item.type === "date" && <CalendarTodayIcon sx={{ fontSize: "14px" }} />}
    {item.label}
    {item.type === "date" && <Typography component="span" sx={{ fontSize: "12px", ml: 0.5 }}>Select dates</Typography>}
    {item.type === "dropdown" && <KeyboardArrowDownIcon sx={{ fontSize: "16px" }} />}
  </Box>
);

const GAP = 4;
const MORE_BTN_WIDTH = 36;

// ── BookingsBar ────────────────────────────────────────────────────────────────

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
        width: "100%",
        height: "48px",
        flexShrink: 0,
        borderBottom: "1px solid",
        borderColor: "divider",
        px: 1,
        gap: `${GAP}px`,
      }}
    >
      <Typography sx={{ fontSize: "14px", fontWeight: 600, whiteSpace: "nowrap", flexShrink: 0 }}>
        Bookings
      </Typography>

      <Divider orientation="vertical" flexItem sx={{ my: "auto", height: "20px" }} />

      {/* Hidden measurement div — static items so no stale-DOM issue */}
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

      {/* ⋮ overflow — always rendered for stable width */}
      <Button
        size="small"
        variant="outlined"
        disableRipple
        onClick={(e) => hasOverflow && setAnchorEl(e.currentTarget)}
        sx={{ minWidth: 0, px: 0.5, height: "25px", flexShrink: 0, visibility: hasOverflow ? "visible" : "hidden", borderColor: "#D5D7DA", "&:hover": { borderColor: "#b0b3b8" } }}
      >
        <MoreVertIcon sx={{ fontSize: "16px" }} />
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        slotProps={{ paper: { sx: { mt: 0.5, minWidth: 180 } } }}
      >
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
