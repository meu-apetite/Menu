import React, { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import ButtonUpload from 'components/ButtonUpload';
import Gallery from 'components/Gallery';
import Header from 'components/Header';
import { ApiService } from 'services/api.service';
import { Button } from '@mui/material';
import { AuthContext } from 'contexts/auth';

const Create = () => {
  const apiService = new ApiService();

  const { toast, setLoading } = useContext(AuthContext);

  const [logo, setLogo] = useState();
  const [gallery, setGallery] = useState([]);
  const [data, setData] = useState({
    fantasyName: '',  
    slogan: '', 
    description: '',
    custom: { googleMapUrl: '' }
  });

  const formSubmit = async (e) => {
    e.preventDefault();
    setLoading('Agurade...');

    try {
      const formData = data;
      formData.custom.gallery = gallery;
      formData.custom.logo = logo;
  
      const response = await apiService.put('/admin/company', formData);
      setData(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(null);
    }
  };

  const loadImageGallery = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    apiService.post('/admin/company/gallery', formData, true)
      .then(res => {
        setGallery([]);

        const newGallery = [...res.data];

        newGallery.forEach((item) => {
          setGallery(prev => [...prev, { url: item.url, id: item.id }]);
        });

        toast.success('Galeria atualizada');
      })
      .catch((error) => toast.error('Não foi possível atualizar'));
  };

  const removeImageGallery = async (index) => {
    try {
      const response = await apiService.delete('/admin/company/gallery/' + encodeURIComponent(gallery[index].id));
      const newGallery = response.data;
      
      setGallery([]);

      newGallery.forEach((item) => setGallery(prev => [...prev, { 
        title: '', url: item.url, id: item.id }])
      );

      toast.success('Imagem removida');
    } catch (e) {
      console.log(e)
      toast.error('Não foi possível remover a foto.');
    }
  };

  const updateLogo = async (e) => {
    const formData = new FormData();
    formData.append('logo', e.target.files[0]);

    apiService.post('/admin/company/logo', formData, true)
      .then(res => {
        console.log(res)
        setLogo({ title: 'Logo', url: res.data.url, id: res.data.id });
        toast.success('Logo atualizada');
      })
      .catch((error) => console.log(error));
  };

  const removeLogo = async () => {
    apiService.delete('/admin/company/logo/' + encodeURIComponent(logo.id)).then(_ => {
        setLogo(null);
        toast.success('Logo removida');
      })
      .catch((error) => toast.error('Não foi possível remover o logo'));
  };

  const getData = async (id) => {
    const response = await apiService.get('/admin/company/');
    const data = response.data;

    setData({ 
      ...data,
      fantasyName: data.fantasyName || '', 
      slogan: data.slogan || '', 
      description: data.description || '', 
      custom: { ...data.custom, googleMapUrl: data.custom.googleMapUrl || '' }
    });

    setGallery([]);

    if (data.custom.logo) {
      setLogo({ 
        title: 'Logo', 
        url: data.custom.logo.url, 
        id: data.custom.logo.id  
      });

      delete data.custom.logo;
    }
    
    if (data.custom.gallery) {
      const gallery = data.custom.gallery;
      gallery.forEach((item) => {
        setGallery(prev => [...prev, { url: item.url, id: item.id}]);
      });

      delete data.custom.gallery;
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Header
        title="Aparência da loja"
        back={-1}
        buttonText="Salvar"
        buttonClick={formSubmit}
      />

      <Box component="section" noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <TextField
              label="Nome da loja"
              value={data.fantasyName}
              onChange={(e) => setData({ ...data, fantasyName: e.target.value })}
              InputLabelProps={{ shrink: true }}
              margin="dense"
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <TextField
              label="Slogan"
              value={data.slogan}
              onChange={(e) => setData({ ...data, slogan: e.target.value })}
              InputLabelProps={{ shrink: true }}
              margin="dense"
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <TextField
              label="Sobre nós"
              value={data.description}
              onChange={(e) => setData({ ...data, description: e.target.value })}
              InputLabelProps={{ shrink: true }}
              rows={3}
              margin="dense"
              multiline
              fullWidth
              required
            />
          </Grid>
          
          <Grid item xs={12} sm={12}>
            <label>Logomarca</label>
            <Gallery data={logo ? [logo] : []} closeImage={removeLogo} />
            { !logo && <ButtonUpload text="Adicionar logo" loadFile={updateLogo} /> }
          </Grid>

          <Grid item xs={12} sm={12}>
            <label>Galeria de imagens</label>
            <Gallery data={gallery} closeImage={removeImageGallery} />
            <ButtonUpload text="Carregar imagem" loadFile={loadImageGallery} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Create;
