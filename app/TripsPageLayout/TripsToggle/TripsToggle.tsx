"use client";

import CustomToggleButton from "@/components/CustomToggleButton";
import { Layers as LayersIcon, ViewComfy as ViewComfyIcon } from "@mui/icons-material";
import { useCustomHook } from "@/app/utils/hook";
import { RightComponentToggleOptionsEnum } from "@/app/utils/types";
import ViewHeadlineIcon from "@mui/icons-material/ViewHeadline";

const TripsToggle = () => {
  const { activeRightPanelToggle, setActiveRightPanelToggle } = useCustomHook();

  const toggleData = [
    { label: "List", icon: <ViewHeadlineIcon sx={{ display: "flex" }} />, value: RightComponentToggleOptionsEnum.LIST },
    { label: "Grid", icon: <ViewComfyIcon sx={{ display: "flex" }} />, value: RightComponentToggleOptionsEnum.GRID },
    { label: "Map", icon: <LayersIcon sx={{ display: "flex" }} />, value: RightComponentToggleOptionsEnum.MAP },
  ];

  return (
    <CustomToggleButton
      toggleData={toggleData}
      selectedToggle={activeRightPanelToggle}
      setSelectedToggle={setActiveRightPanelToggle as (value: string | null) => void}
      isDeselectionNotAllowed
    />
  );
};

export default TripsToggle;
