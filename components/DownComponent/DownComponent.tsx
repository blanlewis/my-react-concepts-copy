"use client";

import { useMemo, useState, useRef, useLayoutEffect } from "react";
import { Box, Button, Chip, Divider, IconButton, Menu, MenuItem, Tab, Tooltip, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import AddIcon from "@mui/icons-material/Add";
import useResizeObserver from "use-resize-observer";
import { useCustomHook } from "@/app/utils/hook";
import { Dossier, DossierStatus } from "@/app/utils/types";
import { Booking, BOOKINGS_DATA } from "@/app/utils/bookingsData";
import CustomToggleButton from "@/components/CustomToggleButton";
import { DateFilter, DropdownFilter } from "@/components/BookingFilters/BookingFilters";

const STATUS_META: Record<DossierStatus, { label: string; color: string; bg: string }> = {
  draft:     { label: "Draft",     color: "#5C6BC0", bg: "#EDE7F6" },
  active:    { label: "Active",    color: "#2E7D32", bg: "#E8F5E9" },
  delayed:   { label: "Delayed",   color: "#C62828", bg: "#FFEBEE" },
  completed: { label: "Completed", color: "#00695C", bg: "#E0F2F1" },
  predraft:  { label: "Pre-Draft", color: "#6A1B9A", bg: "#F3E5F5" },
};

const STATUS_FILTER_MAP: Record<string, DossierStatus> = {
  drafts:    "draft",
  active:    "active",
  delayed:   "delayed",
  completed: "completed",
  predraft:  "predraft",
};

const StatusChip = ({ status }: { status: DossierStatus }) => {
  const { label, color, bg } = STATUS_META[status];
  return (
    <Box sx={{ fontSize: "9px", fontWeight: 700, px: 0.6, py: 0.15, borderRadius: "3px", color, bgcolor: bg, lineHeight: 1.4, flexShrink: 0 }}>
      {label}
    </Box>
  );
};

const BookingRow = ({ booking, isPending }: { booking: Booking; isPending?: boolean }) => (
  <Box
    sx={{
      px: 1.5, py: 1,
      display: "flex", alignItems: "center", gap: 1,
      borderBottom: "1px solid", borderColor: "divider",
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

const DossierTabContent = ({ dossier, onAccept, onCancel }: { dossier: Dossier; onAccept: () => void; onCancel: () => void }) => {
  const confirmedBookings = BOOKINGS_DATA.filter(b => dossier.bookingIds.includes(b.id));
  const pendingBookings   = BOOKINGS_DATA.filter(b => dossier.pendingBookingIds.includes(b.id));

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Box sx={{ flex: 1, overflowY: "auto" }}>
        {confirmedBookings.length === 0 && pendingBookings.length === 0 && (
          <Typography sx={{ px: 2, py: 3, fontSize: "13px", color: "text.secondary", textAlign: "center" }}>
            No bookings yet — check a booking above to add it here.
          </Typography>
        )}
        {confirmedBookings.map(b => <BookingRow key={b.id} booking={b} />)}
        {pendingBookings.length > 0 && (
          <>
            {confirmedBookings.length > 0 && <Divider />}
            <Box sx={{ px: 1.5, py: 0.5 }}>
              <Typography sx={{ fontSize: "11px", color: "warning.main", fontWeight: 600 }}>
                Pending ({pendingBookings.length})
              </Typography>
            </Box>
            {pendingBookings.map(b => <BookingRow key={b.id} booking={b} isPending />)}
          </>
        )}
      </Box>
      {pendingBookings.length > 0 && (
        <Box sx={{ borderTop: "1px solid", borderColor: "divider", px: 1.5, py: 1, display: "flex", gap: 1, justifyContent: "flex-end", flexShrink: 0 }}>
          <Button variant="outlined" size="small" onClick={onCancel} sx={{ textTransform: "none", fontSize: "12px" }}>Cancel</Button>
          <Button variant="contained" size="small" onClick={onAccept} disabled={pendingBookings.length === 0} sx={{ textTransform: "none", fontSize: "12px" }}>Accept</Button>
        </Box>
      )}
    </Box>
  );
};

const PLUS_BTN_W = 34;

const DownComponent = () => {
  const { dossiers, activeDossierId, setActiveDossierId, acceptDossier, cancelDossier, createNewDossier } = useCustomHook();
  const [dossierFilter, setDossierFilter] = useState("all");
  const [overflowAnchor, setOverflowAnchor] = useState<null | HTMLElement>(null);
  const [visibleCount, setVisibleCount] = useState(dossiers.length);

  const measureRef  = useRef<HTMLDivElement>(null);
  const { ref: containerRef, width: containerWidth = 0 } = useResizeObserver<HTMLDivElement>();

  const filteredDossiers = useMemo(
    () => dossierFilter === "all" ? dossiers : dossiers.filter(d => d.status === STATUS_FILTER_MAP[dossierFilter]),
    [dossiers, dossierFilter]
  );

  const filterToggleData = useMemo(() => [
    { label: "All",        value: "all",       count: dossiers.length },
    { label: "Drafts",     value: "drafts",    count: dossiers.filter(d => d.status === "draft").length },
    { label: "Active",     value: "active",    count: dossiers.filter(d => d.status === "active").length },
    { label: "Delayed",    value: "delayed",   count: dossiers.filter(d => d.status === "delayed").length },
    { label: "Completed",  value: "completed", count: dossiers.filter(d => d.status === "completed").length },
    { label: "Pre-Drafts", value: "predraft",  count: dossiers.filter(d => d.status === "predraft").length },
  ].map(item => ({
    ...item,
    icon: (
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.4 }}>
        <Typography sx={{ fontSize: "11px", fontWeight: 500, lineHeight: 1 }}>{item.label}</Typography>
        <Typography sx={{ fontSize: "10px", fontWeight: 600, lineHeight: 1, color: "text.secondary" }}>{item.count}</Typography>
      </Box>
    ),
  })), [dossiers]);

  useLayoutEffect(() => {
    if (!measureRef.current || containerWidth === 0) { setVisibleCount(filteredDossiers.length); return; }
    const children = Array.from(measureRef.current.children) as HTMLElement[];
    const available = containerWidth - PLUS_BTN_W;
    const totalWidth = children.reduce((sum, el) => sum + el.offsetWidth, 0);
    if (totalWidth <= available) { setVisibleCount(filteredDossiers.length); return; }
    let used = 0; let count = 0;
    for (const el of children) {
      if (used + el.offsetWidth > available) break;
      used += el.offsetWidth; count++;
    }
    setVisibleCount(count);
  }, [containerWidth, filteredDossiers]);

  const activeTabValue = (activeDossierId && filteredDossiers.some(d => d.id === activeDossierId))
    ? activeDossierId
    : (filteredDossiers[0]?.id ?? dossiers[0].id);

  const activeIdx = filteredDossiers.findIndex(d => d.id === activeTabValue);
  let windowStart = 0;
  if (activeIdx >= visibleCount && visibleCount > 0) windowStart = activeIdx - visibleCount + 1;

  const visibleDossiers  = filteredDossiers.slice(windowStart, windowStart + visibleCount);
  const overflowDossiers = [...filteredDossiers.slice(0, windowStart), ...filteredDossiers.slice(windowStart + visibleCount)];
  const hasOverflow      = overflowDossiers.length > 0;

  const currentIndex  = filteredDossiers.findIndex(d => d.id === activeTabValue);
  const hasPrev       = currentIndex > 0;
  const hasNext       = currentIndex < filteredDossiers.length - 1;
  const showPagination = filteredDossiers.length > 1;

  const goToPrev = () => { if (hasPrev) setActiveDossierId(filteredDossiers[currentIndex - 1].id); };
  const goToNext = () => { if (hasNext) setActiveDossierId(filteredDossiers[currentIndex + 1].id); };

  const Dot = () => <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: "warning.main", flexShrink: 0 }} />;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", overflow: "hidden" }}>
      {/* Filter bar */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, px: 1, py: 0.5, borderBottom: "1px solid", borderColor: "divider", flexShrink: 0 }}>
        <CustomToggleButton
          toggleData={filterToggleData}
          selectedToggle={dossierFilter}
          setSelectedToggle={(v) => setDossierFilter(v ?? "all")}
          isDeselectionNotAllowed
          height={24}
          autoWidth
        />
        <Divider orientation="vertical" flexItem sx={{ my: "auto", height: "18px" }} />
        <DateFilter label="Pickup" />
        <DateFilter label="Delivery" />
        <DropdownFilter label="Type" options={["Standard", "Express", "Economy", "Fragile"]} />
        <DropdownFilter label="My Trips" options={["Trip A", "Trip B", "Trip C"]} />
      </Box>

      {filteredDossiers.length === 0 ? (
        <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Typography sx={{ fontSize: "13px", color: "text.secondary" }}>No dossiers in this category.</Typography>
        </Box>
      ) : (
        <TabContext value={activeTabValue}>
          <Box sx={{ borderBottom: "1px solid", borderColor: "divider", display: "flex", alignItems: "center", flexShrink: 0 }}>

            {/* Hidden measurement div */}
            <Box
              ref={measureRef}
              aria-hidden="true"
              sx={{ position: "fixed", top: -9999, left: 0, visibility: "hidden", pointerEvents: "none", display: "flex" }}
            >
              {filteredDossiers.map(d => (
                <Box key={d.id} sx={{ px: 1.5, fontSize: "12px", whiteSpace: "nowrap", display: "inline-flex", alignItems: "center", gap: 0.5 }}>
                  {d.name}
                  <Box sx={{ width: 6, height: 6, display: "inline-block" }} />
                </Box>
              ))}
            </Box>

            {/* Tab list + add button */}
            <Box ref={containerRef} sx={{ flex: 1, minWidth: 0, overflow: "hidden", display: "flex", alignItems: "center" }}>
              <TabList
                variant="scrollable"
                scrollButtons={false}
                onChange={(_, v) => setActiveDossierId(v)}
                sx={{
                  minHeight: "36px",
                  "& .MuiTabs-scroller": {
                    overflowX: "auto !important",
                    "&::-webkit-scrollbar": { height: "3px" },
                    "&::-webkit-scrollbar-thumb": { backgroundColor: "#c1c1c1", borderRadius: "999px" },
                  },
                }}
              >
                {visibleDossiers.map(d => (
                  <Tab
                    key={d.id}
                    value={d.id}
                    label={
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        {d.name}
                        {dossierFilter === "all" && <StatusChip status={d.status} />}
                        {(d.isNew || d.pendingBookingIds.length > 0) && <Dot />}
                      </Box>
                    }
                    disableRipple
                    sx={{ minHeight: "36px", py: 0.5, px: 1.5, fontSize: "12px", textTransform: "none", minWidth: "auto" }}
                  />
                ))}
              </TabList>
              <IconButton size="small" onClick={createNewDossier} sx={{ flexShrink: 0 }}>
                <AddIcon sx={{ fontSize: "18px" }} />
              </IconButton>
            </Box>

            {/* Overflow menu */}
            <Button
              size="small" variant="outlined" disableRipple
              onClick={(e) => hasOverflow && setOverflowAnchor(e.currentTarget)}
              sx={{ minWidth: 0, px: 0.5, height: "28px", flexShrink: 0, ml: 0.5, visibility: hasOverflow ? "visible" : "hidden" }}
            >
              <MoreVertIcon sx={{ fontSize: "16px" }} />
            </Button>
            <Menu anchorEl={overflowAnchor} open={Boolean(overflowAnchor)} onClose={() => setOverflowAnchor(null)} slotProps={{ paper: { sx: { mt: 0.5, minWidth: 160 } } }}>
              {overflowDossiers.map(d => (
                <MenuItem
                  key={d.id}
                  selected={d.id === activeTabValue}
                  onClick={() => { setActiveDossierId(d.id); setOverflowAnchor(null); }}
                  sx={{ fontSize: "13px", gap: 1 }}
                >
                  {d.name}
                  {dossierFilter === "all" && <StatusChip status={d.status} />}
                  {(d.isNew || d.pendingBookingIds.length > 0) && <Dot />}
                </MenuItem>
              ))}
            </Menu>

            {/* Pagination */}
            {showPagination && (
              <>
                <Divider orientation="vertical" flexItem sx={{ mx: 0.5, my: "auto", height: "18px" }} />
                <Tooltip title="Previous dossier">
                  <span><IconButton size="small" onClick={goToPrev} disabled={!hasPrev} sx={{ p: 0.25 }}><ChevronLeftIcon sx={{ fontSize: "16px" }} /></IconButton></span>
                </Tooltip>
                <Typography sx={{ fontSize: "11px", color: "text.secondary", whiteSpace: "nowrap", mx: 0.25, userSelect: "none" }}>
                  {currentIndex + 1} / {filteredDossiers.length}
                </Typography>
                <Tooltip title="Next dossier">
                  <span><IconButton size="small" onClick={goToNext} disabled={!hasNext} sx={{ p: 0.25 }}><ChevronRightIcon sx={{ fontSize: "16px" }} /></IconButton></span>
                </Tooltip>
              </>
            )}
          </Box>

          {/* Render panels for all dossiers so content is preserved across filter switches */}
          {dossiers.map(d => (
            <TabPanel key={d.id} value={d.id} sx={{ padding: 0, height: "calc(100% - 37px)", overflow: "hidden" }}>
              <DossierTabContent dossier={d} onAccept={() => acceptDossier(d.id)} onCancel={() => cancelDossier(d.id)} />
            </TabPanel>
          ))}
        </TabContext>
      )}
    </Box>
  );
};

export default DownComponent;
