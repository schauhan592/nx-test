import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { ReactNode } from 'react';

export default function CustomAccordian({
  expanded,
  summary,
  details,
  expandIcon,
  onClick,
}: {
  expanded?: boolean;
  summary: ReactNode;
  details: ReactNode;
  expandIcon?: ReactNode;
  onClick?: () => void;
}) {
  return (
    <>
      <Accordion
        expanded={expanded}
        style={{ boxShadow: 'none', borderRadius: 0 }}
        sx={{ background: 'none', p: 0 }}
      >
        <AccordionSummary
          onClick={onClick}
          expandIcon={expandIcon}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{ padding: 0 }}
        >
          {summary}
        </AccordionSummary>
        <AccordionDetails sx={{ padding: 0, height: '100%' }}>{details}</AccordionDetails>
      </Accordion>
    </>
  );
}
