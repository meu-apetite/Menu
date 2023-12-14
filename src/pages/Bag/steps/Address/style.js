import { styled } from '@mui/system';
import Button from '@mui/material/Button';
import { Menu } from '@mui/material';

export const WrapperTabs = styled('div')(({ theme, top }) => ({
  position: 'sticky',
  top: top,
  background: '#fff',
  paddingTop: '0.4rem',
  paddingBottom: '0.4rem',
  zIndex: 3,
}));

export const WrapperTotal = styled('div')({
  display: 'flex',
  gap: '0.4rem',
  justifyContent: 'end'
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

export const ButtonCustom = styled(Button)({
  bottom: 8, 
  fontSize: '1rem',
  gap: '16px',
  width: '100%',
  margin: 'auto',
  height: '48px',
  marginTop: '16px',
  left: '50%', 
  transform: 'translateX(-50%)',
  '@media (min-width: 600px)':  { width: '40%', maxWidth: '400px' }
});

export const WrapperAddress = styled('div')({
  padding: '1rem 0'
});

export const WrapperButtons = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  width: '100%',
  gap: '16px',
  '@media (min-width: 600px)':  { flexWrap: 'nowrap' }
});

export const Icon = styled('img')({
  width: '24px',
  position: 'relative',
  top: '-1px',
  marginRight: '14px'
});

export const Header = styled('header')({
  position: 'relative',
  border: '1px solid #dcdcdc',
  display: 'flex',
  justifyContent: 'center',
  padding: '0.6rem 0'
});

export const Title = styled('h2')({
  marginTop: '1rem'
});

export const SubTitle = styled('h4')({
  marginTop: '1rem',
  fontSize: '1rem'
});

export const Logo = styled('img')({
  width: 60,
  height: 60,
  borderRadius: '50%'
});