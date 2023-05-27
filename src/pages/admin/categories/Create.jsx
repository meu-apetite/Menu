import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import fecthApi from 'fetch';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Header from 'components/Header';
import ButtonUpload from 'components/ButtonUpload';
import Galery from 'components/Galery';
import { AuthContext } from 'contexts/auth';

const Create = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ title: '', image: null });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const {setLoading, toast } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!data.title.length ) return toast('Preencha o campo "Nome"', { icon: 'ℹ️' });
      setLoading('Criando categoria...');

      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('image', data.image);
      
      const response = await fecthApi('post', 'category', formData, true, true);
      const category = await response.json();

      toast.success('Categoria criada!');
      setButtonDisabled(true);
      setTimeout(
        () => navigate({ pathname: '/admin/categories', search: category._id }),
        3000
      );
    } catch (e) {
      toast.error('Erro ao criar a categoria');
    } finally {
      setLoading(false);
    }
  };

  const loadFile = async (e) => setData({ ...data, image: e.target.files[0] });
   
  const closeImage = () => setData({ ...data, image: null });

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
            <Galery data={data.image ? [data.image] : []} closeImage={closeImage} />
            <ButtonUpload text={!data.image ? 'carregar foto' : 'Mudar foto'} loadFile={loadFile} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Create;
