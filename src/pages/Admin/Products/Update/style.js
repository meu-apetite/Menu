import { styled } from '@mui/system';

export const ImageProduct = styled('img')({
  width: '100%',
  height: '200px',
  objectFit: 'cover',
  border: '1px solid #c6c6c6',
  borderRadius: '8px'
});

export const wrapperIntro = styled('div')({
  display: 'grid',
  gridTemplateColumns: '1fr',
  paddingLeft: '1rem',
  gap: '1rem',
  width: '100%',
  '@media(min-width: 576px)': {
    gridTemplateColumns: 'minmax(200px, 3fr) 9fr',    
  },
});

