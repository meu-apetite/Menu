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
  Button,
} from '@mui/material';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ProductCard from 'components/ProductCard';
import SpinnerProduct from 'components/SpinnerProduct';
import CustomError from 'components/CustomError';
import { GlobalContext } from 'contexts/global';
import { ApiService } from 'services/api.service';
import SearchProduct from 'components/SearchProduct';
import * as S from './style';
import { ErrorUtils } from 'utils/ErrorUtils';

const Menu = () => {
  const navigate = useNavigate();
  const apiService = new ApiService(false);
  const boxRef = useRef();
  const { storeUrl } = useParams();
  const { total, quantityTotal, setCompany } = useContext(GlobalContext);
  const [collections, setCollections] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productAll, setProductAll] = useState([]);
  const [company, setCompanyCatalog] = useState();
  const [tabValue, setTabValue] = useState(0);
  const [error, setError] = useState({});
  const [showError, setShowError] = useState(false);

  const getCompany = async () => {
    try {
      const response = await apiService.get('/store/' + storeUrl);
      setCompanyCatalog(response.data);
      setCompany(response.data);
    } catch (e) {
      setShowError(true);
      return setError(ErrorUtils.notFoundMenu());
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

  const toPageBagShopping = () => navigate('checkout');

  const toPageAbout = () => navigate('about');

  useEffect(() => {
    const checkVisibleAccordion = () => {
      if (!boxRef.current) return;

      collections.forEach((item) => {
        const collectionCurrent = document.getElementById(item.title);
        if (!collectionCurrent) return;

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
    getCompany();
    getProducts();
  }, []);

  return (
    <>
      {company ? (
        <Box sx={{ background: '#f5f7fa' }}>
          <S.WrapperNav>
            <Box sx={{ flexGrow: 1 }}>
              <AppBar position="static">
                <Toolbar sx={{ height: '64px' }}>
                  <div onClick={toPageAbout}>
                    <IconButton size="large edge=" color="inherit" sx={{ mr: 2 }}>
                      <Avatar 
                        alt={`Logomarca ${company.fantasyName}`} 
                        src={company.custom.logo?.url} 
                      />
                    </IconButton>
                  </div>

                  <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ display: { xs: 'none', sm: 'block' } }}
                  >
                    {company.fantasyName}
                  </Typography>

                  <SearchProduct
                    list={productAll}
                    onChange={(id) => {
                      if (id) document.getElementById(id).click();
                    }}
                  />

                  <Box sx={{ flexGrow: 1 }} />

                  <S.WrapperBagShopping onClick={toPageBagShopping}>
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
                  </S.WrapperBagShopping>
                </Toolbar>
              </AppBar>
            </Box>
          </S.WrapperNav>

          <header>
            <S.Intro backgroundimage={company.custom.backgroundImage?.url}>
              <S.Logo alt={`Logomarca ${company.fantasyName}`} src={company.custom?.logo?.url} />

              <S.TitleCompany>{company.fantasyName}</S.TitleCompany>

              <Box sx={{ color: '#fff', position: 'absolute', bottom: 8, width: '100%', padding: '0 10px', display: 'flex', justifyContent: 'space-between' }}>

                {!company.isOpen
                  ? (<Chip label="FECHADO" color="error" />)
                  : (
                    <Chip
                      label={`
                          Entrega:
                          ${company.settingsDelivery?.deliveryOption === 'fixed' ? company.settingsDelivery.fixedValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : ''}
                          ${company.settingsDelivery?.deliveryOption === 'customerPickup' ? 'a combinar' : ''}
                          ${company.settingsDelivery?.deliveryOption === 'automatic' ? 'a calcular' : ''}
                        `}
                      color="primary"
                    />
                  )
                }
                <Button component="label" onClick={toPageAbout} sx={{ color: '#fff' }}>Ver mais</Button>
              </Box>
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

          <Box sx={{ padding: '16px', dislplay: 'grid' }}>
            <Typography color="text.secondary" align="center">
              © {new Date().getFullYear()} Meu apetite.
            </Typography>
          </Box>
        </Box>
      ) : null}

      {showError ? <CustomError error={error} /> : null}
    </>
  );
};

export default Menu;
