import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import fecthApi from 'fetch'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Header from 'components/Header'
import ButtonUpload from 'components/ButtonUpload'
import Galery from 'components/Galery'
import convertFile from 'utils/convertBase64'
import { AuthContext } from 'contexts/auth'

const Create = () => {
  const navigate = useNavigate()
  const [data, setData] = useState({ title: '', image: null })
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const setLoading = useContext(AuthContext).setLoading
  const toast = useContext(AuthContext).toast

  const handleSubmit = async (e) => {
    try {
      if (data.title === '') {
        toast('Preencha o campo "Nome"', { icon: 'ℹ️' })
        return
      }

      setLoading('Criando categoria...')

      e.preventDefault()
      const response = await fecthApi('post', 'categories', data)
      const category = await response.json()

      toast.success('Categoria criada!')
      setButtonDisabled(true)
      setTimeout(
        () =>
          navigate({
            pathname: '/admin/categories',
            search: category._id,
          }),
        3000,
      )
    } catch (e) {
      toast.error('Erro ao criar a categoria')
    } finally {
      setLoading(false)
    }
  }

  //Load image
  const loadFile = async (e) => {
    const file = e.target.files[0]
    const fileBase64 = await convertFile(file)
    setData({ ...data, image: { file: fileBase64, title: file.name } })
  }

  const closeImage = () => setData({ ...data, image: null })

  return (
    <>
      <Header
        title="Nova categoria"
        back={-1}
        buttonText="Salvar"
        buttonClick={handleSubmit}
        buttonDisabled={buttonDisabled}
      />

      <Box component="section" noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <TextField
              onBlur={(e) => setData({ ...data, title: e.target.value })}
              margin="dense"
              required
              fullWidth
              label="Nome"
              autoFocus
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <label>Foto da categoria</label>
            <Galery
              data={data.image ? [data.image] : []}
              closeImage={closeImage}
            />
            <ButtonUpload
              text={!data.image ? 'carregar foto' : 'Mudar foto'}
              loadFile={loadFile}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default Create
