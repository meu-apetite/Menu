import { styled } from '@mui/system';
import { Accordion, AccordionDetails, Box, Button, Card, CardContent, CardMedia, Dialog } from '@mui/material';

const headerNavHeight = '64px';

export const Container = styled('div')({
  margin: 'auto',
  maxWidth: '1200px'
});

export const WrapperNav = styled('nav')({
  position: 'fixed',
  top: 0,
  width: '100%',
  zIndex: 2
});

export const Intro = styled(Box)(({ theme, backgroundimage }) => ({
  position: 'relative',
  height: '340px',
  background: `url(${backgroundimage})`,
  backgroundSize: 'cover',
  backgroundPosition: '50%',
  backgroundColor: '#f4f8f9',
  backgroundRepeat: 'no-repeat',
  backgroundColor: 'rgba(0,0,0,0.6)',
  backgroundBlendMode: 'overlay',
  marginTop: headerNavHeight,
  display: 'flex',  
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
}));

export const WrapperBagShopping = styled(Box)(({ theme }) =>({
  display: { md: 'flex' }, 
  [theme.breakpoints.down(700)]: { display: 'none' } 
}));

export const WrapperTabs = styled('div')({
  position: 'sticky',
  top: headerNavHeight,
  background: '#fff',
  paddingTop: '0.4rem',
  paddingBottom: '0.4rem',
  zIndex: 3,
});

export const Logo = styled('img')({
  height: 100,
  width: 100,
  borderRadius: '50%',
  // marginTop: -56
});

export const TitleCompany = styled('h2')({
  fontSize: '2rem', 
  fontWeight: 'bold', 
  color: '#fff', 
  textTransform: 'uppercase',
  marginTop: '1rem'
});

export const TextAddress = styled('span')({
  fontSize: '0.8rem', 
  color: '#fff', 
});

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

export const Title = styled('h3')({
  margin: '0.4rem 0',
  fontSize: '1.2rem',
  textTransform: 'capitalize'
});

export const ButtonCart = styled(Button)(({ theme }) =>({
  position: 'fixed', 
  bottom: 8, 
  right: '20px', 
  left: '50%',
  width: '80%',
  display: 'flex',
  justifyContent: 'space-between',
  padding: '4px 12px',
  maxWidth: '450px',
  transform: 'translateX(-50%)',
  background: `${theme.palette.primary.main}`,
  height: '52px'
}));

export const Footer = styled('footer')(({ theme }) =>({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(4, 0),
  marginTop: '4rem'
}));

export const CardCustom = styled(Card)({
  backgroundColor: ' #ffffff',
  border: '1px solid transparent',
  boxShadow: '1px 1px 1px rgba(0, 0, 0, 0.09)',
  borderRadius: 4,
  '@media (min-width: 768px)': {
    boxShadow: '1px 1px 1px rgba(0, 0, 0, 0.09)'
  },
});

export const CardMediaCustom = styled(CardMedia)({
  width: 100,
  height: 100,
  borderRadius: 6
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

export const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));