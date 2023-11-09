import React, { useState, useEffect } from 'react'
import { DataGrid, ptBR } from '@mui/x-data-grid'
import Box from '@mui/material/Box'
import Header from 'components/Header'
import { ApiService } from 'services/api.service'

const columns = [
  // {
  //   field: 'code',
  //   headerName: 'Cód.',
  //   width: 150,
  // },
  // {
  //   field: 'name',
  //   headerName: 'Nome',
  //   width: 300,
  // },
  // {
  //   field: 'categories',
  //   headerName: 'Categorias',
  //   width: 200,
  // },
  // {
  //   field: 'variations',
  //   headerName: 'Variações',
  //   description: 'This column has a value getter and is not sortable.',
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params) =>
  //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  // },
  // {
  //   field: 'price',
  //   headerName: 'Preço',
  //   width: 200,
  // },
]

export default function Index() {
  const apiService = new ApiService()
  const [orders, setOrders] = useState([])

  const getOrders = async () => {
    const { data } = await apiService.get('/admin/orders')
    setOrders(data)
  }

  useEffect(() => {
    getOrders()
  }, [])

  // const rowOrders = orders.map((item) => (item.id = item._id))

  return (
    <>
      <Header
        title="Pedidos"
        back={-1}
        buttonText="Atualizar"
        // buttonClick={handleSubmit}
        // buttonDisabled={isSubmitDisabled}
      />

      <table>
        <thead>
          <tr>
            <td>Produtos</td>
            <td>Valor Total</td>
          </tr>
        </thead>
        <tbody>
          {orders.map((item) => {
            return (
              <tr>
                <td>{item.total}</td>
                <td>{item.total}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}
