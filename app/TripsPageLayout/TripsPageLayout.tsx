import { Box } from "@mui/material";
import ReflexDragger from "@/components/ReflexDragger";
import TripsLeftPanel from "./TripsLeftPanel";
import TripsRightPanel from "./TripsRightPanel";
import TripsToggle from "./TripsToggle";

const TripsPageLayout = () => {
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
      <ReflexDragger
        reflexContainerOrientation="horizontal"
        leftpaneComponent={
          <Box sx={{ width: "100%", height: "100%" }}>
            <TripsLeftPanel />
          </Box>
        }
        rightpaneComponent={
          <Box sx={{ width: "100%", height: "100%" }}>
            <TripsRightPanel />
          </Box>
        }
        minimumLeftPaneWidth={150}
        minimumRightPaneWidth={150}
        splitterWidth={10}
        initialLeftFlex={0.5}
        initialRightFlex={0.5}
        isDraggerIconRequired={false}
      />
    </Box>
  );
};

export default TripsPageLayout;