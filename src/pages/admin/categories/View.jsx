import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import fetchApi from 'fetch'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Container from 'components/Container'
import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'

const View = () => {
  const navigate = useNavigate()
  const [category, setCategory] = useState({})
  const { search } = useLocation()
  const id = search.replace('?', '')

  const getCategory = async () => {
    let response = await fetchApi('get', `categories/${id}`)
    setCategory(await response.json())
  }

  useEffect(() => {
    getCategory()
  }, [])

  const remove = async () => {
    try {
      await fetchApi('delete', `categories/${[category._id]}`)
      navigate('/admin/categories/')
    } catch (e) {
      alert('error')
    }
  }

  const Nav = () => {
    return (
      <Stack spacing={2} direction="row">
        <Button
          variant="contained"
          onClick={() =>
            navigate({
              pathname: '/admin/categories/update/',
              search: category._id,
            })
          }
        >
          Editar
        </Button>
        <Button variant="outlined" color="error" onClick={remove}>
          Excluir
        </Button>
      </Stack>
    )
  }

  return (
    <Container component="section" title="Categoria" Custom={Nav}>
      <Box component="section" noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <Avatar
                src={category.image?.url}
                sx={{ width: '80px', height: '80px', mr: 2 }}
              />{' '}
              <TextField
                label="Nome"
                fullWidth
                InputProps={{ readOnly: true }}
                InputLabelProps={{ shrink: !!category.title }}
                value={category.title}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}
export default View
