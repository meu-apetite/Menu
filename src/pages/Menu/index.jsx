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
  AppBar,
  Chip,
  Container,
  Button,
} from '@mui/material';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ProductCard from 'components/ProductCard';
import SpinnerProduct from 'components/SpinnerProduct';
import CustomError from 'components/CustomError';
import { StoreContext } from 'contexts/store';
import { ApiService } from 'services/api.service';
import theme from 'theme/default';
import SearchProduct from 'components/SearchProduct';
import * as S from './style';

const Menu = () => {
  const navigate = useNavigate();
  const apiService = new ApiService(false);
  const boxRef = useRef();
  const { storeUrl } = useParams();
  const { total, quantityTotal, setStore } = useContext(StoreContext);
  const [collections, setCollections] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productAll, setProductAll] = useState([]);
  const [store, setStoreCatalog] = useState();
  const [tabValue, setTabValue] = useState(0);
  const [error, setError] = useState({});
  const [showError, setShowError] = useState(false);

  const getStore = async () => {
    try {
      const response = await apiService.get('/store/' + storeUrl);
      setStoreCatalog(response.data);
      setStore(response.data);
    } catch (e) {
      setShowError(true);
      return setError({
        code: e.response.status || 500,
        title: e.response.status === 404
          ? 'Não foi possível encontrar o cárdapio'
          : 'Não foi possível recuperar os dados desse cardápio',
        text: e.response.data?.message || 'Verfique o endereço e tente novamente'
      });
    }
  };

  const getProducts = async () => {
    const response = await apiService.get('/store/products/' + storeUrl);
    const productsWithCategories = response.data;
    const listProducts = [];
    const categories = [];
    const categoriesTitle = [];

    productsWithCategories.forEach((item) => {
      if (item.products.length <= 0 || !item.products) return;

      item.products.forEach((p) => {
        listProducts.push({ _id: p._id, name: p.name, image: p.images[0] });
      });

      //get title
      categoriesTitle.push(item.title);

      //ordenando products
      const itemCurrent = item;
      const result = itemCurrent.products.sort((a, b) => a.displayPosition - b.displayPosition);
      itemCurrent.products = result;
      categories.push(itemCurrent);
    });

    setCollections(categories);
    setCategories(categoriesTitle);
    setProductAll(listProducts);
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

  useEffect(() => {
    const checkVisibleAccordion = () => {
      if (!boxRef.current) return;

      collections.forEach((item) => {
        const collectionCurrent = document.getElementById(item.title);
        if (!collectionCurrent) return

        const accordionRect = collectionCurrent.getBoundingClientRect();
        if (
          accordionRect.top + 400 <= window.innerHeight &&
          accordionRect.bottom >= 0 &&
          accordionRect.left - 10 <= window.innerWidth &&
          accordionRect.right >= 0
        ) {
          setTabValue(categories.findIndex(c => c === collectionCurrent.id));
        }
      });
    };

    checkVisibleAccordion();

    window.addEventListener('scroll', checkVisibleAccordion);

    return () => {
      window.removeEventListener('scroll', checkVisibleAccordion);
    };
  }, [collections]);

  useEffect(() => {
    getStore();
    getProducts();
  }, []);

  return (
    <>
      {store ? (
        <Box sx={{ background: '#f5f7fa' }}>
          <S.WrapperNav>
            <Box sx={{ flexGrow: 1 }}>
              <AppBar position="static">
                <Toolbar sx={{ height: '64px' }}>
                  <IconButton size="large edge=" color="inherit" sx={{ mr: 2 }}>
                    <Avatar 
                      alt={`Logomarca ${store?.fantasyName}`} 
                      src={store?.custom?.logo?.url} 
                      onClick={toPageAbout}
                    />
                  </IconButton>

                  <Typography 
                    variant="h6"
                    noWrap
                    component="div" 
                    sx={{ display: { xs: 'none', sm: 'block' } }}
                  >
                    {store?.fantasyName}
                  </Typography>

                  <SearchProduct
                    list={productAll}
                    onChange={(id) => {
                      if (id) document.getElementById(id).click();
                    }}
                  />

                  <Box sx={{ flexGrow: 1 }} />

                  <Box
                    sx={{ display: { md: 'flex' }, [theme.breakpoints.down(700)]: { display: 'none' } }}
                    onClick={toPageBagShopping}
                  >
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
              <Chip 
                label={store.isOpen ? 'ABERTO' : 'FECHADO PARA PEDIDO'} 
                variant="filled" 
                color={store.isOpen ? 'success' : 'error'}
                sx={{ mt: '16px' }} 
              />
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
                  store ? (
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
                  ) : null
                }

                <Chip
                  label="50-70min"
                  variant="outlined"
                  color="warning"
                  icon={<span className="fa fa-clock"></span>}
                />
              </Box>

              <Box ref={boxRef} component="section" sx={{ m: 2, display: 'grid', gap: 0.5 }}>
                {
                  collections?.length <= 0 ? (
                    <>
                      <SpinnerProduct loading={true} products={2} />
                      <SpinnerProduct loading={true} products={4} />
                      <SpinnerProduct loading={true} products={3} />
                    </>
                  ) : null
                }

                {collections.map((item, i) => (
                  <S.AccordionCustom key={'item-' + i} id={item.title} expanded={true}>
                    <AccordionSummary><S.Title>{item.title}</S.Title></AccordionSummary>
                    <S.AccordionDetailsCustom>
                      {item.products.map((item, i) => <ProductCard key={i} product={item} />)}
                    </S.AccordionDetailsCustom>
                  </S.AccordionCustom>
                ))}
              </Box>
            </S.Container>
          </Box>

          {total > 0 ? (
            <S.ButtonCart variant="contained" onClick={toPageBagShopping}>
              <Badge badgeContent={quantityTotal} color="secondary">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <ShoppingBagIcon style={{ fontSize: 28, color: 'white' }} />
                </div>
              </Badge>
              <span>Ver Sacola</span>
              <span>{total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
            </S.ButtonCart>
          ) : null}

          <S.Footer>
            <Container maxWidth="lg" sx={{ marginBottom: 1 }}>
              <Typography variant="body2" color="text.secondary" align="center">
                © {new Date().getFullYear()} Meu apetite.
              </Typography>
              <Typography variant="body2" color="text.secondary" align="center">
                <a color="inherit" href="/terms">Termos de Serviço | Política de Privacidade</a>
              </Typography>
            </Container>
          </S.Footer>
        </Box>
      ) : null}

      {showError ? <CustomError error={error} /> : null}
    </>
  );
};

export default Menu;
