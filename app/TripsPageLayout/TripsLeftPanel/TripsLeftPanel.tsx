import { Box, Button, IconButton, Typography } from "@mui/material";
import CustomTabs from "@/components/CustomTabs";
import { useState } from "react";
import CustomAccordion from "@/components/CustomAccordion";
import PlayCircleOutlinedIcon from "@mui/icons-material/PlayCircleOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";

enum PlanningTabEnum {
  ALL = "all",
  PLANNED = "planned",
  NOT_PLANNED = "not-planned",
  PRE_PLANNED = "pre-planned",
}

interface PlanningItem {
  name: string;
  description: string;
  status: PlanningTabEnum.PLANNED | PlanningTabEnum.NOT_PLANNED | PlanningTabEnum.PRE_PLANNED;
}

const PLANNING_ITEMS: PlanningItem[] = [
  { name: "Design system audit", description: "Review all components for consistency", status: PlanningTabEnum.PLANNED },
  { name: "API integration", description: "Connect backend endpoints to frontend", status: PlanningTabEnum.PLANNED },
  { name: "User testing round 2", description: "Schedule sessions with 5 participants", status: PlanningTabEnum.PLANNED },
  { name: "Performance profiling", description: "Identify render bottlenecks in dashboard", status: PlanningTabEnum.NOT_PLANNED },
  { name: "Accessibility audit", description: "WCAG 2.1 AA compliance check", status: PlanningTabEnum.NOT_PLANNED },
  { name: "Dark mode support", description: "Extend theme tokens for dark palette", status: PlanningTabEnum.NOT_PLANNED },
  { name: "Q3 roadmap review", description: "Align features with product strategy", status: PlanningTabEnum.PRE_PLANNED },
  { name: "Onboarding flow redesign", description: "Reduce drop-off in first-time setup", status: PlanningTabEnum.PRE_PLANNED },
  { name: "Mobile breakpoints", description: "Responsive layout for small screens", status: PlanningTabEnum.PRE_PLANNED },
];

const PlanningList = ({ items }: { items: PlanningItem[] }) => (
  <Box sx={{ height: "calc(100% - 69px)", maxHeight: "calc(100% - 69px)", overflowY: "auto" }}>
    {items.map((item, index) => (
      <CustomAccordion key={index} header={item.name} body={item.description} />
    ))}
  </Box>
);

const TripsLeftPanel = () => {
  const [value, setValue] = useState<string>(PlanningTabEnum.ALL);

  const tabsData = [
    { label: "All", value: PlanningTabEnum.ALL, content: <PlanningList items={PLANNING_ITEMS} /> },
    { label: "Planned", value: PlanningTabEnum.PLANNED, content: <PlanningList items={PLANNING_ITEMS.filter(i => i.status === PlanningTabEnum.PLANNED)} /> },
    { label: "Not-planned", value: PlanningTabEnum.NOT_PLANNED, content: <PlanningList items={PLANNING_ITEMS.filter(i => i.status === PlanningTabEnum.NOT_PLANNED)} /> },
    { label: "Pre-planned", value: PlanningTabEnum.PRE_PLANNED, content: <PlanningList items={PLANNING_ITEMS.filter(i => i.status === PlanningTabEnum.PRE_PLANNED)} /> },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", position: "relative", overflow: "hidden" }}>
      <Typography sx={{ textAlign: "center", fontSize: "14px" }}>Bookings</Typography>

      {/* Action bar */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, height: 34, minHeight: 34, px: 1, borderBottom: 1, borderColor: "divider" }}>
        <Button
          variant="contained"
          size="small"
          startIcon={<PlayCircleOutlinedIcon sx={{ fontSize: "16px !important" }} />}
          sx={{ height: 26, fontSize: "12px", textTransform: "none", px: 1.5, borderRadius: 1 }}
        >
          Activate Trip
        </Button>
        <Button
          variant="outlined"
          size="small"
          startIcon={<FlagOutlinedIcon sx={{ fontSize: "16px !important" }} />}
          sx={{ height: 26, fontSize: "12px", textTransform: "none", px: 1.5, borderRadius: 1 }}
        >
          Manage route
        </Button>
        <IconButton size="small" sx={{ ml: "auto", p: 0.25 }}>
          <MoreVertIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Box>

      <CustomTabs tabsData={tabsData} value={value} setValue={setValue} />
    </Box>
  );
};

export default TripsLeftPanel;
