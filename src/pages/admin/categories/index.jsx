import React, { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import fetchApi from 'fetch'
import Box from '@mui/material/Box'
import { DataGrid, ptBR } from '@mui/x-data-grid'
import Container from 'components/Container'
import Avatar from '@mui/material/Avatar'
import Actions from 'components/Actions'
import { Button } from '@mui/material'

const columns = [
  {
    field: 'id',
    headerName: 'Cód.',
  },
  {
    field: 'title',
    headerName: 'Nome',
  },
  {
    field: 'image',
    headerName: 'Imagem',
    renderCell: (params) => (
      <Avatar alt="Remy Sharp" src={params?.value?.url} />
    ),
  },
  {
    field: 'actions',
    headerName: 'Ações',
    renderCell: (params) => <Actions id={params.value} />,
  },
]

export default function DataGridDemo() {
  const [categories, setCategories] = useState([])
  const [itemsSelect, setItemsSelect] = useState([])
  const [loadingText, setLoadingText] = useState(null)

  const getCategories = async () => {
    const response = await fetchApi('get', 'categories')
    setCategories(await response.json())
  }

  const removeSelects = async (ids) => {
    try {
      setLoadingText('Aguarde...')
      const response = await fetchApi('delete', `categories/${itemsSelect}`)
      const categoriesUpdate = await response.json();

      setCategories(categoriesUpdate)
      toast.success('Itens selecionados, excluidos!')
    } catch (e) {
      toast.error('Não foi possível excuir os itens selecionados!')
    } finally {
      setLoadingText(null)
    }
  }

  useEffect(() => {
    getCategories()
  }, [])

  const row = categories.map((item) => {
    return {
      id: item._id,
      title: item.title,
      image: item.image,
      actions: item._id,
    }
  })

  return (
    <Container
      component="main"
      title="Categorias"
      buttonLink={{ text: 'Nova categoria', route: '/admin/categories/create' }}
      loading={loadingText}
    >
      {itemsSelect.length > 0 && (
        <Button
          variant="contained"
          color="error"
          sx={{ mb: 2 }}
          onClick={removeSelects}
        >
          Delete
        </Button>
      )}

      <Box sx={{ height: 430, width: '100%' }}>
        <DataGrid
          localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
          rows={row}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
          onSelectionModelChange={(ids) => setItemsSelect(ids)}
        />
      </Box>

      <Toaster position="bottom-right" reverseOrder={false} />
    </Container>
  )
}
