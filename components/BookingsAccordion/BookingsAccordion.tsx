import { Box, Checkbox, Chip, Typography } from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CustomAccordion from "@/components/CustomAccordion";
import { Booking, BOOKINGS_DATA } from "@/app/utils/bookingsData";

const BookingHeader = ({ booking, checked, onToggle }: { booking: Booking; checked: boolean; onToggle: (id: string) => void }) => (
  <Box sx={{ display: "flex", alignItems: "center", width: "100%", gap: 1, overflow: "hidden" }}>
    <Checkbox
      size="small"
      sx={{ p: 0, flexShrink: 0 }}
      checked={checked}
      onChange={() => onToggle(booking.id)}
      onClick={(e) => e.stopPropagation()}
    />
    <Box sx={{ borderLeft: "3px solid #4caf50", pl: 1, flex: 1, minWidth: 0 }}>
      <Typography sx={{ fontSize: "13px", fontWeight: 400, lineHeight: 1.3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
        {booking.origin.country} - {booking.origin.postalCode} {booking.origin.city}
      </Typography>
      <Typography sx={{ fontSize: "13px", fontWeight: 600, lineHeight: 1.3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
        {booking.destination.country} - {booking.destination.postalCode} {booking.destination.city}
      </Typography>
    </Box>
    <Chip label={booking.bookingNumber} size="small" variant="outlined" sx={{ fontSize: "11px", height: 20, borderRadius: "4px", flexShrink: 0 }} />
  </Box>
);

const BookingBody = ({ booking }: { booking: Booking }) => (
  <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
    <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
      <Box sx={{ flex: 1 }}>
        <Typography variant="body2" sx={{ fontWeight: 400 }}>
          {booking.origin.country} - {booking.origin.postalCode} {booking.origin.city}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "12px" }}>
          {booking.origin.company} • {booking.origin.timeRange}
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 600, mt: 0.5 }}>
          {booking.destination.country} - {booking.destination.postalCode} {booking.destination.city}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "12px" }}>
          {booking.destination.company}
          {booking.destination.timeRange !== "-" && ` • ${booking.destination.timeRange}`}
        </Typography>
      </Box>
      <Box sx={{ textAlign: "right", flexShrink: 0 }}>
        <Typography sx={{ fontSize: "12px", color: "text.secondary" }}>
          {booking.pallets != null && `${booking.pallets} PLL`}
          {booking.weight && `  ${booking.weight}`}
          {booking.ldm && `  ${booking.ldm}`}
        </Typography>
        <Typography sx={{ fontWeight: 700, fontSize: "14px" }}>
          {booking.price} {booking.currency}
        </Typography>
      </Box>
    </Box>
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      {booking.hasWarning ? <WarningAmberIcon sx={{ fontSize: 16, color: "warning.main" }} /> : <Box />}
      <Chip label={booking.bookingNumber} size="small" variant="outlined" sx={{ fontSize: "11px", height: 20, borderRadius: "4px" }} />
    </Box>
  </Box>
);

interface BookingsAccordionProps {
  filterSuggestion?: boolean;
  checkedIds?: string[];
  onToggle?: (id: string) => void;
}

const BookingsAccordion = ({ filterSuggestion, checkedIds = [], onToggle = () => {} }: BookingsAccordionProps) => {
  const items = filterSuggestion
    ? BOOKINGS_DATA.filter((b) => b.isSuggestion)
    : BOOKINGS_DATA;

  return (
    <Box>
      {items.map((booking) => (
        <CustomAccordion
          key={booking.id}
          header={
            <BookingHeader
              booking={booking}
              checked={checkedIds.includes(booking.id)}
              onToggle={onToggle}
            />
          }
          body={<BookingBody booking={booking} />}
          accordionSx={{
            borderTopLeftRadius: "0px",
            borderTopRightRadius: "0px",
            "&.MuiAccordion-root": {
              borderTopLeftRadius: "0px",
              borderTopRightRadius: "0px",
            },
            border: "2px solid transparent",
            "&.Mui-expanded": {
              border: "2px solid blue",
              margin: "0px",
            },
          }}
        />
      ))}
    </Box>
  );
};

export default BookingsAccordion;
