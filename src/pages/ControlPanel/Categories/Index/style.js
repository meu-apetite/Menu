import { styled } from '@mui/system';

export const ContainerCategories = styled('section')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2)
}));

export const ContainerCategory = styled('div')(({ theme }) => ({
  border: '1px solid #e0e1e0', 
}));


export const HeaderCategory = styled('div')(({ theme }) => ({
  background: '#f1f3f1',
  padding: `${theme.spacing(2)} ${theme.spacing(3)}`,
  fontWeight: 'bold'
}));

export const BodyCategory = styled('div')(({ theme }) => ({
  borderTop: '1px solid #e0e1e0', 
  padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
}));

