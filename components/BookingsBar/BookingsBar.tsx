"use client";

import { useRef, useState, useEffect } from "react";
import { Box, Divider, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CustomButton from "@/components/CustomButton";

const FILTER_LABELS = [
  "My Trips",
  "Pickup Date",
  "Delivery Date",
  "Type",
  "Status",
  "Customer",
  "Region",
];

const MORE_BTN_WIDTH = 36 + 8; // icon button + gap
const GAP = 4;

const BookingsBar = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(FILTER_LABELS.length);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const measure = measureRef.current;
    if (!container || !measure) return;

    const recalc = () => {
      const available = container.offsetWidth;
      const children = Array.from(measure.children) as HTMLElement[];
      let used = 0;
      let count = 0;

      for (let i = 0; i < children.length; i++) {
        const btnWidth = children[i].offsetWidth + GAP;
        const remainingItems = children.length - i - 1;
        const spaceNeeded = used + btnWidth + (remainingItems > 0 ? MORE_BTN_WIDTH : 0);

        if (spaceNeeded > available) break;
        used += btnWidth;
        count++;
      }

      setVisibleCount(count);
    };

    const ro = new ResizeObserver(recalc);
    ro.observe(container);
    recalc();
    return () => ro.disconnect();
  }, []);

  const visibleLabels = FILTER_LABELS.slice(0, visibleCount);
  const overflowLabels = FILTER_LABELS.slice(visibleCount);

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
        gap: 0.5,
      }}
    >
      <Typography sx={{ fontSize: "14px", fontWeight: 600, whiteSpace: "nowrap", mr: 0.5, flexShrink: 0 }}>
        Bookings
      </Typography>

      <Divider orientation="vertical" flexItem sx={{ my: "auto", height: "20px" }} />

      {/* Hidden div — all buttons rendered here to measure their natural widths */}
      <Box
        ref={measureRef}
        aria-hidden="true"
        sx={{
          position: "absolute",
          visibility: "hidden",
          pointerEvents: "none",
          display: "flex",
          gap: `${GAP}px`,
        }}
      >
        {FILTER_LABELS.map(label => (
          <CustomButton key={label} label={label} />
        ))}
      </Box>

      {/* Visible buttons container — observed for width changes */}
      <Box
        ref={containerRef}
        sx={{ display: "flex", flex: 1, alignItems: "center", gap: `${GAP}px`, overflow: "hidden" }}
      >
        {visibleLabels.map(label => (
          <CustomButton key={label} label={label} />
        ))}
      </Box>

      {/* Overflow ⋮ button */}
      {overflowLabels.length > 0 && (
        <>
          <Divider orientation="vertical" flexItem sx={{ my: "auto", height: "20px" }} />
          <IconButton
            size="small"
            onClick={(e) => setAnchorEl(e.currentTarget)}
            sx={{ flexShrink: 0 }}
          >
            <MoreVertIcon sx={{ fontSize: "18px" }} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            slotProps={{ paper: { sx: { mt: 0.5, minWidth: 160 } } }}
          >
            {overflowLabels.map(label => (
              <MenuItem key={label} onClick={() => setAnchorEl(null)} sx={{ fontSize: "13px" }}>
                {label}
              </MenuItem>
            ))}
          </Menu>
        </>
      )}
    </Box>
  );
};

export default BookingsBar;
