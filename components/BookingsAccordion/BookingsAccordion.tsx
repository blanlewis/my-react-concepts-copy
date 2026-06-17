import { Box, Checkbox, Typography } from "@mui/material";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { Booking, BOOKINGS_DATA } from "@/app/utils/bookingsData";

// ── Column definitions ─────────────────────────────────────────────────────────

const COLUMNS: { key: string; label: string; width: number }[] = [
  { key: "bookingNo",       label: "BOOKING NO.",      width: 130 },
  { key: "collection",      label: "COLLECTION",       width: 110 },
  { key: "delivery",        label: "DELIVERY",         width: 110 },
  { key: "pickupAddress",   label: "PICKUP ADDRESS",   width: 160 },
  { key: "deliveryAddress", label: "DELIVERY ADDRESS", width: 160 },
  { key: "weight",          label: "WEIGHT",           width: 90  },
  { key: "packs",           label: "PACKS",            width: 70  },
  { key: "type",            label: "TYPE",             width: 80  },
  { key: "contents",        label: "CONTENTS",         width: 110 },
  { key: "cbm",             label: "CBM",              width: 70  },
  { key: "ldm",             label: "LDM",              width: 70  },
  { key: "dimensions",      label: "L × W × H",        width: 100 },
  { key: "income",          label: "INCOME",           width: 90  },
  { key: "collRemark",      label: "COLL. REMARK",     width: 130 },
  { key: "delRemark",       label: "DEL. REMARK",      width: 130 },
  { key: "lift",            label: "LIFT",             width: 60  },
  { key: "temperature",     label: "TEMPERATURE",      width: 110 },
  { key: "departure",       label: "DEPARTURE",        width: 90  },
  { key: "orderType",       label: "ORDER TYPE",       width: 100 },
  { key: "ordererName",     label: "ORDERER NAME",     width: 140 },
];

// ── Cell ──────────────────────────────────────────────────────────────────────

const Cell = ({ value, width, primary }: { value: string; width: number; primary?: boolean }) => (
  <Box sx={{ minWidth: width, maxWidth: width, px: 1, overflow: "hidden", flexShrink: 0 }}>
    <Typography sx={{ fontSize: "12px", fontWeight: primary ? 600 : 400, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", color: primary ? "primary.main" : "inherit" }}>
      {value || "—"}
    </Typography>
  </Box>
);

// ── Row data mapper ───────────────────────────────────────────────────────────

const toRowData = (b: Booking): Record<string, string> => ({
  bookingNo:       b.bookingNumber,
  collection:      b.origin.timeRange,
  delivery:        b.destination.timeRange,
  pickupAddress:   `${b.origin.country} - ${b.origin.postalCode} ${b.origin.city}`,
  deliveryAddress: `${b.destination.country} - ${b.destination.postalCode} ${b.destination.city}`,
  weight:          b.weight ?? "—",
  packs:           b.pallets != null ? `${b.pallets} PLL` : "—",
  type:            "EXPORT",
  contents:        "—",
  cbm:             "0,00",
  ldm:             b.ldm ?? "—",
  dimensions:      "—",
  income:          `${b.price} ${b.currency}`,
  collRemark:      "—",
  delRemark:       "—",
  lift:            "—",
  temperature:     "—",
  departure:       "—",
  orderType:       "—",
  ordererName:     "—",
});

// ── BookingsAccordion (now a flat table) ──────────────────────────────────────

interface BookingsAccordionProps {
  filterSuggestion?: boolean;
  checkedIds?: string[];
  excludedIds?: string[];
  onToggle?: (id: string) => void;
}

const BookingsAccordion = ({
  filterSuggestion,
  checkedIds = [],
  excludedIds = [],
  onToggle = () => {},
}: BookingsAccordionProps) => {
  const items = (filterSuggestion ? BOOKINGS_DATA.filter(b => b.isSuggestion) : BOOKINGS_DATA)
    .filter(b => !excludedIds.includes(b.id));

  return (
    <Box sx={{ width: "100%", overflowX: "auto" }}>
      {/* Sticky header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          height: "36px",
          bgcolor: "background.paper",
          borderBottom: "2px solid",
          borderColor: "divider",
          position: "sticky",
          top: 0,
          zIndex: 1,
          minWidth: "max-content",
        }}
      >
        <Box sx={{ width: 40, flexShrink: 0 }} />
        {COLUMNS.map(col => (
          <Box
            key={col.key}
            sx={{ minWidth: col.width, maxWidth: col.width, px: 1, display: "flex", alignItems: "center", gap: 0.25, flexShrink: 0, cursor: "pointer", userSelect: "none" }}
          >
            <Typography sx={{ fontSize: "11px", fontWeight: 600, whiteSpace: "nowrap", color: "text.secondary", letterSpacing: "0.02em" }}>
              {col.label}
            </Typography>
            <UnfoldMoreIcon sx={{ fontSize: "13px", color: "text.disabled" }} />
          </Box>
        ))}
      </Box>

      {/* Data rows */}
      {items.map(booking => {
        const row = toRowData(booking);
        return (
          <Box
            key={booking.id}
            sx={{
              display: "flex",
              alignItems: "center",
              height: "36px",
              borderBottom: "1px solid",
              borderColor: "divider",
              minWidth: "max-content",
              "&:hover": { bgcolor: "action.hover" },
            }}
          >
            {/* Checkbox + warning */}
            <Box sx={{ width: 40, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 0.25 }}>
              {booking.hasWarning
                ? <WarningAmberIcon sx={{ fontSize: "14px", color: "warning.main" }} />
                : <Checkbox
                    size="small"
                    sx={{ p: 0 }}
                    checked={checkedIds.includes(booking.id)}
                    onChange={() => onToggle(booking.id)}
                    onClick={e => e.stopPropagation()}
                  />
              }
            </Box>

            {COLUMNS.map(col => (
              <Cell key={col.key} value={row[col.key]} width={col.width} primary={col.key === "bookingNo"} />
            ))}
          </Box>
        );
      })}
    </Box>
  );
};

export default BookingsAccordion;
