import { styled } from '@mui/system';
import { AccordionDetails } from '@mui/material';

export const AccordionDetailsCustom = styled(AccordionDetails)({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(48%, 1fr))',
  gap: '1.6rem',
  // padding:'8px 12px',
  ':hover': {

  },
  '@media(min-width: 768px)': {
    padding: '8px 16px 16px'
  }
});