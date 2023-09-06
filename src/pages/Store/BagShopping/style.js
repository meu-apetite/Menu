import { styled } from '@mui/system';
import Button from '@mui/material/Button';

export const Header = styled('header')({
  position: 'relative',
  border: '1px solid #dcdcdc',
  display: 'flex',
  justifyContent: 'center',
  padding: '0.6rem 0'
  // '&::before': { 
  //   content: '""',
  //   width: '100%',
  //   boxShadow: 'inset 0 -1px 0 #dcdcdc',
  //   height: '1px',
  //   margin: '75px 0',
  //   left: 0,
  // },
});

export const Title = styled('h2')({
  marginTop: '1rem'
});

export const SubTitle = styled('h4')({
  marginTop: '1rem',
  fontSize: '1rem'
});

export const WrapperTabs = styled('div')(({ theme, top }) => ({
  position: 'sticky',
  top: top,
  background: '#fff',
  paddingTop: '0.4rem',
  paddingBottom: '0.4rem',
  zIndex: 998,
}));

export const WrapperTotal = styled('div')({
  display: 'flex',
  gap: '0.4rem',
  justifyContent: 'end'
});

export const ButtonAddress = styled(Button)({
  fontSize: '1rem',
  gap: '16px',
  height: '48px',
  textTransform: 'capitalize',
  marginTop: '16px'
  // display: 'flex',
  // justifyContent: 'space-between',
  // alignItems: 'center',
  // padding: 0,
  // background: 'transparent'
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
  '@media (min-width: 600px)':  {
    width: '40%',
    maxWidth: '400px',
  }
});

export const Logo = styled('img')({
  width: 60,
  height: 60
});

export const WrapperAddress = styled('div')({
  padding: '1rem 0'
});