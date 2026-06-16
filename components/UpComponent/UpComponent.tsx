import { Box } from "@mui/material";
import CustomTabs from "@/components/CustomTabs";
import { useState } from "react";
import BookingsAccordion from "@/components/BookingsAccordion";
import BookingsBar from "@/components/BookingsBar";

enum BookingTabEnum {
  ALL = "all",
  SUGGESTION = "suggestion",
}

const UpComponent = () => {
  const [value, setValue] = useState<string>(BookingTabEnum.ALL);

  const tabsData = [
    {
      label: "All",
      value: BookingTabEnum.ALL,
      content: (
        <Box sx={{ height: "calc(100% - 84px)", maxHeight: "calc(100% - 84px)", overflowY: "auto" }}>
          <BookingsAccordion />
        </Box>
      ),
    },
    {
      label: "Suggestion",
      value: BookingTabEnum.SUGGESTION,
      content: (
        <Box sx={{ height: "calc(100% - 69px)", maxHeight: "calc(100% - 69px)", overflowY: "auto" }}>
          <BookingsAccordion filterSuggestion />
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
