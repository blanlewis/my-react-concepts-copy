"use client";

import { Box } from "@mui/material";
import ReflexDragger from "@/components/ReflexDragger";
import UpComponent from "@/components/UpComponent";
import DownComponent from "@/components/DownComponent";
import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import("@/components/MapComponent"), { ssr: false });

const RightComponentGridLayoutBottomPane = () => {
    return (
        <Box sx={{ width: "100%", height: "100%" }}>
            <ReflexDragger
                reflexContainerOrientation="vertical"
                leftpaneComponent={
                    <Box sx={{ width: "100%", height: "100%" }}>
                        <UpComponent />
                    </Box>
                }
                rightpaneComponent={
                    <Box sx={{ width: "100%", height: "100%" }}>
                        <MapComponent />
                    </Box>
                }
                minimumLeftPaneWidth={80}
                minimumRightPaneWidth={80}
                splitterWidth={8}
                initialLeftFlex={0.5}
                initialRightFlex={0.5}
                isDraggerIconRequired={false}
            />
        </Box>
    );
};

const RightComponentGridLayoutTopPane = () => {
    return (
        <Box sx={{ width: "100%", height: "100%" }}>
            <DownComponent />
        </Box>
    );
};

const RightComponentGridLayout = () => {
    return (
        <Box sx={{ width: "100%", height: "100%" }}>
            <ReflexDragger
                reflexContainerOrientation="horizontal"
                leftpaneComponent={<RightComponentGridLayoutBottomPane />}
                rightpaneComponent={<RightComponentGridLayoutTopPane />}
                minimumLeftPaneWidth={80}
                minimumRightPaneWidth={80}
                splitterWidth={8}
                initialLeftFlex={0.5}
                initialRightFlex={0.5}
                isDraggerIconRequired={false}
            />
        </Box>
    );
};

export default RightComponentGridLayout;
