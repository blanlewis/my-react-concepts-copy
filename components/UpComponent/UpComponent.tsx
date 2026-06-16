import { Box, Typography } from "@mui/material";
import CustomTabs from "@/components/CustomTabs";
import { useState } from "react";
import CustomAccordion from "@/components/CustomAccordion";

enum BookingTabEnum {
  ALL = "all",
  SUGGESTION = "suggestion",
}

interface BookingItem {
  name: string;
  description: string;
  isSuggestion: boolean;
}

const BOOKING_ITEMS: BookingItem[] = [
  { name: "Design system audit", description: "Review all components for consistency", isSuggestion: false },
  { name: "API integration", description: "Connect backend endpoints to frontend", isSuggestion: false },
  { name: "User testing round 2", description: "Schedule sessions with 5 participants", isSuggestion: false },
  { name: "Performance profiling", description: "Identify render bottlenecks in dashboard", isSuggestion: true },
  { name: "Accessibility audit", description: "WCAG 2.1 AA compliance check", isSuggestion: true },
  { name: "Dark mode support", description: "Extend theme tokens for dark palette", isSuggestion: true },
  { name: "Q3 roadmap review", description: "Align features with product strategy", isSuggestion: false },
  { name: "Onboarding flow redesign", description: "Reduce drop-off in first-time setup", isSuggestion: true },
  { name: "Mobile breakpoints", description: "Responsive layout for small screens", isSuggestion: false },
];

const BookingList = ({ items }: { items: BookingItem[] }) => (
  <Box sx={{ height: "calc(100% - 69px)", maxHeight: "calc(100% - 69px)", overflowY: "auto" }}>
    {items.map((item, index) => (
      <CustomAccordion key={index} header={item.name} body={item.description} />
    ))}
  </Box>
);

const UpComponent = () => {
  const [value, setValue] = useState<string>(BookingTabEnum.ALL);

  const tabsData = [
    { label: "All", value: BookingTabEnum.ALL, content: <BookingList items={BOOKING_ITEMS} /> },
    { label: "Suggestion", value: BookingTabEnum.SUGGESTION, content: <BookingList items={BOOKING_ITEMS.filter(i => i.isSuggestion)} /> },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", position: "relative", overflow: "hidden" }}>
      <Typography sx={{ textAlign: "center", fontSize: "14px" }}>Bookings</Typography>
      <CustomTabs tabsData={tabsData} value={value} setValue={setValue} />
    </Box>
  );
};

export default UpComponent;
