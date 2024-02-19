import { styled } from '@mui/system';
import Button from '@mui/material/Button';

export const ButtonNext = styled(Button)({
  position: 'fixed',
  bottom: 8, 
  fontSize: '1rem',
  gap: '16px',
  width: '95%',
  margin: 'auto',
  height: '48px',
  marginTop: '16px',
  left: '50%', 
  transform: 'translateX(-50%)',
  maxWidth: '400px'
});