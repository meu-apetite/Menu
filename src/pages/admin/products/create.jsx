import React, { useEffect, useId, useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'
import ButtonUpload from 'components/ButtonUpload'
import Galery from 'components/Galery'
import Select from 'components/Select'
import convertFile from 'utils/convertBase64'
import fetchApi from 'fetch'
import Variations from 'components/Variations'
import Header from 'components/Header'

const propsTextFields = {
  margin: 'dense',
  required: true,
  fullWidth: true,
  autoFocus: true,
}

const Create = ({ navigation }) => {
  const [data, setData] = useState({
    name: '',
    description: '',
    code: '',
    linkExternal: '',
    price: 0,
    quantity: 0,
    quantityShow: true,
    sellWithoutQuantity: false,
    categories: [],
    tags: [],
    images: [],
  })
  const [categories, setCategories] = useState([])
  const generatorId = useId()

  //Images
  const loadFile = async (e) => {
    const file = e.target.files[0]
    const fileBase64 = await convertFile(file)
    const id = generatorId.concat(data.images.length)
    setData({
      ...data,
      images: [...data.images, { source: fileBase64, name: file.name, id }],
    })
  }

  const closeImage = (id) => {
    const filterImage = data.images.filter((item) => item.id !== id)
    setData({ ...data, images: filterImage })
  }

  useEffect(() => {
    async function fetchCategories() {
      let response = await fetchApi('get', 'categories')
      response = await response.json()
      setCategories(
        response.map((item) => ({ text: item.title, value: item._id })),
      )

      const productCurrent = localStorage.getItem('product')
      if (productCurrent) setData(JSON.parse(productCurrent))
    }
    fetchCategories()
  }, [])

  

  return (
    <>
      <Header title="Novo produto" back={-1} buttonText="Salvar" />

      <Box component="section" noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            <TextField
              {...propsTextFields}
              label="Nome"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              {...propsTextFields}
              required={false}
              label="Código"
              value={data.code}
              onChange={(e) => setData({ ...data, code: e.target.value })}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              {...propsTextFields}
              label="Preço (R$)"
              value={data.price}
              onChange={(e) => setData({ ...data, price: e.target.value })}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              {...propsTextFields}
              label="Quantidade"
              value={data.quantity}
              onChange={(e) => setData({ ...data, quantity: e.target.value })}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              {...propsTextFields}
              label="Descrição"
              multiline
              maxRows={4}
              value={data.description}
              onChange={(e) => setData({ ...data, description: e.target.value })}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 1 }}>
            <Select
              data={categories}
              label="Categorias"
              change={(e) => setData({ ...data, categories: e.target.value })}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default Create
