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
import TabsCustom from 'components/Tabs';
import { ApiService } from 'services/api.service';
import AccordionProduct from 'components/AccordionProduct';
import * as S from './style';

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

    if (headerRef.current) {
      const searchElement = headerRef.current.querySelector('header');
      setHeightSearchBar(searchElement.clientHeight);
    }
  }, []);

  return (
    <Box sx={{ background: '#f5f7fa' }}>
      <header ref={headerRef}>
        <SearchAppBar />
        <S.Intro>
          <div>
            <Typography variant="h1" sx={{ fontSize: 30, fontWeight: 'bold' }}>
              BELLA PETIT
            </Typography>
          </div>
        </S.Intro>
      </header>

      <S.WrapperTabs top={heightSearchBar}>
        <S.Container><TabsCustom /></S.Container>
      </S.WrapperTabs>

      <Box component="main" sx={{ mt: 4 }}>
        <S.Container>
          <Box component="section" sx={{ ml: 2, mr: 2, mt: 2 }}>
            {collections.map((item, i) => (
              <AccordionProduct
                key={i}
                categoryTitle={item.title}
                products={item.products}
              />
            ))}
          </Box>
        </S.Container>
      </Box>
    </Box>
  );
};

export default Store;
