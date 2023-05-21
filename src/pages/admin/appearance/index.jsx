import React, { useEffect, useState } from 'react'
import fecthApi from 'fetch'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import ButtonUpload from 'components/ButtonUpload'
import Galery from 'components/Galery'
import convertFile from 'utils/convertBase64'
import Header from 'components/Header'
import fetchApi from 'fetch'

const Create = () => {
  const [images, setImages] = useState([])
  const [logo, setLogo] = useState([])
  const [data, setData] = useState([])
  const [uploadResult, setUploadResult] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const response = await fecthApi('post', 'category', {
      name: data.get('name'),
      image: images[0],
    })
    console.log(response)
  }

  const loadImage = async (e) => {
    const file = e.target.files[0]
    const fileBase64 = await convertFile(file)
    setImages((arr) => [...arr, { src: fileBase64, title: file.name }])
  }
 
  const upload = async (e) => {
    const file = e.target.files[0];
    const response = await fecthApi('post', 'upload', { file: await convertFile(file) });
    setUploadResult(response);
  }

  const updateLogo = async (e) => {
    const formData = new FormData();
    formData.append('file', e.target.files[0]);

    const response = await fecthApi('post', 'settings/logo', formData, true, true);
    const data = await response.json();

    setLogo([{ title: 'logo', src: data.src }]);
  }

  const deleteLogo = async (src) => {
    const response = await fecthApi('post', `settings/logo-delete`, { src });
    if(!response.logo) setLogo([]);
  }

  const getData = async (id) => {
    let response = await fetchApi('get', 'settings')
    response = await response.json()
    console.log(response)

    if(response.logo) setLogo([{ title: 'logo', src: response.logo }])
    setImages(response.galleryImages)
    setData(response)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <Header
        title="Aparência da loja"
        back={-1}
        buttonText="Salvar"
        buttonClick={handleSubmit}
      />

      <Box component="section" noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <TextField
              margin="dense"
              InputLabelProps={{ shrink: true }}
              required
              fullWidth
              label="Nome da loja"
              value={data.fantasyName}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <TextField
              margin="dense"
              InputLabelProps={{ shrink: true }}
              required
              fullWidth
              label="Slogan"
              value={data.slogan}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <TextField
              margin="dense"
              InputLabelProps={{ shrink: true }}
              required
              fullWidth
              label="Descrição"
              multiline
              maxRows={4}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <TextField
              margin="dense"
              InputLabelProps={{ shrink: true }}
              fullWidth
              label="Link da localização da loja"
            />
          </Grid>

          <Grid item xs={12} sm={12} sx={{ marginBottom: 1 }}>
            <Box>Logo</Box>
            { !logo.length && <ButtonUpload text="carregar foto" loadFile={updateLogo} /> }
            <Galery itemData={logo} closeImage={deleteLogo} />
          </Grid>

          <Grid item xs={12} sm={12}>
            <Box>Fotos galeria (6 fotos)</Box>
            { images.length <= 6 && <ButtonUpload text="carregar foto" loadFile={upload} /> }
            <Galery itemData={images} closeImage={deleteLogo} />
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default Create
