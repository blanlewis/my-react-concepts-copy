export interface DossierBookingRow {
  type: "booking";
  location: string;
  company: string;
  date: string;
  etd: string;
  unitType: string;
  goodType: string;
  lcKg: string;
  ldm: string;
  economy: string;
  isNegative?: boolean;
}

export interface DossierViaRow {
  type: "via";
  location: string;
}

export type DossierRow = DossierBookingRow | DossierViaRow;

export interface DossierPanelContent {
  dossierNumber: string;
  origin: string;
  originDate: string;
  destination: string;
  destinationDate: string;
  totalKg: string;
  totalLdm: string;
  totalPrice: string;
  isPriceNegative: boolean;
  rows: DossierRow[];
  expenses: string;
}

const b = (
  location: string, company: string, date: string, etd: string,
  unitType: string, goodType: string, lcKg: string, ldm: string,
  economy: string, isNegative?: boolean,
): DossierBookingRow => ({ type: "booking", location, company, date, etd, unitType, goodType, lcKg, ldm, economy, isNegative });

const via = (location: string): DossierViaRow => ({ type: "via", location });

export const DOSSIER_PANEL_CONTENT: Record<string, DossierPanelContent> = {
  "dossier-2": {
    dossierNumber: "#26E11065140",
    origin: "DK - 6000 KOLDING",      originDate: "11 Jun",
    destination: "DK - 5800 NYBORG",  destinationDate: "22 Jun",
    totalKg: "1.012,00 kg", totalLdm: "0,00 ldm", totalPrice: "598,00 DKK", isPriceNegative: false,
    rows: [
      b("DK - 6000 KOLDING", "Sydjysk møbelfabrik",  "11 Jun", "--:--", "1 PLL",  "", "1.000,00", "--",    "598,00 DKK"),
      via("ESBJERG"),
      b("DK - 6700 ESBJERG", "Pilkinton",             "02 Jun", "--:--", "2 PLL",  "", "12,00",    "--",    "0,00 DKK"),
      b("DK - 5800 NYBORG",  "Kens Lager",            "22 Jun", "--:--", "-2 PLL", "", "-12,00",   "--",    "0,00 DKK",  true),
    ],
    expenses: "598,00 DKK",
  },
  "dossier-3": {
    dossierNumber: "#26E11065152",
    origin: "DK - 6600 VEJEN",         originDate: "14 Jun",
    destination: "DE - 20095 HAMBURG", destinationDate: "22 Jun",
    totalKg: "5.700,00 kg", totalLdm: "2,00 ldm", totalPrice: "1.850,00 EUR", isPriceNegative: false,
    rows: [
      b("DK - 6600 VEJEN",     "Magic Transport",      "14 Jun", "--:--", "5 PLL",  "", "1.500,00",  "2,00",  "0,00 EUR"),
      via("KOLDING"),
      b("DK - 8700 HORSENS",   "Horsens Industri A/S", "06 Jun", "--:--", "8 PLL",  "", "4.200,00",  "3,50",  "1.850,00 EUR"),
      b("DE - 20095 HAMBURG",  "Hamburg Hafen GmbH",   "22 Jun", "--:--", "-8 PLL", "", "-4.200,00", "-3,50", "0,00 EUR",  true),
    ],
    expenses: "1.850,00 EUR",
  },
  "dossier-4": {
    dossierNumber: "#26E11065163",
    origin: "DE - 10115 BERLIN",   originDate: "08 Jun",
    destination: "DE - 24103 KIEL", destinationDate: "16 Jun",
    totalKg: "4.200,00 kg", totalLdm: "2,80 ldm", totalPrice: "-3.080,00 EUR", isPriceNegative: true,
    rows: [
      b("DE - 10115 BERLIN",     "Berlin Express GmbH",  "08 Jun", "--:--", "4 PLL",  "", "900,00",    "--",    "2.100,00 DKK"),
      via("KØBENHAVN"),
      b("DK - 1050 KØBENHAVN",   "CPH Freight A/S",      "09 Jun", "--:--", "-4 PLL", "", "-900,00",   "--",    "0,00 DKK",   true),
      b("DK - 6400 SØNDERBORG",  "SB Logistics ApS",     "11 Jun", "--:--", "7 PLL",  "", "3.300,00",  "2,80",  "980,00 EUR"),
      b("DE - 24103 KIEL",       "Kiel Spedition GmbH",  "16 Jun", "--:--", "-7 PLL", "", "-3.300,00", "-2,80", "0,00 EUR",   true),
    ],
    expenses: "3.080,00 EUR",
  },
  "dossier-5": {
    dossierNumber: "#26E11065174",
    origin: "DK - 7400 HERNING",      originDate: "09 Jun",
    destination: "NL - 3011 ROTTERDAM", destinationDate: "11 Jun",
    totalKg: "5.100,00 kg", totalLdm: "4,20 ldm", totalPrice: "3.150,00 EUR", isPriceNegative: false,
    rows: [
      b("DK - 7400 HERNING",         "Herning Textil A/S",           "09 Jun", "--:--", "9 PLL",  "", "5.100,00",  "4,20",  "3.150,00 EUR"),
      b("NL - 3011 ROTTERDAM",       "Rotterdam Port Services BV",   "11 Jun", "--:--", "-9 PLL", "", "-5.100,00", "-4,20", "0,00 EUR",   true),
    ],
    expenses: "3.150,00 EUR",
  },
  "dossier-6": {
    dossierNumber: "#26E11065185",
    origin: "DK - 9000 AALBORG",      originDate: "07 Jun",
    destination: "PL - 80-001 GDAŃSK", destinationDate: "10 Jun",
    totalKg: "10.050,00 kg", totalLdm: "5,00 ldm", totalPrice: "8.350,00 EUR", isPriceNegative: false,
    rows: [
      b("DK - 9000 AALBORG",        "Nord Logistics",           "07 Jun", "--:--", "3 PLL",   "", "750,00",    "--",    "2.400,00 SEK"),
      via("OSLO"),
      b("DK - 5000 ODENSE",         "Odense Stålskibsværft",    "10 Jun", "--:--", "6 PLL",   "", "2.800,00",  "--",    "3.200,00 NOK"),
      b("NO - 0150 OSLO",           "Oslo Distribusjon AS",     "12 Jun", "--:--", "-6 PLL",  "", "-2.800,00", "--",    "0,00 NOK",   true),
      via("GDAŃSK"),
      b("DK - 8000 AARHUS",         "Aarhus Havn A/S",          "08 Jun", "--:--", "12 PLL",  "", "6.500,00",  "5,00",  "2.750,00 EUR"),
      b("PL - 80-001 GDAŃSK",       "Gdańsk Logistik Sp.",       "10 Jun", "--:--", "-12 PLL", "", "-6.500,00", "-5,00", "0,00 EUR",   true),
    ],
    expenses: "8.350,00 EUR",
  },
  "dossier-7": {
    dossierNumber: "#26E11065196",
    origin: "DK - 3000 HELSINGØR",        originDate: "07 Jun",
    destination: "DK - 9900 FREDERIKSHAVN", destinationDate: "10 Jun",
    totalKg: "8.500,00 kg", totalLdm: "6,00 ldm", totalPrice: "4.820,00 DKK", isPriceNegative: false,
    rows: [
      b("DK - 3000 HELSINGØR",       "Scandlines Cargo",      "07 Jun", "--:--", "2 PLL",   "", "500,00",    "--",    "320,00 SEK"),
      via("HELSINGBORG"),
      b("SE - 41104 GÖTEBORG",       "Göteborgs Hamn AB",     "06 Jun", "--:--", "15 PLL",  "", "8.000,00",  "6,00",  "4.500,00 DKK"),
      b("DK - 9900 FREDERIKSHAVN",   "Frederikshavn Havn",    "10 Jun", "--:--", "-15 PLL", "", "-8.000,00", "-6,00", "0,00 DKK",   true),
    ],
    expenses: "4.820,00 DKK",
  },
  "dossier-8": {
    dossierNumber: "#26E11065207",
    origin: "DK - 7700 THISTED",  originDate: "11 Jun",
    destination: "DK - 8000 AARHUS", destinationDate: "14 Jun",
    totalKg: "10.000,00 kg", totalLdm: "4,00 ldm", totalPrice: "1.200,00 DKK", isPriceNegative: false,
    rows: [
      b("DK - 7700 THISTED",  "ANKTE THISTED",  "11 Jun", "--:--", "10 PLL",  "", "10.000,00",  "4,00",  "1.200,00 DKK"),
      b("DK - 8000 AARHUS",   "Aarhus Depot",   "14 Jun", "--:--", "-10 PLL", "", "-10.000,00", "-4,00", "0,00 DKK",   true),
    ],
    expenses: "1.200,00 DKK",
  },
  "dossier-9": {
    dossierNumber: "#26E11065218",
    origin: "DK - 4700 NÆSTVED",       originDate: "13 Jun",
    destination: "DK - 2100 KØBENHAVN Ø", destinationDate: "15 Jun",
    totalKg: "650,00 kg", totalLdm: "0,00 ldm", totalPrice: "450,00 DKK", isPriceNegative: false,
    rows: [
      b("DK - 4700 NÆSTVED",       "Næstved Transport ApS",   "13 Jun", "--:--", "3 PLL",  "", "650,00",  "--", "450,00 DKK"),
      b("DK - 2100 KØBENHAVN Ø",   "CPH East Distribution",   "15 Jun", "--:--", "-3 PLL", "", "-650,00", "--", "0,00 DKK",  true),
    ],
    expenses: "450,00 DKK",
  },
};
