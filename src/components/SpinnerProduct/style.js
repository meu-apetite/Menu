import { Accordion, AccordionDetails, CardContent } from '@mui/material';
import { styled } from '@mui/system';

export const AccordionCustom = styled(Accordion)(({ theme }) => ({
  borderTop: `2px solid ${theme.palette.primary.main}`, 
  marginBottom: 90,
}));

export const AccordionDetailsCustom = styled(AccordionDetails)({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(48%, 1fr))',
  gap: '1.6rem',
  '@media(min-width: 768px)': { padding: '8px 16px 16px'}
});

export const CardContentCustom = styled(CardContent)({
  display: 'grid',
  gridTemplateColumns: '1fr 100px',
  gap: '15px',
  cursor: 'pointer'
});

export const CardInfo = styled('div')({
  display: 'grid',
  gridTemplateRows: '1fr 20px',
  margin: 0,
});
