import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid, ptBR } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Header from 'components/Header';
import { ApiService } from 'services/api.service';
import { AuthContext } from 'contexts/auth';
import { Button, Checkbox } from '@mui/material';

const columns = [
  { field: 'name', headerName: 'Nome', flex: 1 },
  { field: 'category', headerName: 'Categoria', flex: 1 },
  { 
    field: 'price', 
    headerName: 'Preço', 
    renderCell: (params) => params.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), 
    flex: 1 
  },
  { 
    field: 'isActive', 
    headerName: 'Ativo',    
    renderCell: (params) => params.value ? 'Sim' : 'Não', 
    flex: 1 
  }
];

export default function DataGridDemo() {
  const navigate = useNavigate();
  const apiService = new ApiService();

  const [rows, setRows] = useState([]);
  const [itemsSelect, setItemsSelect] = useState([]);
  const { setLoading, toast } = useContext(AuthContext);
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const response = await apiService.get('/admin/product');
    setProducts(response.data);
  };

  const removeSelect = async () => {
    try {
      setLoading('Aguarde...');

      const response = await apiService.post(`/admin/product/delete-multiple`, {
        productIds: itemsSelect,
      });
      setProducts(response.data);

      toast.success('Categorias excluidas');
    } catch (e) {
      toast.error('Não foi possível excuir os itens selecionados!');
    } finally {
      setLoading(null);
    }
  };

  useEffect(() => {
    setRows(
      products.map((item) => {
        return {
          id: item._id,
          name: item.name,
          price: item.price,
          isActive: item.isActive,
          description: item.description,
          category: item.category?.title,
          image: item.images?.[0],
          actions: item._id,
        };
      }),
    );
  }, [products]);

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Box sx={{ height: 430, width: '100%' }}>
      <Header
        title="Produtos"
        buttonText="Novo produto"
        buttonClick={() => navigate('create')}
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

      <DataGrid
        localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
        rows={rows}
        columns={columns}
        pageSize={12}
        rowsPerPageOptions={[12]}
        onSelectionModelChange={(ids) => setItemsSelect(ids)}
        checkboxSelection
        disableSelectionOnClick
      />
    </Box>
  );
}
