"use client";

import { Box, Typography } from "@mui/material";

const BookingsBar = () => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      width: "100%",
      height: "48px",
      flexShrink: 0,
      borderBottom: "1px solid",
      borderColor: "divider",
      px: 1,
    }}
  >
    <Typography sx={{ fontSize: "14px", fontWeight: 600, whiteSpace: "nowrap" }}>
      Bookings
    </Typography>
  </Box>
);

export default BookingsBar;
