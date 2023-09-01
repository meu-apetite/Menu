import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Tab, Tabs, Typography, Box } from '@mui/material';
import { ApiService } from 'services/api.service';
import { StoreContext } from 'contexts/store';
import AccordionProduct from 'components/AccordionProduct';
import NavMenu from './Nav';
import * as S from './style';


const Store = () => {
  const apiService = new ApiService(false);
  const { id } = useParams();
  const { total } = useContext(StoreContext);
  
  const [collections, setCollections] = useState([]);
  const [categories, setCategories] = useState([]);
  const [store, setStore] = useState();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => setValue(newValue);

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

  return (
    <Box sx={{ background: '#f5f7fa' }}>
      <NavMenu title={store?.fantasyName} logoUrl={store?.custom?.logo?.url} />

      <header>
        <S.Intro>
          <Typography variant="h1" sx={{ fontSize: 30, fontWeight: 'bold' }}>BELLA PETIT</Typography>
        </S.Intro>
      </header>

      <S.WrapperTabs>
        <S.Container>
          <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto">
            {categories.map((item) => <Tab key={item} label={item} />)}
          </Tabs>
        </S.Container>
      </S.WrapperTabs>

      <Box component="main" sx={{ mt: 4 }}>
        <S.Container>
          <Box component="section" sx={{ ml: 2, mr: 2, mt: 2 }}>
            {collections.map((item, i) => <AccordionProduct key={i} categoryTitle={item.title} products={item.products} />)}
          </Box>
        </S.Container>
      </Box>
    </Box>
  );
};

export default Store;
