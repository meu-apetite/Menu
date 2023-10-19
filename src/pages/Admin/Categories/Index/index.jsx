import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Switch, Button } from '@mui/material';
import { AuthContext } from 'contexts/auth';
import { ApiService } from 'services/api.service';
import Header from 'components/Header';
import * as S from './style';

export default function Categories() {
  const label = { inputProps: { 'aria-label': 'Color switch demo' } };

  const navigate = useNavigate();
  const apiService = new ApiService();
  const { setLoading, toast } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [categoryChanges, setCategoryChanges] = useState([]);
  const [productChanges, setProductChanges] = useState([]);

  const getCategories = async () => {
    const response = await apiService.get('/admin/categoriesWithProducts');
    sortPosition(response.data);
  };

  const addCategorychanges = (indexs) => {
    indexs.forEach((i) => {
      if (categoryChanges.indexOf(i) === -1) setCategoryChanges((prev) => [...prev, i]);
    });
  };

  // useEffect(() => {
  //   console.log(productChanges.length)
  // }, [productChanges])

  const addProductChanges = (products) => {
    products.forEach((p) => {
      const productChangesCopy = productChanges;
      const findItem = productChanges.findIndex((item) => item.id === p.id);
      console.log('oiiii ', findItem)
      
      if (findItem >= 0) {
        productChangesCopy[findItem] = p;
        setProductChanges(productChangesCopy);
      } else {
        console.log('ok')
        setProductChanges(prev => [...prev, p]);
      }
    });
  };

  const sortPosition = (data) => {
    //{ products: { displayPosition: number }[], title: string) } []
    data.forEach((item) => {
      const itemCurrent = item;
      const result = itemCurrent.products.sort((a, b) => a.displayPosition - b.displayPosition);
      itemCurrent.products = result;
      setCategories((prev) => [...prev, itemCurrent]);
    });
  };

  const changeProductPosition = (indexCategory, indexProduct, action) => {
    const positions = [];
    const categoriesCurrent = categories;
    const products = categoriesCurrent[indexCategory]['products'];
    let currentPosition = products[indexProduct]['displayPosition'];

    if (action === 'up') {
      if (products[indexProduct]['displayPosition'] === 1) return;
      products[indexProduct]['displayPosition'] = products[indexProduct - 1]['displayPosition'];
      products[indexProduct - 1]['displayPosition'] = currentPosition;
      positions.push(indexProduct, (indexProduct - 1));
    } else if (action === 'down') {
      products[indexProduct]['displayPosition'] = products[indexProduct + 1]['displayPosition'];
      products[indexProduct + 1]['displayPosition'] = currentPosition;
      positions.push(indexProduct, (indexProduct + 1));
    }

    categoriesCurrent[indexCategory]['products'] = products;
    setCategories([]);
    sortPosition(categoriesCurrent);

    positions.forEach((p) => {
      addProductChanges([
        {
          id: products[positions[p]]['_id'],
          isActive: products[positions[p]]['isActive'],
          displayPosition: products[positions[p]]['displayPosition'],
          categoryId: categoriesCurrent[indexCategory]['_id'],
          categoryIndex: indexCategory,
        }
      ]);
    });
  };

  const changeProductStatus = (indexCategory, indexProduct) => {
    const updatedCategories = [...categories];
    const updatedCategory = { ...updatedCategories[indexCategory] };
    const updatedProducts = [...updatedCategory.products];
    const updatedProduct = { ...updatedProducts[indexProduct] };
  
    updatedProduct.isActive = !updatedProduct.isActive;  
    updatedProducts[indexProduct] = updatedProduct;
    updatedCategory.products = updatedProducts;  
    updatedCategories[indexCategory] = updatedCategory;
  
    setCategories(updatedCategories);  
    addProductChanges([
      {
        id: updatedProduct._id,
        displayPosition: updatedProduct.displayPosition,
        categoryId: updatedCategory._id,
        categoryIndex: indexCategory,
        isActive: updatedProduct.isActive
      }
    ]);
  };
  
  const changeCategoriesPosition = (index, action) => {
    if (index === categories.length - 1 && action === 'down') return;
    if (index === 0 && action === 'up') return;

    const categoriesCopy = [...categories];
    const category = categoriesCopy[index];
    let currentPosition = category.displayPosition;

    if (action === 'up') {
      category.displayPosition = categoriesCopy[index - 1]['displayPosition'];
      categoriesCopy[index - 1]['displayPosition'] = currentPosition;
      addCategorychanges([index, index - 1]);
    } else if (action === 'down') {
      category.displayPosition = categoriesCopy[index + 1]['displayPosition'];
      categoriesCopy[index + 1]['displayPosition'] = currentPosition;
      addCategorychanges([index, index + 1]);
    }

    setCategories(categoriesCopy.sort((a, b) => a.displayPosition - b.displayPosition));
  };

  const changeStatus = (index) => {
    const categoriesCopy = [...categories];
    categoriesCopy[index]['isActive'] = !categoriesCopy[index]['isActive'];
    setCategories(categoriesCopy);
    addCategorychanges([index]);
  };

  const openCreateProduct = (id) => navigate('/admin/products/create?categoryId=' + id);

  const save = async () => {
    try {
      setLoading('Atualizando');

      const categoryChanges = [];

      console.log(productChanges)
      categoryChanges.forEach((index, i) => {
        categoryChanges.push({
          id: categories[index]['_id'],
          displayPosition: categories[index]['displayPosition'],
          isActive: categories[index]['isActive'],
          products: categories[index]['products'],
        });
      });

      const response = await apiService.put('/admin/categories', {
        productChanges, categoryChanges
      });

      sortPosition(response.data);
      toast.success('Mudanças feitas com sucesso');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(null);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <Header
        title="Categorias"
        buttonText="Nova categoria"
        buttonClick={() => navigate('create')}
      />

      <S.ContainerButtonSave>
        {(categoryChanges.length >= 1 || productChanges.length >= 1)  && (
          <Button variant="outlined" color="success" onClick={save}>
            Salvar Alterações
          </Button>
        )}
      </S.ContainerButtonSave>

      <S.ContainerCategories>
        {categories.map((item, indexCat) => (
          <S.ContainerCategory key={item.title}>
            <S.HeaderCategory>
              <h2>
                <span
                  onClick={() => navigate('/admin/categories/update/' + item._id)}
                  className="fas fa-edit"
                  style={{ opacity: 0.8, margin: 'auto 6px 0 0', cursor: 'pointer' }}
                />
                {item.title}
              </h2>
              <div className="actions">
                <div className="move">
                  <span
                    className="fa fa-arrow-down btnDown"
                    onClick={() => changeCategoriesPosition(indexCat, 'down')}
                  />
                  <span
                    className="fa fa-arrow-up btnUp"
                    onClick={() => changeCategoriesPosition(indexCat, 'up')}
                  />
                  <Switch
                    {...label}
                    checked={item.isActive}
                    onChange={() => changeStatus(indexCat)}
                  />
                </div>
              </div>
            </S.HeaderCategory>
            <S.BodyCategory>
              <Button
                sx={{ textTransform: 'none' }}
                onClick={() => openCreateProduct(item._id)}
              >
                + Adicionar produto
              </Button>
              {item.products.map((item, indexProduct) => (
                <S.CategoryItem key={indexProduct}>
                  <div className="wrapperInfo">
                    <img
                      className="imageItem"
                      src={item.images[0].url}
                      alt={`Imagem do produto ${item.name}`}
                    />
                    <p className="nameItem">{item.name}</p>
                  </div>
                  <div className="action">
                    <div>
                      <span
                        className="fa fa-arrow-down btnDown"
                        onClick={() => changeProductPosition(indexCat, indexProduct, 'down')}
                      />
                      <span
                        className="fa fa-arrow-up btnUp"
                        onClick={() => changeProductPosition(indexCat, indexProduct, 'up')}
                      />
                    </div>
                    <Switch
                      {...label}
                      checked={item.isActive}
                      onChange={() => changeProductStatus(indexCat, indexProduct)}
                    />
                  </div>
                </S.CategoryItem>
              ))}
            </S.BodyCategory>
          </S.ContainerCategory>
        ))}
      </S.ContainerCategories>

      {!categories.length && (
        <div style={{ textAlign: 'center' }}>
          Não há categorias cadastradas no momento. Para adicionar uma nova
          categoria, clique em 'Nova Categoria'.
        </div>
      )}
    </>
  );
}
