export interface BookingLocation {
  country: string;
  postalCode: string;
  city: string;
  company: string;
  timeRange: string;
}

export interface Booking {
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

export const BOOKINGS_DATA: Booking[] = [
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
  {
    id: "15",
    origin: { country: "DK", postalCode: "8900", city: "Randers", company: "Randers Industri A/S", timeRange: "07:00 - 09:00" },
    destination: { country: "SE", postalCode: "11120", city: "Stockholm", company: "Stockholm Logistik AB", timeRange: "14:00 - 17:00" },
    pallets: 11, weight: "5.800,00 kg", ldm: "4,60 ldm", currency: "SEK", price: "5.100,00", bookingNumber: "1260003972", isSuggestion: true,
  },
  {
    id: "16",
    origin: { country: "FI", postalCode: "00100", city: "Helsinki", company: "Helsinki Freight Oy", timeRange: "06:00 - 08:00" },
    destination: { country: "DK", postalCode: "1050", city: "København", company: "Nordic Import A/S", timeRange: "12:00 - 15:00" },
    pallets: 8, weight: "3.600,00 kg", ldm: "3,20 ldm", currency: "EUR", price: "4.200,00", bookingNumber: "1260003985", isSuggestion: true,
  },
  {
    id: "17",
    origin: { country: "DE", postalCode: "80331", city: "München", company: "Bayern Transport GmbH", timeRange: "05:00 - 07:00" },
    destination: { country: "DK", postalCode: "6000", city: "Kolding", company: "Kolding Lager A/S", timeRange: "14:00 - 16:00" },
    pallets: 6, weight: "2.900,00 kg", ldm: "2,50 ldm", currency: "EUR", price: "3.400,00", bookingNumber: "1260003997", isSuggestion: true,
  },
  {
    id: "18",
    origin: { country: "DK", postalCode: "8800", city: "Viborg", company: "Viborg Spedition ApS", timeRange: "08:30 - 10:00" },
    destination: { country: "NO", postalCode: "5003", city: "Bergen", company: "Bergen Cargo AS", timeRange: "10:00 - 14:00" },
    pallets: 4, weight: "1.100,00 kg", currency: "NOK", price: "2.800,00", bookingNumber: "1260004010", isSuggestion: true,
  },
  {
    id: "19",
    origin: { country: "NL", postalCode: "1012", city: "Amsterdam", company: "Amsterdam Freight BV", timeRange: "04:00 - 06:00" },
    destination: { country: "DK", postalCode: "8000", city: "Aarhus", company: "Aarhus Import A/S", timeRange: "13:00 - 16:00" },
    pallets: 14, weight: "7.200,00 kg", ldm: "5,80 ldm", currency: "EUR", price: "3.900,00", bookingNumber: "1260004022", isSuggestion: true,
  },
  {
    id: "20",
    origin: { country: "DK", postalCode: "8600", city: "Silkeborg", company: "Silkeborg Papir A/S", timeRange: "09:00 - 10:30" },
    destination: { country: "DE", postalCode: "44135", city: "Dortmund", company: "Dortmund Lagerhaus GmbH", timeRange: "08:00 - 12:00" },
    pallets: 7, weight: "3.800,00 kg", ldm: "3,00 ldm", currency: "EUR", price: "2.200,00", bookingNumber: "1260004035", isSuggestion: true,
  },
  {
    id: "21",
    origin: { country: "BE", postalCode: "2000", city: "Antwerpen", company: "Antwerp Port Logistics NV", timeRange: "06:30 - 08:30" },
    destination: { country: "DK", postalCode: "5000", city: "Odense", company: "Odense Terminal A/S", timeRange: "14:00 - 17:00" },
    pallets: 9, weight: "4.500,00 kg", ldm: "3,70 ldm", currency: "EUR", price: "3.100,00", bookingNumber: "1260004048", isSuggestion: true,
  },
  {
    id: "22",
    origin: { country: "DK", postalCode: "7100", city: "Vejle", company: "Vejle Plast A/S", timeRange: "10:00 - 11:30" },
    destination: { country: "PL", postalCode: "00-001", city: "Warszawa", company: "Warszawa Dystrybucja Sp.", timeRange: "06:00 - 10:00" },
    pallets: 5, weight: "2.100,00 kg", currency: "PLN", price: "4.800,00", bookingNumber: "1260004061", isSuggestion: true,
  },
  {
    id: "23",
    origin: { country: "SE", postalCode: "21120", city: "Malmö", company: "Malmö Container AB", timeRange: "07:30 - 09:00" },
    destination: { country: "DK", postalCode: "6700", city: "Esbjerg", company: "Esbjerg Havn A/S", timeRange: "09:30 - 11:00" },
    pallets: 2, weight: "800,00 kg", currency: "DKK", price: "680,00", bookingNumber: "1260004073", isSuggestion: true,
  },
  {
    id: "24",
    origin: { country: "DK", postalCode: "4000", city: "Roskilde", company: "Roskilde Stål A/S", timeRange: "08:00 - 09:30" },
    destination: { country: "DE", postalCode: "60311", city: "Frankfurt am Main", company: "Frankfurt Spedition GmbH", timeRange: "10:00 - 14:00" },
    pallets: 13, weight: "6.900,00 kg", ldm: "5,40 ldm", currency: "EUR", price: "4.600,00", bookingNumber: "1260004086", isSuggestion: true,
  },
  {
    id: "25",
    origin: { country: "NO", postalCode: "4001", city: "Stavanger", company: "Stavanger Oil Logistics AS", timeRange: "06:00 - 08:00" },
    destination: { country: "DK", postalCode: "7000", city: "Fredericia", company: "Fredericia Terminal A/S", timeRange: "12:00 - 15:00" },
    pallets: 3, weight: "950,00 kg", currency: "DKK", price: "1.850,00", bookingNumber: "1260004099", isSuggestion: true,
  },
  {
    id: "26",
    origin: { country: "DK", postalCode: "9000", city: "Aalborg", company: "Aalborg Portland A/S", timeRange: "11:00 - 13:00" },
    destination: { country: "FI", postalCode: "20100", city: "Turku", company: "Turku Satamalogistiikka Oy", timeRange: "08:00 - 12:00" },
    pallets: 16, weight: "9.200,00 kg", ldm: "6,80 ldm", currency: "EUR", price: "5.500,00", bookingNumber: "1260004112", isSuggestion: true,
  },
  {
    id: "27",
    origin: { country: "FR", postalCode: "75001", city: "Paris", company: "Paris Logistique SA", timeRange: "03:00 - 05:00" },
    destination: { country: "DK", postalCode: "1050", city: "København", company: "CPH Import A/S", timeRange: "13:00 - 16:00" },
    pallets: 10, weight: "4.800,00 kg", ldm: "4,00 ldm", currency: "EUR", price: "5.200,00", bookingNumber: "1260004125", isSuggestion: true,
  },
  {
    id: "28",
    origin: { country: "DK", postalCode: "7500", city: "Holstebro", company: "Holstebro Kød A/S", timeRange: "04:00 - 05:30" },
    destination: { country: "NL", postalCode: "3011", city: "Rotterdam", company: "Rotterdam Cold Chain BV", timeRange: "10:00 - 14:00" },
    pallets: 20, weight: "11.500,00 kg", ldm: "8,00 ldm", currency: "EUR", price: "6.300,00", bookingNumber: "1260004138", isSuggestion: true,
  },
  {
    id: "29",
    origin: { country: "DE", postalCode: "01067", city: "Dresden", company: "Dresdner Logistik GmbH", timeRange: "07:00 - 09:00" },
    destination: { country: "DK", postalCode: "6000", city: "Kolding", company: "Kolding Distribution ApS", timeRange: "14:00 - 17:00" },
    pallets: 5, weight: "2.400,00 kg", currency: "DKK", price: "3.100,00", bookingNumber: "1260004150", isSuggestion: true,
  },
  {
    id: "30",
    origin: { country: "DK", postalCode: "4100", city: "Ringsted", company: "Ringsted Mejeri A/S", timeRange: "05:00 - 06:30" },
    destination: { country: "SE", postalCode: "41104", city: "Göteborg", company: "Göteborgs Distribution AB", timeRange: "09:00 - 11:00" },
    pallets: 8, weight: "3.200,00 kg", ldm: "3,20 ldm", currency: "SEK", price: "3.700,00", bookingNumber: "1260004163", isSuggestion: true,
  },
  {
    id: "31",
    origin: { country: "PL", postalCode: "80-001", city: "Gdańsk", company: "Gdańsk Morski Sp.", timeRange: "05:00 - 07:00" },
    destination: { country: "DK", postalCode: "8000", city: "Aarhus", company: "Aarhus Havn Lager A/S", timeRange: "13:00 - 16:00" },
    pallets: 12, weight: "6.100,00 kg", ldm: "4,90 ldm", currency: "EUR", price: "3.600,00", bookingNumber: "1260004176", isSuggestion: true,
  },
  {
    id: "32",
    origin: { country: "DK", postalCode: "6100", city: "Haderslev", company: "Haderslev Stål ApS", timeRange: "10:00 - 11:30" },
    destination: { country: "DE", postalCode: "23552", city: "Lübeck", company: "Lübeck Hafen GmbH", timeRange: "13:00 - 15:00" },
    pallets: 6, weight: "2.700,00 kg", ldm: "2,40 ldm", currency: "EUR", price: "1.450,00", bookingNumber: "1260004189", isSuggestion: true,
  },
  {
    id: "33",
    origin: { country: "SE", postalCode: "25221", city: "Helsingborg", company: "Helsingborg Cargo AB", timeRange: "08:00 - 09:30" },
    destination: { country: "DK", postalCode: "5000", city: "Odense", company: "Odense Lager A/S", timeRange: "10:00 - 12:00" },
    pallets: 3, weight: "720,00 kg", currency: "DKK", price: "540,00", bookingNumber: "1260004201", isSuggestion: true,
  },
  {
    id: "34",
    origin: { country: "DK", postalCode: "7000", city: "Fredericia", company: "Fredericia Olie A/S", timeRange: "06:00 - 07:30" },
    destination: { country: "NO", postalCode: "7010", city: "Trondheim", company: "Trondheim Distribusjon AS", timeRange: "10:00 - 14:00" },
    pallets: 7, weight: "3.500,00 kg", ldm: "2,80 ldm", currency: "NOK", price: "4.100,00", bookingNumber: "1260004214", isSuggestion: true,
  },
  {
    id: "35",
    origin: { country: "NL", postalCode: "5600", city: "Eindhoven", company: "Eindhoven Tech Freight BV", timeRange: "07:00 - 09:00" },
    destination: { country: "DK", postalCode: "2100", city: "København Ø", company: "CPH Tech Import ApS", timeRange: "14:00 - 17:00" },
    pallets: 4, weight: "1.300,00 kg", currency: "EUR", price: "2.900,00", bookingNumber: "1260004227", isSuggestion: true,
  },
  {
    id: "36",
    origin: { country: "DK", postalCode: "8500", city: "Grenaa", company: "Grenaa Havn A/S", timeRange: "09:30 - 11:00" },
    destination: { country: "SE", postalCode: "11120", city: "Stockholm", company: "Stockholm Port Services AB", timeRange: "16:00 - 19:00" },
    pallets: 9, weight: "4.100,00 kg", ldm: "3,60 ldm", currency: "SEK", price: "4.400,00", bookingNumber: "1260004240", isSuggestion: true,
  },
  {
    id: "37",
    origin: { country: "DE", postalCode: "24937", city: "Flensburg", company: "Flensburger Spedition GmbH", timeRange: "11:00 - 12:30" },
    destination: { country: "DK", postalCode: "5000", city: "Odense", company: "Odense Fragtterminal A/S", timeRange: "13:30 - 15:30" },
    pallets: 5, weight: "2.200,00 kg", ldm: "2,00 ldm", currency: "DKK", price: "1.100,00", bookingNumber: "1260004253", isSuggestion: true,
  },
  {
    id: "38",
    origin: { country: "DK", postalCode: "4800", city: "Nykøbing F", company: "Nykøbing Sukker A/S", timeRange: "07:30 - 09:00" },
    destination: { country: "PL", postalCode: "70-001", city: "Szczecin", company: "Szczecin Logistyka Sp.", timeRange: "08:00 - 12:00" },
    pallets: 18, weight: "10.200,00 kg", ldm: "7,20 ldm", currency: "PLN", price: "8.900,00", bookingNumber: "1260004266", isSuggestion: true,
  },
  {
    id: "39",
    origin: { country: "BE", postalCode: "1000", city: "Brussel", company: "Brussels Euro Freight NV", timeRange: "05:30 - 07:30" },
    destination: { country: "DK", postalCode: "8000", city: "Aarhus", company: "Aarhus Euro Import A/S", timeRange: "14:00 - 17:00" },
    pallets: 11, weight: "5.400,00 kg", ldm: "4,40 ldm", currency: "EUR", price: "4.700,00", bookingNumber: "1260004279", isSuggestion: true,
  },
  {
    id: "40",
    origin: { country: "DK", postalCode: "7430", city: "Ikast", company: "Ikast Tekstil A/S", timeRange: "10:00 - 11:00" },
    destination: { country: "DK", postalCode: "8800", city: "Viborg", company: "Viborg Lager ApS", timeRange: "12:30 - 13:30" },
    pallets: 2, weight: "480,00 kg", currency: "DKK", price: "320,00", bookingNumber: "1260004292",
  },
];
