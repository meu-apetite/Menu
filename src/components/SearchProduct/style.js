
import { styled } from '@mui/system';
import { Autocomplete, TextField } from "@mui/material";

export const AutocompleteCustom = styled(Autocomplete)(({ theme }) => ({
  '&:hover': { border: 'none' }, 
  '.MuiInputBase-root': { padding: '1px', color: '#ffffff' },
  width: '100%', 
  maxWidth: '240px', 
  '@media(min-width: 500px)': {  maxWidth: '300px' }
}));

export const TextFieldCustom = styled(TextField)(({ theme }) => ({
  color: 'inherit',
  padding: '0 !important',
  '& #dialog': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    hright: '38px'
  },
}));

export const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: 'rgba(255,255,255,0.15)',
  '&:hover': { backgroundColor: 'rgba(255,255,255,0.25)' },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
  },
  '.MuiOutlinedInput-notchedOutline': {
    borderWidth: 0
  }
}));

export const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));