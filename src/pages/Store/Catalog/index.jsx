import { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Tab,
  Tabs,
  Typography,
  Box,
  Avatar,
  IconButton,
  Toolbar,
  Badge,
  AccordionSummary,
} from '@mui/material';
import { StoreContext } from 'contexts/store';
import { ApiService } from 'services/api.service';
import ProductCard from 'components/ProductCard';
import * as S from './style';
import AppBar from '@mui/material/AppBar';
import SearchIcon from '@mui/icons-material/Search';

import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';



const Store = () => {
  const navigate = useNavigate();

  const apiService = new ApiService(false);
  const { id } = useParams();
  const { total, quantityTotal } = useContext(StoreContext);

  const [collections, setCollections] = useState([]);
  const [categories, setCategories] = useState([]);
  const [store, setStore] = useState();
  const [tabValue, setTabValue] = useState(0);

  const tabsRefs = useRef([]);

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

  const changeTab = (e, value) => {
    setTabValue(value);
    console.log(tabsRefs);
    if (tabsRefs[value] && tabsRefs[value].current) {
      tabsRefs[value].current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toPageBagShopping = () => navigate(`/${id}/pedido`);

  function findVisibleElement() {
    console.log(tabsRefs);
    // const elements = document.querySelectorAll('.seus-elementos'); // Substitua com seu seletor de elementos
    // const windowHeight = window.innerHeight;

    // for (let i = 0; i < elements.length; i++) {
    //   const element = elements[i];
    //   const elementRect = element.getBoundingClientRect();

    //   if (
    //     elementRect.top >= 0 &&
    //     elementRect.bottom <= windowHeight
    //   ) {
    //     // O elemento é visível na tela
    //     console.log('Elemento visível:', element);
    //   }
    // }
  }

  useEffect(() => {
    getProducts();
    getStore();

    window.addEventListener('scroll', findVisibleElement);

    return () => {
      window.removeEventListener('scroll', findVisibleElement);
    };
  }, []);

  return (
    <Box sx={{ background: '#f5f7fa' }}>
      <S.WrapperNav>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 2 }}
              >
                <Avatar alt={`Logomarca ${store?.fantasyName}`} src={store?.custom?.logo?.url} />
              </IconButton>

              <Typography variant="h6" noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
                {store?.fantasyName}
              </Typography>

              <S.Search>
                <S.SearchIconWrapper>
                  <SearchIcon />
                </S.SearchIconWrapper>
                <S.StyledInputBase placeholder="Busque por item" inputProps={{ 'aria-label': 'search' }} />
              </S.Search>

              <Box sx={{ flexGrow: 1 }} />

              <Box sx={{ display: { xs: 'none', md: 'flex' } }} onClick={toPageBagShopping}>
                <IconButton aria-label="Cart">
                  <Badge badgeContent={quantityTotal} color="secondary">
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <ShoppingBagIcon style={{ fontSize: 28, color: 'white' }} />
                      <Typography style={{ fontSize: 12, color: 'white' }}>
                        {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </Typography>
                    </div>
                  </Badge>
                </IconButton>
              </Box>
            </Toolbar>
          </AppBar>
        </Box>
      </S.WrapperNav>

      <header>
        <S.Intro>
          <Avatar sx={{ width: 90, height: 90 }} alt={`Logomarca ${store?.fantasyName}`} src={store?.custom?.logo?.url} />
          <Typography variant="h2" sx={{ fontSize: '2rem', fontWeight: 'bold', color: '#fff' }}>
            {store?.fantasyName}
          </Typography>
        </S.Intro>
      </header>

      <S.WrapperTabs>
        <S.Container>
          <Tabs
            value={tabValue}
            onChange={changeTab}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ mr: 2, ml: 2 }}
          >
            {categories.map((item) => <Tab key={item} label={item} />)}
          </Tabs>
        </S.Container>
      </S.WrapperTabs>

      <Box component="main" sx={{ mt: 2 }}>
        <S.Container>
          <Box component="section" sx={{ m: 2 }}>
            {collections.map((item, i) => (
              <S.AccordionCustom
                key={'item-' + i}
                ref={(ref) => (tabsRefs.current[item.title] = ref)}
                expanded={true}
              >
                <AccordionSummary><S.Title>{item.title}</S.Title></AccordionSummary>
                <S.AccordionDetailsCustom>
                  {item.products.map((item, i) => <ProductCard key={i} product={item} />)}
                </S.AccordionDetailsCustom>
              </S.AccordionCustom>
            ))}
          </Box>
        </S.Container>
      </Box>

      <S.ButtonCart variant="contained" onClick={toPageBagShopping}>
        <IconButton aria-label="Cart">
          <Badge badgeContent={quantityTotal} color="secondary">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <ShoppingBagIcon style={{ fontSize: 28, color: 'white' }} />
            </div>
          </Badge>
        </IconButton>
        <span>Ver Sacola</span>
        <span>{total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
      </S.ButtonCart>
    </Box>
  );
};

export default Store;
