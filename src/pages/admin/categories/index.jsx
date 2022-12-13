import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import fetchApi from 'fetch'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { DataGrid, ptBR } from '@mui/x-data-grid'

import { AuthContext } from 'contexts/auth'

import Avatar from '@mui/material/Avatar'
import Actions from 'components/Actions'
import Header from 'components/Header'

const columns = [
  {
    field: 'id',
    headerName: 'Cód',
    valueGetter: (params) => `${params.id}`,
    flex: 1,
    minWidth: 150,
  },

  {
    field: 'title',
    headerName: 'Nome',
    flex: 1,
    minWidth: 150,
  },

  {
    field: 'image',
    headerName: 'Imagem',
    renderCell: (params) => (
      <Avatar alt="Remy Sharp" src={params?.value?.url} />
    ),
    flex: 1,
    minWidth: 150,
  },

  {
    field: 'actions',
    headerName: 'Ações',
    renderCell: (params) => <Actions id={params.value} />,
    minWidth: 150,
    flex: 1,
  },
]

export default function DataGridDemo() {
  const [categories, setCategories] = useState([])
  const [itemsSelect, setItemsSelect] = useState([])
  const setLoading = useContext(AuthContext).setLoading
  const navigate = useNavigate()

  const getCategories = async () => {
    const response = await fetchApi('get', 'categories')
    setCategories(await response.json())
  }

  const removeSelects = async (ids) => {
    try {
      setLoading('Aguarde...')
      await fetchApi('delete', `categories/${itemsSelect}`)
      getCategories()
      toast.success('Itens selecionados, excluidos!')
    } catch (e) {
      toast.error('Não foi possível excuir os itens selecionados!')
    } finally {
      setLoading(null)
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
    <>
      <Header
        title="Categorias"
        buttonText="Nova categoria"
        buttonClick={() => navigate('create')}
      />

      {itemsSelect.length > 0 && (
        <Button
          variant="contained"
          color="error"
          sx={{ mb: 2 }}
          onClick={removeSelects}
        >
          Remover
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
    </>
  )
}
