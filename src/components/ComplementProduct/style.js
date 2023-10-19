import { styled } from '@mui/material/styles'

export const WrapperBtnNewGroup = styled('div')(({ theme }) => ({
  display: 'flex', 
  justifyContent: 'end', 
  flexWrap: 'wrap', 
  gap: 1
}));

export const WrapperOption = styled('div')(({ theme }) => ({
  width: '100%',
  marginLeft: '1rem',
  marginTop: '1rem',
  marginBottom: '1rem',
  padding: '16px 12px',
  display: 'grid',
  gap: '16px',
  gridTemplateColumns: '1fr',    
  border: '1px solid #c4c4c4',
  borderRadius: '4px',
  position: 'relative',
  '@media(min-width: 576px)': {
    gridTemplateColumns: '8fr 4fr',
  },
  '.info': {
    position: 'absolute',
    top: '-24px',
    right: '24px',
    display: 'flex',
    justifyContent: 'center',
    background: theme.palette.primary.main,
    padding: '4px',
    color: '#fff',
    fontWeight: 'bold',
    borderRadius: '8px',
    padding: '4px'
  }
}));