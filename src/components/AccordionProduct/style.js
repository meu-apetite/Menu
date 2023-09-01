import { styled } from '@mui/system';
import { AccordionDetails } from '@mui/material';

export const AccordionDetailsCustom = styled(AccordionDetails)({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(48%, 1fr))',
  gap: '1.6rem',
  '@media(min-width: 768px)': {
    padding: '8px 16px 16px'
  }
});


export const Title = styled('h3')({
  margin: '0.4rem 0',
  fontSize: '1.2rem',
  textTransform: 'capitalize'
});