import React, { useState, useEffect, useContext, useRef } from 'react';
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
  AppBar,
  Chip,
  Container,
  Skeleton,
  Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ProductCard from 'components/ProductCard';
import { StoreContext } from 'contexts/store';
import { ApiService } from 'services/api.service';
import * as S from './style';


const MediaProduct = (props) => {
  const { loading = false, products } = props;
  const itens = Array.from({ length: products });

  return (
    loading && (
      <S.AccordionCustom expanded={true}>
        <AccordionSummary>
          <Skeleton animation="wave" height={10} width="32%" style={{ marginBottom: 5 }} />
        </AccordionSummary>
        <S.AccordionDetailsCustom>
          {itens.map((item) => (
            <S.CardContentCustom key={item} sx={{ flex: '1 0 auto', pt: 0 }}>
              <S.CardInfo>
                <div>
                  <Skeleton animation="wave" height={10} width="32%" style={{ marginBottom: 5 }} />
                  <Skeleton animation="wave" height={10} width="72%" style={{ marginBottom: 6 }} />
                </div>
                <Skeleton animation="wave" height={10} width="16%" />
              </S.CardInfo>
              <Skeleton variant="rectangular" width="100%">
                <div style={{ paddingTop: '100%' }} />
              </Skeleton>
            </S.CardContentCustom>
          ))}
        </S.AccordionDetailsCustom>
      </S.AccordionCustom>
    )
  );
};

const Menu = () => {
  const navigate = useNavigate();
  const apiService = new ApiService(false);
  const { storeUrl } = useParams();
  const { total, quantityTotal, setStore } = useContext(StoreContext);
  const [collections, setCollections] = useState([]);
  const [categories, setCategories] = useState([]);
  const [store, setStoreCatalog] = useState();
  const [tabValue, setTabValue] = useState(0);
  const tabsRefs = useRef([]);

  const getStore = async () => {
    const { data } = await apiService.get('/store/' + storeUrl);
    setStoreCatalog(data);
    setStore(data);
  };

  const getProducts = async () => {
    const response = await apiService.get('/store/products/' + storeUrl);
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

    const targetElement = document.getElementById(e.target.textContent);
    const boundingBox = targetElement.getBoundingClientRect();
    const offset = 124;

    window.scroll({
      behavior: 'smooth',
      left: 0,
      top: boundingBox.top + window.scrollY - offset
    });
  };

  const toPageBagShopping = () => navigate('pedido');

  const toPageAbout = () => navigate('about');

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
    getStore();
    getProducts();
  }, []);

  return (
    <>
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
            <Chip label="ABERTO" variant="filled" color="success" sx={{ mt: '16px' }} />
            <Button
              component="label"
              sx={{ color: '#fff', position: 'absolute', right: '20px', bottom: 1 }}
              onClick={toPageAbout}
            >
              Ver mais
            </Button>
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
              {categories.map((item, i) => <Tab key={item} label={item} />)}
            </Tabs>
          </S.Container>
        </S.WrapperTabs>

        <Box component="main" sx={{ mt: 2 }}>
          <S.Container>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'end', m: 2 }}>
              {
                store && (
                  <Chip
                    label={`
                  Entrega:
                  ${store?.settingsDelivery?.deliveryOption === 'fixed'
                        ? store?.settingsDelivery.fixedValue.toLocaleString(
                          'pt-BR', { style: 'currency', currency: 'BRL' },
                        ) : ''
                      }
                  ${store?.settingsDelivery?.deliveryOption === 'customerPickup'
                        ? 'a combinar' : ''}
                  ${store?.settingsDelivery?.deliveryOption === 'automatic'
                        ? 'a calcular' : ''}
                `}
                    variant="outlined"
                    color="success"
                  />
                )
              }

              <Chip
                label="50-70min"
                variant="outlined"
                color="warning"
                icon={<span className="fa fa-clock"></span>}
              // sx={{ position: 'absolute', left: '20px' }}
              />
            </Box>

            <Box component="section" sx={{ m: 2, display: 'grid', gap: 0.5 }}>
              {
                collections?.length <= 0 && (
                  <>
                    <MediaProduct loading={true} products={2} />
                    <MediaProduct loading={true} products={4} />
                    <MediaProduct loading={true} products={3} />
                  </>
                )
              }

              {collections.map((item, i) => (
                <S.AccordionCustom
                  key={'item-' + i}
                  id={item.title}
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

        {total > 0 && (
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
        )}

        <S.Footer>
          <Container maxWidth="lg">
            <Typography variant="subtitle1" align="center" color="text.secondary" component="p">
              Meu apetite
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              © {new Date().getFullYear()} Nome da Empresa.
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              <Typography color="inherit" href="/terms">
                Termos de Serviço
              </Typography>{' '}
              |{' '}
              <Typography color="inherit" href="/privacy">
                Política de Privacidade
              </Typography>
            </Typography>
          </Container>
        </S.Footer>
      </Box>

    </>
  );
};

export default Menu;
