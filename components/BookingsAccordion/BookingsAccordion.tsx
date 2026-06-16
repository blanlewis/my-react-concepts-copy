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
  {
    id: "6",
    origin: { country: "DK", postalCode: "8700", city: "Horsens", company: "Horsens Industri A/S", timeRange: "06:00 - 08:00" },
    destination: { country: "DE", postalCode: "20095", city: "Hamburg", company: "Hamburg Hafen GmbH", timeRange: "14:00 - 18:00" },
    pallets: 8, weight: "4.200,00 kg", ldm: "3,50 ldm", currency: "EUR", price: "1.850,00", bookingNumber: "1260003867",
  },
  {
    id: "7",
    origin: { country: "DK", postalCode: "5000", city: "Odense", company: "Odense Stålskibsværft", timeRange: "10:00 - 11:30" },
    destination: { country: "NO", postalCode: "0150", city: "Oslo", company: "Oslo Distribusjon AS", timeRange: "08:00 - 12:00" },
    pallets: 6, weight: "2.800,00 kg", currency: "NOK", price: "3.200,00", bookingNumber: "1260003878", isSuggestion: true,
  },
  {
    id: "8",
    origin: { country: "DE", postalCode: "10115", city: "Berlin", company: "Berlin Express GmbH", timeRange: "05:30 - 07:00" },
    destination: { country: "DK", postalCode: "1050", city: "København", company: "CPH Freight A/S", timeRange: "13:00 - 15:00" },
    pallets: 4, weight: "900,00 kg", currency: "DKK", price: "2.100,00", bookingNumber: "1260003891", hasWarning: true,
  },
  {
    id: "9",
    origin: { country: "DK", postalCode: "8000", city: "Aarhus", company: "Aarhus Havn A/S", timeRange: "08:00 - 09:30" },
    destination: { country: "PL", postalCode: "80-001", city: "Gdańsk", company: "Gdańsk Logistik Sp.", timeRange: "06:00 - 10:00" },
    pallets: 12, weight: "6.500,00 kg", ldm: "5,00 ldm", currency: "EUR", price: "2.750,00", bookingNumber: "1260003902", isSuggestion: true,
  },
  {
    id: "10",
    origin: { country: "DK", postalCode: "3000", city: "Helsingør", company: "Scandlines Cargo", timeRange: "07:00 - 08:00" },
    destination: { country: "SE", postalCode: "25221", city: "Helsingborg", company: "Helsingborg Terminal AB", timeRange: "07:45 - 09:00" },
    pallets: 2, weight: "500,00 kg", currency: "SEK", price: "320,00", bookingNumber: "1260003915",
  },
  {
    id: "11",
    origin: { country: "DK", postalCode: "6400", city: "Sønderborg", company: "SB Logistics ApS", timeRange: "11:00 - 12:00" },
    destination: { country: "DE", postalCode: "24103", city: "Kiel", company: "Kiel Spedition GmbH", timeRange: "14:00 - 16:00" },
    pallets: 7, weight: "3.300,00 kg", ldm: "2,80 ldm", currency: "EUR", price: "980,00", bookingNumber: "1260003927", hasWarning: true,
  },
  {
    id: "12",
    origin: { country: "SE", postalCode: "41104", city: "Göteborg", company: "Göteborgs Hamn AB", timeRange: "06:00 - 08:00" },
    destination: { country: "DK", postalCode: "9900", city: "Frederikshavn", company: "Frederikshavn Havn", timeRange: "10:00 - 12:00" },
    pallets: 15, weight: "8.000,00 kg", ldm: "6,00 ldm", currency: "DKK", price: "4.500,00", bookingNumber: "1260003938", isSuggestion: true,
  },
  {
    id: "13",
    origin: { country: "DK", postalCode: "7400", city: "Herning", company: "Herning Textil A/S", timeRange: "09:00 - 10:00" },
    destination: { country: "NL", postalCode: "3011", city: "Rotterdam", company: "Rotterdam Port Services BV", timeRange: "07:00 - 11:00" },
    pallets: 9, weight: "5.100,00 kg", ldm: "4,20 ldm", currency: "EUR", price: "3.150,00", bookingNumber: "1260003949",
  },
  {
    id: "14",
    origin: { country: "DK", postalCode: "4700", city: "Næstved", company: "Næstved Transport ApS", timeRange: "13:00 - 14:00" },
    destination: { country: "DK", postalCode: "2100", city: "København Ø", company: "CPH East Distribution", timeRange: "15:30 - 17:00" },
    pallets: 3, weight: "650,00 kg", currency: "DKK", price: "450,00", bookingNumber: "1260003961",
  },
];

const BookingHeader = ({ booking }: { booking: Booking }) => (
  <Box sx={{ display: "flex", alignItems: "center", width: "100%", gap: 1, overflow: "hidden" }}>
    <Checkbox size="small" sx={{ p: 0, flexShrink: 0 }} onClick={(e) => e.stopPropagation()} />
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
