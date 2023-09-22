import { styled } from '@mui/system';
import { alpha } from '@mui/material/styles';
import { Accordion, AccordionDetails, Box, Button, InputBase } from '@mui/material';

const headerNavHeight = '60px';

export const Container = styled('div')({
  margin: 'auto',
  maxWidth: '1200px'
});

export const WrapperNav = styled('nav')({
  position: 'fixed',
  top: 0,
  width: '100%',
  zIndex: 1000
});

export const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': { backgroundColor: alpha(theme.palette.common.white, 0.25) },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

export const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%', [theme.breakpoints.up('md')]: { width: '20ch' }
  },
}));

export const Intro = styled(Box)({
  height: '200px',
  background: 'url(https://files.menudino.com/cardapios/9621/capa.jpg)',
  backgroundSize: 'cover',
  backgroundPosition: '50%',
  backgroundColor: '#f4f8f9',
  backgroundRepeat: 'no-repeat',
  backgroundColor: 'rgba(0,0,0,.7)',
  backgroundBlendMode: 'overlay',
  marginTop: headerNavHeight,
  display: 'flex',  
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  '@media (min-width: 768px)': { height: '250px' },
});

export const WrapperTabs = styled('div')({
  position: 'sticky',
  top: headerNavHeight,
  background: '#fff',
  paddingTop: '0.4rem',
  paddingBottom: '0.4rem',
  zIndex: 998,
});

export const Logo = styled('img')({
  height: 42,
  width: 'auto'
});

export const AccordionCustom = styled(Accordion)(({ theme }) => ({
  borderTop: `2px solid ${theme.palette.primary.main}`, 
  marginBottom: 32
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
  padding: '4px 8px',
  maxWidth: '450px',
  transform: 'translateX(-50%)',
  // background: `${theme.palette.secondary.main}`
}));