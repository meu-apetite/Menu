import { styled } from '@mui/material/styles'

export const Header = styled('header')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  '& h1': {
    margin: 0,
    fontSize: '1.8rem'
  },
}))
