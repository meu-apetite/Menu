import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import ButtonUpload from 'components/ButtonUpload';
import Header from 'components/Header';
import Gallery from 'components/Gallery';
import { Button } from '@mui/material';
import { AuthContext } from 'contexts/auth';
import { ApiService } from 'services/api.service';

const Update = () => {  
  const apiService = new ApiService();
  const {setLoading, toast } = useContext(AuthContext);

  const { search } = useLocation();
  const id = search.replace('?', '');

  const [category, setCategory] = useState({ title: '' });
  const [image, setImage] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading('Atualizando');

      if (!category.title.trim().length ) return toast('Preencha o campo "Nome"', { icon: 'ℹ️' });
      
      const response = await apiService.put(
        `category/${category._id}`, 
        { title: category.title }
      );
      const categoryUpdate = response.data;

      setCategory(categoryUpdate);
      toast.success('Atualizado!');
    } catch (e) {
      toast.error('Erro ao atualizar a categoria.');
    } finally {
      setLoading(null);
    }
  };

  const getCategory = async () => {
    const response = await apiService.get(`/admin/category/${id}`);
    const data = response.data;

    console.log(response)


    setCategory(data);

    if(data.image) setImage({ title: data.title, src: data.image });
  };

  const loadFile = async (e) => setImage(e.target.files[0]);

  const removeImage = async (e) => {
    try {
      const response = await apiService.post(
        `category/delete-image/${id}`, 
        { imageUrl: category.image }
      );
      const data = response.data;

      setCategory(data);
      if(!data.image) setImage(null);

      toast.success('Foto removida!');
    } catch (e) {
      console.log(e)
      toast.error('Não foi possível remover a foto.');
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <>
      <Box component="section" noValidate>
        <Header title="Editar categoria" back={-1} buttonText="Salvar" buttonClick={handleSubmit} />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <TextField
              margin="dense"
              required
              fullWidth
              name="title"
              label="Nome"
              InputLabelProps={{ shrink: true }}
              value={category.title}
              onChange={(e) => setCategory({ ...category, title: e.target.value })}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <label>Foto da categoria</label>
            <Gallery data={image ? [image] : []} closeImage={removeImage} />
            {
              image 
                ? <Button variant="outlined" sx={{ mt: 1 }} onclick={removeImage}>Remover imagem</Button> 
                : <ButtonUpload text="Carregar imagem" loadFile={loadFile} />
            }
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Update;
