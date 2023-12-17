import { Card, CardContent, CardMedia, Dialog, DialogContent, Toolbar } from '@mui/material';
import { styled } from '@mui/system';

export const CardCustom = styled(Card)({
  backgroundColor: ' #ffffff',
  border: '1px solid transparent',
  boxShadow: '1px 1px 1px rgba(0, 0, 0, 0.09)',
  borderRadius: 4,
  '@media (min-width: 768px)': {
    boxShadow: '1px 1px 1px rgba(0, 0, 0, 0.09)'
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
  cursor: 'pointer'
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
  display: '-webkit-box',
  '-webkit-line-clamp': '2',
  '-webkit-box-orient': 'vertical',
});

export const Description = styled('p')({
  textOverflow: 'ellipsis',
  fontSize: '.9rem',
  lineHeight: '1.25rem',
  wordWrap: 'break-word',
  overflow: 'hidden',
  whiteSpace: 'pre-line',
  visibility: 'visible',
  display: '-webkit-box',
  wbkitLineClamp: '2',
  wbkitboxOrient: 'vertical',
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

export const DialogCustom = styled(Dialog)({
  '.css-m9glnp-MuiPaper-root-MuiDialog-paper': {
    background: 'transparent',
    boxShadow: 'none',
    maxHeight: '700px',  
  }
});

export const DialogContentCustom = styled(DialogContent)({
  padding: 0, 
  backgroundColor: '#ffffff', 
  maxWidth: '700px', 
  height: '700px',  
  width: `700px`,
  margin: 'auto'
});

export const ToolbarCustom = styled(Toolbar)(({ theme }) => ({
  background: theme.palette.primary.main,
  color: '#ffffff',
  width: '700px',
  margin: 'auto'    
}));