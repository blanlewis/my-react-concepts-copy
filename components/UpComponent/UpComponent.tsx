import { Box } from "@mui/material";
import CustomTabs from "@/components/CustomTabs";
import { useState } from "react";
import BookingsAccordion from "@/components/BookingsAccordion";
import BookingsBar from "@/components/BookingsBar";
import { useCustomHook } from "@/app/utils/hook";

enum BookingTabEnum {
  ALL = "all",
  SUGGESTION = "suggestion",
}

const UpComponent = () => {
  const [value, setValue] = useState<string>(BookingTabEnum.ALL);
  const { dossiers, activeDossierId, toggleBookingInDossier } = useCustomHook();

  const activeDossier = dossiers.find(d => d.id === activeDossierId);
  const checkedIds = activeDossier
    ? [...activeDossier.bookingIds, ...activeDossier.pendingBookingIds]
    : [];
  const acceptedBookingIds = dossiers.flatMap(d => d.bookingIds);

  const tabsData = [
    {
      label: "All",
      value: BookingTabEnum.ALL,
      content: (
        <Box sx={{ height: "calc(100% - 73px)", maxHeight: "calc(100% - 73px)", overflowY: "auto" }}>
          <BookingsAccordion checkedIds={checkedIds} excludedIds={acceptedBookingIds} onToggle={toggleBookingInDossier} />
        </Box>
      ),
    },
    {
      label: "Suggestion",
      value: BookingTabEnum.SUGGESTION,
      content: (
        <Box sx={{ height: "calc(100% - 69px)", maxHeight: "calc(100% - 69px)", overflowY: "auto" }}>
          <BookingsAccordion filterSuggestion checkedIds={checkedIds} excludedIds={acceptedBookingIds} onToggle={toggleBookingInDossier} />
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", position: "relative", overflow: "hidden" }}>
      <BookingsBar />
      <CustomTabs tabsData={tabsData} value={value} setValue={setValue} />
    </Box>
  );
};

export default UpComponent;
