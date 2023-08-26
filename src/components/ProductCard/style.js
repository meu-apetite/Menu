import { Card, CardContent, CardMedia } from '@mui/material';
import { styled } from '@mui/system';

export const ModalContainer = styled('div')({
  background: 'rgba(113,113,113,.4)',
  display: 'flex',
  flexDirection: 'column',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  minHeight: '100%',
  zIndex: 1100,
});

export const ModalContent = styled('div')({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  borderRadius: 4,
  boxShadow: 24,
  padding: 4,
  height: '100%',
  width: '100%',
  overflow: 'hidden',
  background: '#fff',
  '@media (min-width: 768px)': {
    height: '85%',
    maxHeight: '800px',
    maxWidth: '700px',
  },
});

export const CardCustom = styled(Card)({
  backgroundColor: ' #ffffff',
  border: '1px solid transparent',
  boxShadow: '0 1px 1px rgba(0, 0, 0, 0.09)',
  borderRadius: 4,
  '@media (min-width: 768px)': {
    boxShadow: '0 1px 1px rgba(0, 0, 0, 0.09)'
  },
});

export const CardMediaCustom = styled(CardMedia)({
  width: 100,
  height: 100,
  borderRadius: 6
});

export const CardContentCustom = styled(CardContent)({
  display: 'grid',
  gridTemplateColumns: '1fr 100px',
  gap: '15px',
});

export const CardInfo = styled('div')({
  display: 'grid',
  gridTemplateRows: '1fr 20px',
  margin: 0,
});

export const TitleProduct = styled('h3')({
  color: '#3e3e3e',
  fontWeight: 400,
  fontSize: '1rem',
  lineHeight: '1.25rem',
  marginTop: 5,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  '-webkit-box-orient': 'vertical',
  display: '-webkit-box',
  ' -webkit-line-clamp': 2,
});

export const Description = styled('p')({
  textOverflow: 'ellipsis',
  fontSize: '.75rem',
  lineHeight: '1.25rem',
  wordWrap: 'break-word',
  overflow: 'hidden',
  whiteSpace: 'pre-line',
  visibility: 'visible',
  display: '-webkit-box',
  '-webkit-line-clamp': '2',
  '-webkit-box-orient': 'vertical',
  color: '#717171',
  fontWeight: '300',
  '@media (min-width: 768px)': {
    fontSize: '.877rem',
    lineHeight: '1.25rem'
  },
});

export const Price = styled('span')({
  fontSize: '1rem',
  lineHeight: '1.25rem',
  fontWeight: '400',
  color: '#3e3e3e',
});
