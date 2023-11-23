import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Pagination, Box } from '@mui/material';
import { ApiService } from 'services/api.service';
import { AuthContext } from 'contexts/auth';
import Header from 'components/Header';
import * as S from './style';

export default function DataGridDemo() {
  const apiService = new ApiService();
  const navigate = useNavigate();
  const { setLoading, toast } = useContext(AuthContext);

  const [itemsSelect, setItemsSelect] = useState([]);
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(0);

  const getProducts = async () => {
    const { data } = await apiService.get(`/admin/products?page=1`);

    setProducts(data.products?.reverse());
    setTotalPages(data.totalPages);
    setPage(data.page);
  };

  const changePage = async (e, value) => {
    try {
      setLoading('Carregando...')
      const { data } = await apiService.get(`/admin/products?page=${value}`);

      setProducts(data.products?.reverse());
      setTotalPages(data.totalPages);
      setPage(data.page);

      window.scrollTo(0, 0);
    } catch (error) {
      console.log(error)
      toast.error('Não foi possível mudar de página')
    } finally {
      setLoading(null);
    }
  };

  const removeSelect = async () => {
    try {
      setLoading('Aguarde...');

      const response = await apiService.post(
        `/admin/products/delete-multiple`,
        {
          productIds: itemsSelect,
        },
      );
      setProducts(response.data?.reverse());

      toast.success('Categorias excluidas');
    } catch (e) {
      toast.error('Não foi possível excuir os itens selecionados!');
    } finally {
      setLoading(false);
    }
  };

  const toUpdate = (id) => {
    navigate('/admin/products/update/' + id);
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Box sx={{ height: 430, width: '100%' }}>
      <Header
        title="Produtos"
        buttonText="Novo produto"
        buttonClick={() => navigate('create')}
        back={-1}
      />
      {itemsSelect.length > 0 && (
        <Button
          variant="contained"
          color="error"
          sx={{ mb: 2 }}
          onClick={removeSelect}
        >
          Remover
        </Button>
      )}

      <S.ContainerProducts>
        {products.map((item) => {
          return (
            <S.CardCustom onClick={() => { }}>
                <S.WrapperActions>
                <div 
                  className='action' 
                  onClick={() => toUpdate(item._id)}
                >
                  <span className='fa fa-pen'></span>
                  Editar
                </div>
                {/* <div className='action'>
                  <span className='fa fa-copy'></span>
                  Duplicar
                </div> */}
                <div className='action'>
                  <span className='fa fa-trash'></span>
                  Excluir
                </div>
              </S.WrapperActions>

              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <S.CardContentCustom sx={{ flex: '1 0 auto', pt: 0 }}>
                  <S.CardInfo>
                    <span>
                      <strong>Nome:</strong> {item.name}
                    </span>
                    <span>
                      <strong>Preço: </strong>
                      {item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </span>
                    <span>
                      <strong>Categoria: </strong>
                      {item.category.title}
                    </span>
                    <span>
                      <strong>Status:</strong> {item.isActive ? 'Ativo' : 'Desativo'}
                    </span>

                  </S.CardInfo>
                  <S.CardMediaCustom image={item.images.length ? item.images[0].url : 1} />
                </S.CardContentCustom>
              </Box>
            </S.CardCustom>
          );
        })}
      </S.ContainerProducts>

      <Pagination 
        sx={{ display: 'flex', justifyContent: 'center', p: '32px' }} 
        color="primary" 
        count={totalPages} 
        page={page} 
        onChange={changePage}
      />    
    </Box>
  );
}
