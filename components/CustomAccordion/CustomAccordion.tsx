"use client";

import { useState } from "react";
import { Accordion, AccordionSummary, AccordionDetails, SxProps, Theme } from "@mui/material";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";

interface CustomAccordionProps {
  header: React.ReactNode;
  body: React.ReactNode;
  accordionSx?: SxProps<Theme>;
}

const CustomAccordion = ({ header, body, accordionSx }: CustomAccordionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Accordion
      expanded={isExpanded}
      onChange={() => setIsExpanded((prev) => !prev)}
      sx={{
        boxShadow: "none",
        "&::before": { opacity: "1 !important" },
        "&.Mui-expanded": {
          margin: "0px",
        },
        ...accordionSx,
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{
          minHeight: "48px !important",
          maxHeight: "48px",
          "& .MuiAccordionSummary-content": { margin: "0px", alignItems: "center" },
        }}
      >
        {header}
      </AccordionSummary>
      <AccordionDetails>{body}</AccordionDetails>
    </Accordion>
  );
};

export default CustomAccordion;