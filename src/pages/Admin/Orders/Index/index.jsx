import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Header from 'components/Header';
import { ApiService } from 'services/api.service';
import * as S from './style';
import { Button, Pagination } from '@mui/material';

export default function Index() {
  const apiService = new ApiService();
  const [orders, setOrders] = useState([]);
  const [totalPages, setTotalPages] = useState([]);
  const [page, setPage] = useState([]);

  const getOrders = async () => {
    try {
      const { data } = await apiService.get('/admin/orders?page=1');
      console.log(data)
      setOrders(data.orders);
      setTotalPages(data.totalPages);
      setPage(data.page);
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  // const rowOrders = orders.map((item) => (item.id = item._id))

  return (
    <Box sx={{ height: 430, width: '100%' }}>
      <Header
        title="Pedidos"
        buttonText="Atualizar"
      // buttonClick={() => navigate('create')}
      />
      {/* {itemsSelect.length > 0 && (
      <Button
        variant="contained"
        color="error"
        sx={{ mb: 2 }}
        onClick={removeSelect}
      >
        Remover
      </Button>
    )} */}

      <S.ContainerProducts>
        {orders.map((item) => {
          return (
            <S.CardCustom onClick={() => { }}>
              <S.WrapperActions>
                <div className='action'>
                  <span className='fa fa-info'></span>
                  Ver detalhe
                </div>

              </S.WrapperActions>

              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <S.CardContentCustom sx={{ flex: '1 0 auto', pt: 0 }}>
                  <S.CardInfo>
                    <span style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span><strong>Pedido:</strong> #{item?.id}</span>
                      <stong>{new Date(item.date).toLocaleString('pt-BR')}</stong>
                    </span>
                    <span>
                      <strong>Client: </strong> {item?.client?.name}
                    </span>
                    <span>
                      <strong>Delivery: </strong>
                      {item.deliveryType === 'pickup' && 'Retirada'}
                      {item.deliveryType === 'delivery' && item.address.freeformAddress}
                    </span>
                    <span style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>
                        <strong>Status: </strong>
                        {
                          (item?.status === 'awaiting-approval') && 'Aguardando aprovação'
                        }
                      </span>
                      <span>
                        <strong>Total: </strong>
                        {'22'.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </span>
                    </span>
                  </S.CardInfo>
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
        // onChange={changePage}
      />
    </Box>
  );
}
