import { styled } from '@mui/system';

export const SectionChart = styled('section')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  '@media(min-width: 992px)': {
    gridTemplateColumns: '1fr 1fr',
  }
}));