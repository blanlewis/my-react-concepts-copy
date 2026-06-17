"use client";

import { Fragment, useMemo, useState, useRef, useLayoutEffect } from "react";
import {
  Box, Button, Checkbox, Chip, Divider, IconButton, Menu, MenuItem,
  Tab, Tooltip, Typography,
} from "@mui/material";
import ChevronLeftIcon        from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon       from "@mui/icons-material/ChevronRight";
import MoreVertIcon           from "@mui/icons-material/MoreVert";
import AddIcon                from "@mui/icons-material/Add";
import InfoOutlinedIcon       from "@mui/icons-material/InfoOutlined";
import SettingsOutlinedIcon   from "@mui/icons-material/SettingsOutlined";
import OutlinedFlagIcon       from "@mui/icons-material/OutlinedFlag";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import ContentCopyIcon        from "@mui/icons-material/ContentCopy";
import ChatBubbleOutlineIcon  from "@mui/icons-material/ChatBubbleOutlineOutlined";
import PersonOutlineIcon      from "@mui/icons-material/PersonOutlineOutlined";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import useResizeObserver from "use-resize-observer";
import { useCustomHook } from "@/app/utils/hook";
import { Dossier, DossierStatus } from "@/app/utils/types";
import { BOOKINGS_DATA } from "@/app/utils/bookingsData";
import { DOSSIER_PANEL_CONTENT, DossierRow } from "@/app/utils/dossierContentData";
import CustomToggleButton from "@/components/CustomToggleButton";
import { DateFilter, DropdownFilter } from "@/components/BookingFilters/BookingFilters";

// ─── Status meta ────────────────────────────────────────────────────────────

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

// ─── Route bar icons ─────────────────────────────────────────────────────────

const ROUTE_STEPS = [
  <SettingsOutlinedIcon    key="s1" sx={{ fontSize: 10 }} />,
  <OutlinedFlagIcon        key="f1" sx={{ fontSize: 10 }} />,
  <SettingsOutlinedIcon    key="s2" sx={{ fontSize: 10 }} />,
  <LocalShippingOutlinedIcon key="t1" sx={{ fontSize: 10 }} />,
  <OutlinedFlagIcon        key="f2" sx={{ fontSize: 10 }} />,
  <LocalShippingOutlinedIcon key="t2" sx={{ fontSize: 10 }} />,
];

const RouteBar = () => (
  <Box sx={{ flex: 1, display: "flex", alignItems: "center", mx: 2 }}>
    {ROUTE_STEPS.map((icon, i) => (
      <Fragment key={i}>
        {i > 0 && <Box sx={{ flex: 1, borderTop: "1px dashed #D0D0D0", mx: 0.25 }} />}
        <Box
          sx={{
            width: 18, height: 18, borderRadius: "50%",
            border: "1px solid #D5D7DA",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "text.disabled", flexShrink: 0, bgcolor: "background.paper",
          }}
        >
          {icon}
        </Box>
      </Fragment>
    ))}
  </Box>
);

// ─── Column layout ────────────────────────────────────────────────────────────

const COL = {
  check:    "30px",
  icon:     "22px",
  company:  "150px",
  date:     "62px",
  etd:      "50px",
  unitType: "72px",
  goodType: "72px",
  lcKg:     "88px",
  ldm:      "72px",
  economy:  "105px",
};

const ColHd = ({ label, align = "left", width, flex }: { label: string; align?: "left" | "right"; width?: string; flex?: string }) => (
  <Typography
    noWrap
    sx={{ fontSize: "11px", color: "text.secondary", fontWeight: 500, width, flex, textAlign: align, flexShrink: 0 }}
  >
    {label}
  </Typography>
);

// ─── Panel row: booking ───────────────────────────────────────────────────────

const BookingTableRow = ({ row }: { row: Extract<DossierRow, { type: "booking" }> }) => {
  const neg = row.isNegative;
  return (
    <Box
      sx={{
        display: "flex", alignItems: "center",
        px: 1, py: 0.6,
        borderBottom: "1px solid", borderColor: "divider",
        "&:hover": { bgcolor: "action.hover" },
      }}
    >
      <Checkbox size="small" sx={{ p: 0, width: COL.check, flexShrink: 0 }} />
      {/* Circle icon */}
      <Box
        sx={{
          width: 18, height: 18, borderRadius: "50%",
          bgcolor: "#1565C0", display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0, mr: 0.75,
        }}
      >
        <Box sx={{ width: 5, height: 5, borderRadius: "50%", bgcolor: "white" }} />
      </Box>
      {/* Location */}
      <Typography
        noWrap
        sx={{ flex: 1, fontSize: "12px", fontWeight: neg ? 400 : 500, color: neg ? "text.secondary" : "text.primary", minWidth: 0 }}
      >
        {row.location}
      </Typography>
      {/* Company */}
      <Typography noWrap sx={{ width: COL.company, fontSize: "12px", color: "#1565C0", flexShrink: 0 }}>
        {row.company}
      </Typography>
      {/* Date */}
      <Typography sx={{ width: COL.date, fontSize: "12px", color: "text.secondary", flexShrink: 0 }}>{row.date}</Typography>
      {/* ETD */}
      <Typography sx={{ width: COL.etd, fontSize: "12px", color: "text.secondary", flexShrink: 0 }}>{row.etd}</Typography>
      {/* Unit type */}
      <Typography sx={{ width: COL.unitType, fontSize: "12px", color: neg ? "error.main" : "text.primary", flexShrink: 0 }}>
        {row.unitType}
      </Typography>
      {/* Good type */}
      <Typography sx={{ width: COL.goodType, fontSize: "12px", color: "text.secondary", flexShrink: 0 }}>{row.goodType}</Typography>
      {/* LC (kg) */}
      <Typography sx={{ width: COL.lcKg, fontSize: "12px", color: neg ? "error.main" : "text.primary", textAlign: "right", flexShrink: 0 }}>
        {row.lcKg}
      </Typography>
      {/* LDM */}
      <Typography sx={{ width: COL.ldm, fontSize: "12px", color: neg ? "error.main" : "text.primary", textAlign: "right", flexShrink: 0 }}>
        {row.ldm}
      </Typography>
      {/* Economy */}
      <Typography sx={{ width: COL.economy, fontSize: "12px", color: "text.secondary", textAlign: "right", flexShrink: 0 }}>
        {row.economy}
      </Typography>
    </Box>
  );
};

// ─── Panel row: via stop ──────────────────────────────────────────────────────

const ViaTableRow = ({ row }: { row: Extract<DossierRow, { type: "via" }> }) => (
  <Box
    sx={{
      display: "flex", alignItems: "center",
      px: 1, py: 0.75,
      borderBottom: "1px solid", borderColor: "divider",
    }}
  >
    <Checkbox size="small" sx={{ p: 0, width: COL.check, flexShrink: 0 }} />
    <Box
      sx={{
        width: 18, height: 18, borderRadius: "50%",
        bgcolor: "#37474F",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0, mr: 0.75,
      }}
    >
      <Box sx={{ width: 5, height: 5, borderRadius: "50%", bgcolor: "white" }} />
    </Box>
    <Typography sx={{ fontSize: "12px", fontWeight: 700, letterSpacing: 0.3 }}>
      {row.location}
    </Typography>
  </Box>
);

// ─── Dossier tab content ──────────────────────────────────────────────────────

const DossierTabContent = ({
  dossier,
  onAccept,
  onCancel,
}: {
  dossier: Dossier;
  onAccept: () => void;
  onCancel: () => void;
}) => {
  const pendingBookings = BOOKINGS_DATA.filter(b => dossier.pendingBookingIds.includes(b.id));
  const content = DOSSIER_PANEL_CONTENT[dossier.id];
  const statusMeta = STATUS_META[dossier.status];

  if (!content) {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Typography sx={{ fontSize: "13px", color: "text.secondary", textAlign: "center" }}>
            No bookings yet — check a booking above to add it here.
          </Typography>
        </Box>
        {pendingBookings.length > 0 && (
          <Box sx={{ borderTop: "1px solid", borderColor: "divider", px: 1.5, py: 1, display: "flex", gap: 1, justifyContent: "flex-end", flexShrink: 0 }}>
            <Button variant="outlined" size="small" onClick={onCancel} sx={{ textTransform: "none", fontSize: "12px" }}>Cancel</Button>
            <Button variant="contained" size="small" onClick={onAccept} sx={{ textTransform: "none", fontSize: "12px" }}>Accept</Button>
          </Box>
        )}
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>

      {/* ── Header: origin → route icons → destination ── */}
      <Box
        sx={{
          display: "flex", alignItems: "center",
          px: 2, py: 0.75,
          borderBottom: "1px solid", borderColor: "divider",
          flexShrink: 0,
        }}
      >
        <Box sx={{ flexShrink: 0 }}>
          <Typography sx={{ fontSize: "12px", fontWeight: 700, lineHeight: 1.3 }}>{content.origin}</Typography>
          <Typography sx={{ fontSize: "11px", color: "text.secondary", lineHeight: 1.2 }}>{content.originDate}</Typography>
        </Box>

        <RouteBar />

        <Box sx={{ textAlign: "right", flexShrink: 0 }}>
          <Typography sx={{ fontSize: "12px", fontWeight: 700, lineHeight: 1.3 }}>{content.destination}</Typography>
          <Typography sx={{ fontSize: "11px", color: "text.secondary", lineHeight: 1.2 }}>{content.destinationDate}</Typography>
        </Box>
      </Box>

      {/* ── Sub-header: status chip | number | actions | stats ── */}
      <Box
        sx={{
          display: "flex", alignItems: "center", gap: 0.75,
          px: 1.5, py: 0.6,
          borderBottom: "1px solid", borderColor: "divider",
          flexShrink: 0,
        }}
      >
        <Chip
          label={statusMeta.label}
          size="small"
          sx={{ height: 20, fontSize: "11px", fontWeight: 600, bgcolor: statusMeta.bg, color: statusMeta.color, borderRadius: "4px", "& .MuiChip-label": { px: 0.75 } }}
        />
        <Typography sx={{ fontSize: "12px", color: "text.secondary", fontFamily: "monospace", letterSpacing: 0.3 }}>
          {content.dossierNumber}
        </Typography>
        <IconButton size="small" sx={{ p: 0.25 }}><ContentCopyIcon       sx={{ fontSize: 14, color: "text.disabled" }} /></IconButton>
        <IconButton size="small" sx={{ p: 0.25 }}><ChatBubbleOutlineIcon sx={{ fontSize: 14, color: "text.disabled" }} /></IconButton>
        <IconButton size="small" sx={{ p: 0.25 }}><PersonOutlineIcon      sx={{ fontSize: 14, color: "text.disabled" }} /></IconButton>

        <Box sx={{ flex: 1 }} />

        <Typography sx={{ fontSize: "12px", color: "text.secondary" }}>{content.totalKg}</Typography>
        <Divider orientation="vertical" flexItem sx={{ mx: 0.5, height: "14px", my: "auto" }} />
        <Typography sx={{ fontSize: "12px", color: "text.secondary" }}>{content.totalLdm}</Typography>
        <Divider orientation="vertical" flexItem sx={{ mx: 0.5, height: "14px", my: "auto" }} />
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
          {content.isPriceNegative && (
            <Typography sx={{ fontSize: "12px", color: "error.main", fontWeight: 700 }}>↑↓</Typography>
          )}
          <Typography sx={{ fontSize: "12px", fontWeight: 600, color: content.isPriceNegative ? "error.main" : "text.primary" }}>
            {content.totalPrice}
          </Typography>
        </Box>
      </Box>

      {/* ── Column headers ── */}
      <Box
        sx={{
          display: "flex", alignItems: "center",
          px: 1, py: 0.5,
          borderBottom: "1px solid", borderColor: "divider",
          flexShrink: 0, bgcolor: "grey.50",
        }}
      >
        <Box sx={{ width: COL.check, flexShrink: 0 }} />
        <Box sx={{ width: COL.icon,  flexShrink: 0 }} />
        <ColHd label="Booking"   flex="1" />
        <ColHd label="Company"   width={COL.company} />
        <ColHd label="Date"      width={COL.date} />
        <ColHd label="ETD"       width={COL.etd} />
        <ColHd label="Type"      width={COL.unitType} />
        <ColHd label="Good type" width={COL.goodType} />
        <ColHd label="LC (kg)"   width={COL.lcKg}     align="right" />
        <ColHd label="LDM (ldm)" width={COL.ldm}      align="right" />
        <ColHd label="Economy"   width={COL.economy}  align="right" />
      </Box>

      {/* ── Scrollable rows ── */}
      <Box sx={{ flex: 1, overflowY: "auto" }}>
        {content.rows.map((row, i) =>
          row.type === "via"
            ? <ViaTableRow     key={i} row={row} />
            : <BookingTableRow key={i} row={row} />
        )}

        {/* Pending bookings appended below confirmed rows */}
        {pendingBookings.length > 0 && (
          <>
            <Box sx={{ px: 1.5, py: 0.5, bgcolor: "warning.50" }}>
              <Typography sx={{ fontSize: "11px", color: "warning.main", fontWeight: 600 }}>
                Pending ({pendingBookings.length})
              </Typography>
            </Box>
            {pendingBookings.map(bk => (
              <Box
                key={bk.id}
                sx={{
                  display: "flex", alignItems: "center",
                  px: 1, py: 0.6,
                  borderBottom: "1px solid", borderColor: "divider",
                  bgcolor: "action.hover", opacity: 0.85,
                }}
              >
                <Checkbox size="small" sx={{ p: 0, width: COL.check, flexShrink: 0 }} />
                <Box sx={{ width: 18, height: 18, borderRadius: "50%", bgcolor: "#ff9800", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, mr: 0.75 }}>
                  <Box sx={{ width: 5, height: 5, borderRadius: "50%", bgcolor: "white" }} />
                </Box>
                <Typography noWrap sx={{ flex: 1, fontSize: "12px", minWidth: 0 }}>
                  {bk.origin.country} - {bk.origin.postalCode} {bk.origin.city}
                </Typography>
                <Typography noWrap sx={{ width: COL.company, fontSize: "12px", color: "#1565C0", flexShrink: 0 }}>
                  {bk.origin.company}
                </Typography>
                <Typography sx={{ width: COL.date, fontSize: "12px", color: "text.secondary", flexShrink: 0 }}>--</Typography>
                <Typography sx={{ width: COL.etd,  fontSize: "12px", color: "text.secondary", flexShrink: 0 }}>--:--</Typography>
                <Typography sx={{ width: COL.unitType, fontSize: "12px", color: "text.secondary", flexShrink: 0 }}>
                  {bk.pallets != null ? `${bk.pallets} PLL` : "--"}
                </Typography>
                <Typography sx={{ width: COL.goodType, fontSize: "12px", color: "text.secondary", flexShrink: 0 }}></Typography>
                <Typography sx={{ width: COL.lcKg,  fontSize: "12px", textAlign: "right", flexShrink: 0 }}>{bk.weight ?? "--"}</Typography>
                <Typography sx={{ width: COL.ldm,   fontSize: "12px", textAlign: "right", flexShrink: 0 }}>{bk.ldm ?? "--"}</Typography>
                <Typography sx={{ width: COL.economy, fontSize: "12px", color: "text.secondary", textAlign: "right", flexShrink: 0 }}>
                  {bk.price} {bk.currency}
                </Typography>
              </Box>
            ))}
          </>
        )}
      </Box>

      {/* Accept / Cancel for pending bookings */}
      {pendingBookings.length > 0 && (
        <Box sx={{ borderTop: "1px solid", borderColor: "divider", px: 1.5, py: 1, display: "flex", gap: 1, justifyContent: "flex-end", flexShrink: 0 }}>
          <Button variant="outlined" size="small" onClick={onCancel} sx={{ textTransform: "none", fontSize: "12px" }}>Cancel</Button>
          <Button variant="contained" size="small" onClick={onAccept} sx={{ textTransform: "none", fontSize: "12px" }}>Accept</Button>
        </Box>
      )}

      {/* ── Footer: Expenses ── */}
      <Box
        sx={{
          display: "flex", alignItems: "center",
          px: 1.5, py: 0.75,
          borderTop: "1px solid", borderColor: "divider",
          flexShrink: 0,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <Typography sx={{ fontSize: "12px", color: "text.secondary" }}>Expenses</Typography>
          <InfoOutlinedIcon sx={{ fontSize: 13, color: "text.disabled" }} />
        </Box>
        <Box sx={{ flex: 1 }} />
        <Typography sx={{ fontSize: "12px", fontWeight: 700 }}>{content.expenses}</Typography>
      </Box>
    </Box>
  );
};

// ─── Main DownComponent ───────────────────────────────────────────────────────

const PLUS_BTN_W = 34;

const DownComponent = () => {
  const { dossiers, activeDossierId, setActiveDossierId, acceptDossier, cancelDossier, createNewDossier } = useCustomHook();
  const [dossierFilter, setDossierFilter] = useState("all");
  const [overflowAnchor, setOverflowAnchor] = useState<null | HTMLElement>(null);
  const [visibleCount, setVisibleCount] = useState(dossiers.length);

  const measureRef = useRef<HTMLDivElement>(null);
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

  const currentIndex   = filteredDossiers.findIndex(d => d.id === activeTabValue);
  const hasPrev        = currentIndex > 0;
  const hasNext        = currentIndex < filteredDossiers.length - 1;
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
                  {d.name}<Box sx={{ width: 6, height: 6, display: "inline-block" }} />
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

          {/* Panels rendered for all dossiers so content is preserved on filter switch */}
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
