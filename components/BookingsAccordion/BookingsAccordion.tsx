import { Box, Checkbox, Chip, Typography } from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CustomAccordion from "@/components/CustomAccordion";

interface BookingLocation {
  country: string;
  postalCode: string;
  city: string;
  company: string;
  timeRange: string;
}

interface Booking {
  id: string;
  origin: BookingLocation;
  destination: BookingLocation;
  pallets?: number;
  weight?: string;
  ldm?: string;
  currency: string;
  price: string;
  bookingNumber: string;
  hasWarning?: boolean;
  isSuggestion?: boolean;
}

const BOOKINGS_DATA: Booking[] = [
  {
    id: "1",
    origin: { country: "DK", postalCode: "6000", city: "Kolding", company: "Sydjysk møbelfabrik", timeRange: "09:00 - 10:00" },
    destination: { country: "DE", postalCode: "28219", city: "Bremen", company: "Bauhaus - Bremen, test rel. 7", timeRange: "08:00 - 12:00" },
    pallets: 1, weight: "1.000,00 kg", currency: "DKK", price: "598,00", bookingNumber: "1260003823",
  },
  {
    id: "2",
    origin: { country: "DK", postalCode: "6700", city: "Esbjerg", company: "Pilkinton", timeRange: "02:00 - 02:00" },
    destination: { country: "DK", postalCode: "5800", city: "Nyborg", company: "Kens Lager", timeRange: "-" },
    pallets: 2, weight: "12,00 kg", currency: "DKK", price: "0,00", bookingNumber: "1260003819",
  },
  {
    id: "3",
    origin: { country: "DK", postalCode: "6600", city: "Vejen", company: "Magic Transport", timeRange: "09:00 - 17:30" },
    destination: { country: "DK", postalCode: "6000", city: "Kolding", company: "Peter Petersen", timeRange: "02:00 - 17:00" },
    pallets: 5, weight: "1.500,00 kg", ldm: "2,00 ldm", currency: "EUR", price: "0,00", bookingNumber: "1260003744", hasWarning: true,
  },
  {
    id: "4",
    origin: { country: "DK", postalCode: "7700", city: "THISTED", company: "ANKTE THISTED", timeRange: "11:00 - 13:00" },
    destination: { country: "DK", postalCode: "8000", city: "Aarhus", company: "Aarhus Depot", timeRange: "14:00 - 16:00" },
    pallets: 10, weight: "10.000,00 kg", ldm: "4,00 ldm", currency: "DKK", price: "1.200,00", bookingNumber: "1260003801", isSuggestion: true,
  },
  {
    id: "5",
    origin: { country: "DK", postalCode: "9000", city: "Aalborg", company: "Nord Logistics", timeRange: "07:00 - 09:00" },
    destination: { country: "SE", postalCode: "21120", city: "Malmö", company: "Malmö Freight", timeRange: "13:00 - 15:00" },
    pallets: 3, weight: "750,00 kg", currency: "SEK", price: "2.400,00", bookingNumber: "1260003855", isSuggestion: true,
  },
];

const LocationRow = ({ location, isOrigin }: { location: BookingLocation; isOrigin: boolean }) => (
  <Box>
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <Typography sx={{ fontWeight: isOrigin ? 400 : 600, fontSize: "14px" }}>
        {location.country} - {location.postalCode} {location.city}
      </Typography>
    </Box>
    <Typography sx={{ fontSize: "12px", color: "text.secondary" }}>
      {location.company}
      {location.timeRange !== "-" && (
        <Box component="span" sx={{ mx: 0.5, color: "text.disabled" }}>•</Box>
      )}
      {location.timeRange !== "-" ? location.timeRange : ""}
    </Typography>
  </Box>
);

const BookingHeader = ({ booking }: { booking: Booking }) => (
  <Box sx={{ display: "flex", width: "100%", gap: 1, alignItems: "flex-start" }}>
    <Checkbox size="small" sx={{ mt: -0.5, ml: -1 }} onClick={(e) => e.stopPropagation()} />
    <Box sx={{ borderLeft: "3px solid #4caf50", pl: 1, flex: 1, minWidth: 0 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 1 }}>
        <LocationRow location={booking.origin} isOrigin />
        <Typography sx={{ fontSize: "12px", color: "text.secondary", whiteSpace: "nowrap" }}>
          {booking.pallets != null && `${booking.pallets} PLL`}
          {booking.weight && `  ${booking.weight}`}
          {booking.ldm && `  ${booking.ldm}`}
          {"  -"}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", mt: 0.5 }}>
        <LocationRow location={booking.destination} isOrigin={false} />
        <Typography sx={{ fontWeight: 700, fontSize: "14px", whiteSpace: "nowrap" }}>
          {booking.price} {booking.currency}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 0.5 }}>
        {booking.hasWarning ? <WarningAmberIcon sx={{ fontSize: 16, color: "warning.main" }} /> : <Box />}
        <Chip label={booking.bookingNumber} size="small" variant="outlined" sx={{ fontSize: "11px", height: 20, borderRadius: "4px" }} />
      </Box>
    </Box>
  </Box>
);

const BookingBody = ({ booking }: { booking: Booking }) => (
  <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
    <Typography variant="body2"><b>From:</b> {booking.origin.country}-{booking.origin.postalCode} {booking.origin.city} — {booking.origin.company}</Typography>
    <Typography variant="body2"><b>To:</b> {booking.destination.country}-{booking.destination.postalCode} {booking.destination.city} — {booking.destination.company}</Typography>
    {booking.pallets != null && <Typography variant="body2"><b>Pallets:</b> {booking.pallets}</Typography>}
    {booking.weight && <Typography variant="body2"><b>Weight:</b> {booking.weight}</Typography>}
    {booking.ldm && <Typography variant="body2"><b>LDM:</b> {booking.ldm}</Typography>}
    <Typography variant="body2"><b>Price:</b> {booking.price} {booking.currency}</Typography>
  </Box>
);

interface BookingsAccordionProps {
  filterSuggestion?: boolean;
}

const BookingsAccordion = ({ filterSuggestion }: BookingsAccordionProps) => {
  const items = filterSuggestion
    ? BOOKINGS_DATA.filter((b) => b.isSuggestion)
    : BOOKINGS_DATA;

  return (
    <Box>
      {items.map((booking) => (
        <CustomAccordion
          key={booking.id}
          header={<BookingHeader booking={booking} />}
          body={<BookingBody booking={booking} />}
        />
      ))}
    </Box>
  );
};

export default BookingsAccordion;
