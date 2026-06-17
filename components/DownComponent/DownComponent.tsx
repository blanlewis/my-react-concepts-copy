"use client";

import { Box, Button, Chip, Divider, IconButton, Tab, Typography } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import AddIcon from "@mui/icons-material/Add";
import { useCustomHook } from "@/app/utils/hook";
import { Dossier } from "@/app/utils/types";
import { Booking, BOOKINGS_DATA } from "@/app/utils/bookingsData";

const BookingRow = ({ booking, isPending }: { booking: Booking; isPending?: boolean }) => (
  <Box
    sx={{
      px: 1.5,
      py: 1,
      display: "flex",
      alignItems: "center",
      gap: 1,
      borderBottom: "1px solid",
      borderColor: "divider",
      bgcolor: isPending ? "action.hover" : "transparent",
      opacity: isPending ? 0.85 : 1,
    }}
  >
    <Box sx={{ borderLeft: `3px solid ${isPending ? "#ff9800" : "#4caf50"}`, pl: 1, flex: 1, minWidth: 0 }}>
      <Typography sx={{ fontSize: "12px", fontWeight: 400, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
        {booking.origin.country} - {booking.origin.postalCode} {booking.origin.city}
      </Typography>
      <Typography sx={{ fontSize: "12px", fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
        {booking.destination.country} - {booking.destination.postalCode} {booking.destination.city}
      </Typography>
    </Box>
    <Box sx={{ textAlign: "right", flexShrink: 0 }}>
      <Typography sx={{ fontSize: "11px", color: "text.secondary" }}>
        {booking.pallets != null && `${booking.pallets} PLL`}
      </Typography>
      <Typography sx={{ fontSize: "12px", fontWeight: 700 }}>
        {booking.price} {booking.currency}
      </Typography>
    </Box>
    <Chip label={booking.bookingNumber} size="small" variant="outlined" sx={{ fontSize: "10px", height: 18, borderRadius: "4px", flexShrink: 0 }} />
  </Box>
);

const DossierTabContent = ({
  dossier,
  onAccept,
  onCancel,
}: {
  dossier: Dossier;
  onAccept: () => void;
  onCancel: () => void;
}) => {
  const confirmedBookings = BOOKINGS_DATA.filter(b => dossier.bookingIds.includes(b.id));
  const pendingBookings = BOOKINGS_DATA.filter(b => dossier.pendingBookingIds.includes(b.id));
  const hasPendingOrNew = dossier.isNew || pendingBookings.length > 0;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Box sx={{ flex: 1, overflowY: "auto" }}>
        {confirmedBookings.length === 0 && pendingBookings.length === 0 && (
          <Typography sx={{ px: 2, py: 3, fontSize: "13px", color: "text.secondary", textAlign: "center" }}>
            No bookings yet — check a booking above to add it here.
          </Typography>
        )}

        {confirmedBookings.map(booking => (
          <BookingRow key={booking.id} booking={booking} />
        ))}

        {pendingBookings.length > 0 && (
          <>
            {confirmedBookings.length > 0 && <Divider />}
            <Box sx={{ px: 1.5, py: 0.5, display: "flex", alignItems: "center", gap: 0.5 }}>
              <Typography sx={{ fontSize: "11px", color: "warning.main", fontWeight: 600 }}>
                Pending ({pendingBookings.length})
              </Typography>
            </Box>
            {pendingBookings.map(booking => (
              <BookingRow key={booking.id} booking={booking} isPending />
            ))}
          </>
        )}
      </Box>

      {hasPendingOrNew && (
        <Box
          sx={{
            borderTop: "1px solid",
            borderColor: "divider",
            px: 1.5,
            py: 1,
            display: "flex",
            gap: 1,
            justifyContent: "flex-end",
            flexShrink: 0,
          }}
        >
          <Button variant="outlined" size="small" onClick={onCancel} sx={{ textTransform: "none", fontSize: "12px" }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={onAccept}
            disabled={pendingBookings.length === 0}
            sx={{ textTransform: "none", fontSize: "12px" }}
          >
            Accept
          </Button>
        </Box>
      )}
    </Box>
  );
};

const DownComponent = () => {
  const { dossiers, activeDossierId, setActiveDossierId, acceptDossier, cancelDossier, createNewDossier } = useCustomHook();

  const activeTabValue = (activeDossierId && dossiers.some(d => d.id === activeDossierId))
    ? activeDossierId
    : dossiers[0].id;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", overflow: "hidden" }}>
      <TabContext value={activeTabValue}>
        <Box sx={{ borderBottom: "1px solid", borderColor: "divider", display: "flex", alignItems: "center", flexShrink: 0 }}>
          <TabList
            onChange={(_, v) => setActiveDossierId(v)}
            sx={{ minHeight: "36px" }}
          >
            {dossiers.map(d => (
              <Tab
                key={d.id}
                value={d.id}
                label={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    {d.name}
                    {(d.isNew || d.pendingBookingIds.length > 0) && (
                      <Box
                        sx={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          bgcolor: "warning.main",
                          flexShrink: 0,
                        }}
                      />
                    )}
                  </Box>
                }
                disableRipple
                sx={{ minHeight: "36px", py: 0.5, px: 1.5, fontSize: "12px", textTransform: "none" }}
              />
            ))}
          </TabList>
          <IconButton size="small" onClick={createNewDossier} sx={{ mx: 0.5, flexShrink: 0 }}>
            <AddIcon sx={{ fontSize: "18px" }} />
          </IconButton>
        </Box>

        {dossiers.map(d => (
          <TabPanel
            key={d.id}
            value={d.id}
            sx={{ padding: 0, height: "calc(100% - 37px)", overflow: "hidden" }}
          >
            <DossierTabContent
              dossier={d}
              onAccept={() => acceptDossier(d.id)}
              onCancel={() => cancelDossier(d.id)}
            />
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
};

export default DownComponent;
