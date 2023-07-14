import React, { useState, useEffect, useContext, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import { AuthContext } from 'contexts/auth';
import SearchAppBar from 'components/SearchAppBar';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { styled } from '@mui/system';
import TabsCustom from 'components/Tabs';
import { ApiService } from 'services/api.service';
import AccordionProduct from 'components/AccordionProduct';

const Container = styled('div')(({ theme }) => ({
  margin: 'auto',
  maxWidth: '1140px',
}));

const Store = () => {
  const apiService = new ApiService(false);

  const headerRef = useRef(null);
  const { setLoading, toast } = useContext(AuthContext);

  const { search } = useLocation();
  const id = search.replace('?', '');

  const [collections, setCollections] = useState([]);
  const [categories, setCategories] = useState();
  const [heightSearchBar, setHeightSearchBar] = useState(0);

  const getProducts = async () => {
    const response = await apiService.get('/store/products');
    const products = response.data;
    const categories = [];
    const categoriesTitle = [];

    products.forEach((item) => {
      const categoryTitle = item.category?.title;
      if (!categoryTitle) return;

      const index = categories.findIndex((item) => item.title === categoryTitle);
      if (index >= 0) return categories[index].products.push(item);

      categories.push({ title: categoryTitle, products: [item] });
      categoriesTitle.push(categoryTitle)
    });

    setCollections(categories);
    setCategories(categoriesTitle);
  };

  useEffect(() => {
    getProducts();

    if (headerRef.current) {
      const searchElement = headerRef.current.querySelector('header');
      setHeightSearchBar(searchElement.clientHeight);
    }
  }, []);

  return (
    <Box sx={{ background: '#f5f7fa' }}>
      <header ref={headerRef}>
        <SearchAppBar />
        <Box
          sx={{
            height: '340px',
            background:
              'url(https://files.menudino.com/cardapios/9621/capa.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: '50%',
            backgroundColor: '#f4f8f9',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div>
            <Typography variant="h1" sx={{ fontSize: 30, fontWeight: 'bold' }}>
              BELLA PETIT
            </Typography>
          </div>
        </Box>
      </header>

      <Box
        sx={{
          position: 'sticky',
          top: heightSearchBar,
          background: '#fff',
          pt: 0.4,
          pb: 0.4,
          zIndex: 999,
        }}
      >
        <Container>
          <TabsCustom />
        </Container>
      </Box>

      <Box component="main" sx={{ mt: 4 }}>
        <Container>
          <Box component="section" sx={{ ml: 2, mr: 2, mt: 2 }}>
            {collections.map((item, i) => (
              <AccordionProduct key={i} categoryTitle={item.title} products={item.products} />
            ))}
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Store;
