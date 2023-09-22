import { styled } from '@mui/material/styles'

export const Header = styled('header')(({ theme }) => ({
  flexWrap: 'wrap',
  gap: '1rem',
  display: 'flex', 
  alignItems: 'center', 
  justifyContent: 'space-between',
  margin: `${theme.spacing(2)} 0 ${theme.spacing(4)}`,
  '& h1': {
    margin: 0,
    fontSize: '1.6rem',
  },
}))
