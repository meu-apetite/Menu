import { styled } from '@mui/system';
import Button from '@mui/material/Button';

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
  width: '100%',
  margin: 'auto',
  marginTop: '16px'
});

export const Logo = styled('img')({
  width: 60,
  height: 60,
  borderRadius: '50%',
  objectFit: 'cover'
});
