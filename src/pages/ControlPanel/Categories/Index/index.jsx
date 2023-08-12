  import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { DataGrid, ptBR } from '@mui/x-data-grid';
import { AuthContext } from 'contexts/auth';
import Actions from 'components/Actions';
import Header from 'components/Header';
import { ApiService } from 'services/api.service';

export default function Categories() {
  const navigate = useNavigate();
  const apiService = new ApiService();

  const [categories, setCategories] = useState([]);
  const [itemsSelect, setItemsSelect] = useState([]);
  const { setLoading, toast } = useContext(AuthContext);

  const getCategories = async () => {
    const response = await apiService.get('/admin/category');
    setCategories(response.data);
  };

  const removeSelect = async (ids) => {
    try {
      setLoading('Aguarde...');

      const response = await apiService.post(`/admin/category/delete-multiple`, { categories: itemsSelect });
      setCategories(response.data);

      toast.success('Categorias excluidas');
    } catch (e) {
      toast.error('Não foi possível excuir os itens selecionados!');
    } finally {
      setLoading(null);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const row = categories.map((item) => {
    return {
      id: item._id,
      title: item.title,
      image: item.image,
      actions: item._id,
    };
  });

  const columns = [
    {
      field: 'title',
      headerName: 'Nome',
      flex: 1,
      minWidth: 150,
    },
    {
      field: 'image',
      headerName: 'Foto da categoria',
      renderCell: (params) => (
        <img
          src={params.value}
          alt={params}
          loading="lazy"
          style={{ width: '30%',  minWidth: 90}}
        />
      ),
      flex: 1,
      minWidth: 150,
    },
    { 
      field: 'actions',
      headerName: 'Ações',
      renderCell: (params) => (<Actions
        viewFn={() => navigate({ pathname: 'view/', search: params.value })}
        updateFn={() => navigate({ pathname: 'update/', search: params.value })}
        deleteFn={async () => {
          try {
            setLoading('Excluindo...');

            const response = await apiService.delete(`/admin/category/${params.value}`);
            setCategories(response.data);
            
            toast.success('Categoria excluída');
          } catch (error) {
            toast.error('Algo deu errado ao tentar excluir a categoria');
          } finally {
            setLoading(null);
          }
        }}
      />),
      minWidth: 150,
      flex: 1,
    },
  ];

  return (
    <>
      <Header
        title="Categorias"
        buttonText="Nova categoria"
        buttonClick={() => navigate('create')}
      />

      {itemsSelect.length > 0 && (
        <Button variant="contained" color="error" sx={{ mb: 2 }} onClick={removeSelect}>
          Remover
        </Button>
      )}

      <Box sx={{ height: '70vh', width: '100%' }}>
        <DataGrid
          localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
          rows={row}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
          onSelectionModelChange={(ids) => setItemsSelect(ids)}
        />
      </Box>
    </>
  );
}
