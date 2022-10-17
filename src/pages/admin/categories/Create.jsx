import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import fecthApi from 'fetch'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import ButtonUpload from 'components/ButtonUpload'
import Galery from 'components/Galery'
import convertFile from 'utils/convertBase64'
import Container from 'components/Container'

const Create = () => {
  const navigate = useNavigate()
  const [images, setImages] = useState([])

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      const data = new FormData(e.currentTarget)
      const response = await fecthApi('post', 'categories', {
        title: data.get('title'),
        image: images[0],
      })
      const category = await response.json()

      toast.success('Categoria criada!')
      setTimeout(
        () =>
          navigate({
            pathname: '/admin/categories/view/',
            search: category._id,
          }),
        2500,
      )
    } catch (e) {
      toast.success('Erro ao criar a categoria')
    }
  }

  //Load images
  const loadFile = async (e) => {
    const file = e.target.files[0]
    const fileBase64 = await convertFile(file)
    setImages([{ file: fileBase64, title: file.name }])
  }

  const closeImage = (id) =>
    setImages((items) => items.filter((item) => item.id !== id))

  return (
    <Container
      component="form"
      title="Nova categoria"
      handleSubmit={handleSubmit}
    >
      <Box component="section" noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <TextField
              margin="dense"
              required
              fullWidth
              name="title"
              label="Nome"
              autoFocus
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <label>Foto da categoria</label>
            <Galery itemData={images} closeImage={closeImage} />
            <ButtonUpload
              text={!images[0] ? 'carregar foto' : 'Mudar foto'}
              loadFile={loadFile}
            />
          </Grid>
        </Grid>
      </Box>
      <Toaster position="bottom-right" reverseOrder={false} />
    </Container>
  )
}

export default Create
