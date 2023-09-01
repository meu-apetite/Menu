import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import { Avatar, Typography } from '@mui/material';
import { ApiService } from 'services/api.service';
import AccordionProduct from 'components/AccordionProduct';
import * as S from './style';

import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingBag from '@mui/icons-material/ShoppingBag';
import MoreIcon from '@mui/icons-material/MoreVert';
import { StoreContext } from 'contexts/store';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': { backgroundColor: alpha(theme.palette.common.white, 0.25) },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: { marginLeft: theme.spacing(3), width: 'auto' },
}));

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

const Store = () => {
  const apiService = new ApiService(false);
  const { search } = useLocation();
  const { total } = useContext(StoreContext);
  const id = search.replace('?', '');

  const [collections, setCollections] = useState([]);
  const [categories, setCategories] = useState();
  const [store, setStore] = useState();

  const getStore = async () => {
    const response = await apiService.get('/store/' + id);
    setStore(response.data);
  };

  const getProducts = async () => {
    const response = await apiService.get('/store/products/' + id);
    const products = response.data;
    const categories = [];
    const categoriesTitle = [];

    products.forEach((item) => {
      const categoryTitle = item.category?.title;
      if (!categoryTitle) return;

      const index = categories.findIndex((item) => item.title === categoryTitle);
      if (index >= 0) return categories[index].products.push(item);

      categories.push({ title: categoryTitle, products: [item] });
      categoriesTitle.push(categoryTitle);
    });

    setCollections(categories);
    setCategories(categoriesTitle);
  };

  useEffect(() => {
    getProducts();
    getStore();
  }, []);

  useEffect(() => {
    if ('Notification' in window) {
      console.log(Notification.permission);
      if (Notification.permission !== "granted") {
        Notification.requestPermission().then(permission => {
          if (permission === "granted") {
            console.log("Permissão para notificações concedida!");

            const notificationOptions = {
              body: "Esta é uma notificação de teste.",
              icon: "caminho/para/icone.png" // Substitua pelo caminho do ícone desejado
            };

            const notification = new Notification("Título da Notificação", notificationOptions);
          }
        });
      } else {
        const notificationOptions = {
          body: "Esta é uma notificação de teste.",
          icon: "caminho/para/icone.png" // Substitua pelo caminho do ícone desejado
        };

        const notification = new Notification("Título da Notificação", notificationOptions);
      }
    }
  }, []);

  function PrimarySearchAppBar() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleMobileMenuClose = () => setMobileMoreAnchorEl(null);


    const handleMobileMenuOpen = (event) =>
      setMobileMoreAnchorEl(event.currentTarget);
    const menuId = 'primary-search-account-menu';

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <MenuItem>
          <IconButton size="large" color="inherit">
            <Badge badgeContent={17} color="error"><ShoppingBag /></Badge>
          </IconButton>
          <p>Sacola</p>
        </MenuItem>

        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton size="large" color="inherit">
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    );

    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Avatar alt={`Logomarca ${store?.fantasyName}`} src={store?.custom?.logo?.url} />

            <Typography
              variant="h6"
              noWrap
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              {store?.fantasyName}
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>

              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <IconButton size="large" color="inherit">
                <Badge 
                  badgeContent={2} 
                  color="error"
                >
                  {/* <p>{total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p> */}
                  <ShoppingBag />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
      </Box>
    );
  }

  return (
    <Box sx={{ background: '#f5f7fa' }}>
      <PrimarySearchAppBar></PrimarySearchAppBar>
      <header>
        <S.Intro>
          <div>
            <Typography variant="h1" sx={{ fontSize: 30, fontWeight: 'bold' }}>
              BELLA PETIT
            </Typography>
          </div>
        </S.Intro>
      </header>

  
      <Box component="main" sx={{ mt: 4 }}>
        <S.Container>
          <Box component="section" sx={{ ml: 2, mr: 2, mt: 2 }}>
            {collections.map((item, i) => (
              <AccordionProduct
                key={i} categoryTitle={item.title} products={item.products}
              />
            ))}
          </Box>
        </S.Container>
      </Box>
    </Box>
  );
};

export default Store;
