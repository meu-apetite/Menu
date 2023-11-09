import { styled } from '@mui/system';
import { Button } from '@mui/material';

export const Header = styled('header')({
  position: 'relative',
  border: '1px solid #dcdcdc',
  display: 'flex',
  justifyContent: 'center',
  padding: '0.6rem 0'
});

export const Logo = styled('img')({
  width: 60,
  height: 60
});

export const Icon = styled('img')({
  width: '24px',
  position: 'relative',
  top: '-1px',
  marginRight: '14px'
});

export const ButtonDefault = styled(Button)({
  fontSize: '1rem',
  gap: '16px',
  height: '48px',
  textTransform: 'capitalize',
  width: '100%',
  margin: 'auto',
  marginTop: '16px'
});

export const Title = styled('h2')({
  marginTop: '1rem'
});

export const Main = styled('div')({
  marginBottom: '1rem'
});
