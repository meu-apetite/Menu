import {
  Avatar,
  InputBase,
  Typography,
  Box,
  AppBar,
  Toolbar,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBag from '@mui/icons-material/ShoppingBag';
import { Search } from '@mui/icons-material';
import { styled } from '@mui/system';
import {  useNavigate } from 'react-router-dom';

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: { width: '20ch' },
  },
}));

const NavMenu = ({ title, logoUrl, quantityProdcut, priceTotal, toBag }) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Avatar alt={`Logomarca ${title}`} src={logoUrl} />
          <Typography
            variant="h6"
            noWrap
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            {title}
          </Typography>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              sx={{ zIndex: 9999 }}
              placeholder="Pequise aqui..."
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ background: '#' }}>
            <IconButton size="large" color="inherit" onClick={() => navigate(toBag)}>
              <Typography sx={{ fontSize: '0.8rem' }}>
                {priceTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </Typography>
              <ShoppingBag />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavMenu;
