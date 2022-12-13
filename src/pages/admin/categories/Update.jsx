import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import ButtonUpload from 'components/ButtonUpload'
import Header from 'components/Header'
import Galery from 'components/Galery'
import convertFile from 'utils/convertBase64'
import fetchApi from 'fetch'

const Create = () => {
  const [data, setData] = useState({ title: '' })
  const [image, setImage] = useState(null)
  const [category, setCategory] = useState({})
  const [loadingText, setLoadingText] = useState(null)
  const { search } = useLocation()
  const id = search.replace('?', '')

  const handleSubmit = async (e) => {
    try {
      setLoadingText('Atualizando')
      e.preventDefault()
      const response = await fetchApi('put', `categories/${category._id}`, {
        title: data.title,
        image: image,
      })
      const categoryUpdate = await response.json()

      setCategory(categoryUpdate)
      toast.success('Atualizado.')
    } catch (e) {
      toast.error('Erro ao atualizar a categoria.')
    } finally {
      setLoadingText(null)
    }
  }

  const getCategory = async () => {
    let response = await fetchApi('get', `categories/${id}`)
    response = await response.json()
    setCategory(response)
    setData({ title: response.title })
  }

  const loadFile = async (e) => {
    const file = e.target.files[0]
    const fileBase64 = await convertFile(file)
    setImage({ file: fileBase64, title: file.name })
  }

  const removeImage = async (e) => {
    try {
      const response = await fetchApi(
        'delete',
        `categories-image/${category?.image?.id}/${category?.image?.cdnCode}/${category._id}`,
      )
      const categoryUpdate = await response.json()

      setCategory(categoryUpdate)
      toast.success('Foto removida!')
    } catch (e) {
      toast.error('Não foi possível remover a foto.')
    } finally {
      setImage(null)
    }
  }

  useEffect(() => {
    getCategory()
  }, [])

  return (
    <>
      <Box component="section" noValidate>
        <Header
          title="Editar categoria"
          back={-1}
          buttonText="Salvar"
          buttonClick={handleSubmit}
        />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <TextField
              margin="dense"
              required
              fullWidth
              name="title"
              label="Nome"
              InputLabelProps={{ shrink: true }}
              value={data.title}
              onChange={(e) => setData({ title: e.target.value })}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <label>Foto da categoria</label>
            {category.image ? (
              <Galery
                data={[
                  {
                    id: category?.image?.id,
                    file: category?.image?.url,
                    title: category?.title,
                  },
                ]}
                closeImage={removeImage}
              />
            ) : (
              <>
                <Galery
                  data={image ? [image] : []}
                  closeImage={() => setImage([])}
                />
                <ButtonUpload text="Carregar foto" loadFile={loadFile} />
              </>
            )}
          </Grid>
        </Grid>
      </Box>
      <Toaster position="bottom-right" reverseOrder={false} />
    </>
  )
}

export default Create
