import { styled } from '@mui/system';
import Button from '@mui/material/Button';

export const Title = styled('h2')({
  marginTop: '1rem'
});

export const WrapperTotal = styled('div')({
  display: 'flex',
  gap: '10px',
  justifyContent: 'end',
  textAlign: 'end',
  marginTop: '8px',
  '.price': {
    textAlign: 'end', 
    color: '#3366CC',
    width: '70px'
  }
});


export const WrapperButton = styled('div')(({ theme }) => ({
  textAlign: 'center',
  marginTop: theme.spacing(2),
  'button': { width: '100%', maxWidth: '400px', minHeight: '48px'}
}));

export const ButtonDefault = styled(Button)({
  fontSize: '1rem',
  gap: '16px',
  height: '48px',
  textTransform: 'capitalize',
  width: '100%',
  margin: 'auto',
  marginTop: '16px',
});

export const Logo = styled('img')({
  width: 60,
  height: 60,
  borderRadius: '50%',
  objectFit: 'cover'
});
