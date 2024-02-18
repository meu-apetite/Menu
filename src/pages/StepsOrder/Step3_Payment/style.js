import { styled } from '@mui/system';

export const Header = styled('header')({
  position: 'relative',
  border: '1px solid #dcdcdc',
  display: 'flex',
  justifyContent: 'center',
  padding: '0.6rem 0'
});

export const Logo = styled('img')({
  width: 60,
  height: 60,
  borderRadius: '50%'
});

export const Title = styled('h2')({
  marginTop: '1rem'
});

export const Main = styled('div')({
  marginBottom: '80px'
});
