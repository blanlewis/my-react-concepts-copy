"use client";

import { Box, Divider, IconButton, InputBase, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useState } from "react";
import BookingsAccordion from "@/components/BookingsAccordion";
import BookingsBar from "@/components/BookingsBar";
import { useCustomHook } from "@/app/utils/hook";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon  from "@mui/icons-material/Close";

enum BookingTabEnum {
  ALL = "all",
  SUGGESTION = "suggestion",
}

const TAB_SX = { minHeight: "32px", py: 0, px: 1.5, fontSize: "12px", textTransform: "none" } as const;

const UpComponent = () => {
  const [value, setValue] = useState<string>(BookingTabEnum.ALL);
  const [bookingSearch, setBookingSearch] = useState("");
  const { dossiers, activeDossierId, toggleBookingInDossier } = useCustomHook();

  const activeDossier = dossiers.find(d => d.id === activeDossierId);
  const checkedIds = activeDossier
    ? [...activeDossier.bookingIds, ...activeDossier.pendingBookingIds]
    : [];
  const acceptedBookingIds = dossiers.flatMap(d => d.bookingIds);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", position: "relative", overflow: "hidden" }}>
      <TabContext value={value}>

        {/* Single bar: [tabs] | [search booking] | [filters] */}
        <Box sx={{ display: "flex", alignItems: "center", height: 32, minHeight: 32, flexShrink: 0, borderBottom: "1px solid", borderColor: "divider" }}>
          <TabList onChange={(_, v) => setValue(v)} sx={{ minHeight: "32px", flexShrink: 0 }}>
            <Tab value={BookingTabEnum.ALL}        label="All"        disableRipple disableFocusRipple sx={TAB_SX} />
            <Tab value={BookingTabEnum.SUGGESTION} label="Suggestion" disableRipple disableFocusRipple sx={TAB_SX} />
          </TabList>
          <Divider orientation="vertical" flexItem sx={{ my: "auto", height: "18px" }} />

          {/* Search booking */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, px: 0.75, height: 24, border: "1px solid", borderColor: "divider", borderRadius: "6px", bgcolor: "background.paper", flexShrink: 0, mx: 0.75 }}>
            <SearchIcon sx={{ fontSize: 14, color: "text.disabled" }} />
            <InputBase
              value={bookingSearch}
              onChange={(e) => setBookingSearch(e.target.value)}
              placeholder="Search booking…"
              sx={{ fontSize: "11px", width: 130, "& input": { p: 0 } }}
            />
            {bookingSearch && (
              <IconButton size="small" onClick={() => setBookingSearch("")} sx={{ p: 0 }}>
                <CloseIcon sx={{ fontSize: 12, color: "text.disabled" }} />
              </IconButton>
            )}
          </Box>

          <Divider orientation="vertical" flexItem sx={{ my: "auto", height: "18px" }} />
          <BookingsBar />
        </Box>

        {/* overflow: "auto" — scrollbar sits at the bottom of the visible area, not the content */}
        <TabPanel value={BookingTabEnum.ALL}        sx={{ padding: 0, height: "calc(100% - 33px)", overflow: "auto" }}>
          <BookingsAccordion checkedIds={checkedIds} excludedIds={acceptedBookingIds} onToggle={toggleBookingInDossier} searchTerm={bookingSearch} />
        </TabPanel>
        <TabPanel value={BookingTabEnum.SUGGESTION} sx={{ padding: 0, height: "calc(100% - 33px)", overflow: "auto" }}>
          <BookingsAccordion filterSuggestion checkedIds={checkedIds} excludedIds={acceptedBookingIds} onToggle={toggleBookingInDossier} searchTerm={bookingSearch} />
        </TabPanel>

      </TabContext>
    </Box>
  );
};

export default UpComponent;
