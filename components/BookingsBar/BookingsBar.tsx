"use client";

import { useRef, useState, useMemo } from "react";
import { Box, Button, Divider, Menu, MenuItem, Typography } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import useResizeObserver from "use-resize-observer";
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

const GAP = 4;
const MORE_BTN_WIDTH = 32 + GAP; // bordered icon button + gap

const BookingsBar = () => {
  const measureRef = useRef<HTMLDivElement>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { ref: containerRef, width: containerWidth = 0 } = useResizeObserver<HTMLDivElement>();

  const visibleCount = useMemo(() => {
    if (!measureRef.current || containerWidth === 0) return FILTER_LABELS.length;

    const children = Array.from(measureRef.current.children) as HTMLElement[];
    let used = 0;
    let count = 0;

    for (let i = 0; i < children.length; i++) {
      const btnWidth = children[i].offsetWidth + GAP;
      const hasMore = i < children.length - 1;
      if (used + btnWidth + (hasMore ? MORE_BTN_WIDTH : 0) > containerWidth) break;
      used += btnWidth;
      count++;
    }

    return count;
  }, [containerWidth]);

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
        gap: 1,
      }}
    >
      <Typography sx={{ fontSize: "14px", fontWeight: 600, whiteSpace: "nowrap", flexShrink: 0 }}>
        Bookings
      </Typography>

      <Divider orientation="vertical" flexItem sx={{ my: "auto", height: "20px" }} />

      {/* Invisible measurement div — renders all buttons to get their natural widths */}
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

      {/* Visible buttons — container width is observed by use-resize-observer */}
      <Box
        ref={containerRef}
        sx={{ display: "flex", flex: 1, alignItems: "center", gap: `${GAP}px`, overflow: "hidden" }}
      >
        {visibleLabels.map(label => (
          <CustomButton key={label} label={label} />
        ))}
      </Box>

      {/* Overflow ⋮ — styled to match CustomButton (outlined, same height) */}
      {overflowLabels.length > 0 && (
        <>
          <Button
            size="small"
            variant="outlined"
            disableRipple
            onClick={(e) => setAnchorEl(e.currentTarget)}
            sx={{ minWidth: 0, px: 0.5, height: "28px", flexShrink: 0 }}
          >
            <MoreVertIcon sx={{ fontSize: "16px" }} />
          </Button>
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
