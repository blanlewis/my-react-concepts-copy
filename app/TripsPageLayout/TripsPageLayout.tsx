"use client";

import { Box } from "@mui/material";
import ReflexDragger from "@/components/ReflexDragger";
import UpComponent from "@/components/UpComponent";
import DownComponent from "@/components/DownComponent";
import TripsToggle from "./TripsToggle";
import { useCustomHook } from "@/app/utils/hook";
import { RightComponentToggleOptionsEnum } from "@/app/utils/types";
import RightComponentGridLayout from "@/components/RightComponentGridLayout";
import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import("@/components/MapComponent"), { ssr: false });

const TripsPageLayout = () => {
  const { activeRightPanelToggle } = useCustomHook();

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box sx={{ position: "absolute", top: "53px", right: "3px", zIndex: 401 }}>
        <TripsToggle />
      </Box>
      {activeRightPanelToggle === RightComponentToggleOptionsEnum.MAP ? (
        <MapComponent />
      ) : activeRightPanelToggle === RightComponentToggleOptionsEnum.GRID ? (
        <RightComponentGridLayout />
      ) : (
        <ReflexDragger
          reflexContainerOrientation="horizontal"
          leftpaneComponent={
            <Box sx={{ width: "100%", height: "100%" }}>
              <UpComponent />
            </Box>
          }
          rightpaneComponent={
            <Box sx={{ width: "100%", height: "100%" }}>
              <DownComponent />
            </Box>
          }
          minimumLeftPaneWidth={150}
          minimumRightPaneWidth={150}
          splitterWidth={10}
          initialLeftFlex={0.5}
          initialRightFlex={0.5}
          isDraggerIconRequired={false}
        />
      )}
    </Box>
  );
};

export default TripsPageLayout;
