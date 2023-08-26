import { styled } from '@mui/system';
import Button from '@mui/material/Button';

export const Header = styled('header')({
  position: 'relative',
  height: 80,
  border: '1px solid #dcdcdc'

  // '&::before': { 
  //   content: '""',
  //   width: '100%',
  //   boxShadow: 'inset 0 -1px 0 #dcdcdc',
  //   height: '1px',
  //   margin: '75px 0',
  //   left: 0,
  // },
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