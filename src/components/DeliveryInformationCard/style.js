import { Button } from '@mui/material';
import { styled } from '@mui/system';

export const WrapperButtons = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  width: '100%',
  gap: '16px',
  '@media (min-width: 600px)':  { flexWrap: 'nowrap' }
});

export const ButtonDefault = styled(Button)({
  fontSize: '1rem',
  gap: '16px',
  height: '48px',
  textTransform: 'capitalize',
  marginTop: '16px',
  width: '100%',
  margin: 'auto',
  marginTop: '16px'
});
