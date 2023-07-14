import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Header from 'components/Header';
import ButtonUpload from 'components/ButtonUpload';
import Gallery from 'components/Gallery';
import { AuthContext } from 'contexts/auth';
import { ApiService } from 'services/api.service';

const Create = () => {
  const apiService = new ApiService();

  const navigate = useNavigate();
  const [data, setData] = useState({ title: '', image: null });
  const [gallery, setGallery] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const {setLoading, toast } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!data.title.trim().length ) return toast('Preencha o campo "Nome"', { icon: 'ℹ️' });
      setLoading('Criando categoria...');

      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('image', data.image);
      
      const response = await apiService.post('/admin/category', formData, true);
      const category = response.data;

      setButtonDisabled(true);

      toast.success('Categoria criada!');

      setTimeout(() => {
        navigate({ pathname: '/admin/categories', search: category._id });
        setLoading(false);
      }, 2000);
    } catch (e) {
      toast.error('Erro ao criar a categoria');
      setLoading(false);
    }
  };

  const loadFile = async (e) => {
    setData({ ...data, image: e.target.files[0] });
    setGallery([{ name: e.target.files[0].name, src: URL.createObjectURL(e.target.files[0])}]);
  }
   
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
            <Gallery data={gallery} closeImage={() => setGallery([])} />
            <ButtonUpload text={!gallery.length ? 'carregar foto' : 'Mudar foto'} loadFile={loadFile} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Create;
