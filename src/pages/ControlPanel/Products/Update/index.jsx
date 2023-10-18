import React, { useContext, useEffect, useState } from 'react';
import { Tab, Tabs, Grid, Box, TextField } from '@mui/material';
import { NumericFormat } from 'react-number-format';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from 'contexts/auth';
import { ApiService } from 'services/api.service';
import Gallery from 'components/Gallery';
import Select from 'components/Select';
import Header from 'components/Header';
import ButtonUpload from 'components/ButtonUpload';
import { propsInputReal, propsTextField } from 'utils/form';
import { units } from 'utils/units';


const Create = ({ navigation }) => {
  const apiService = new ApiService();
  const { id } = useParams();

  const navigate = useNavigate();

  const { setLoading, toast } = useContext(AuthContext);

  const [categories, setCategories] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const [tabCurrent, setTabCurrent] = useState(0);
  const [data, setData] = useState({
    name: '',
    description: '',
    code: '',
    price: null,
    discountPrice: null,
    status: true,
    category: '',
    unit: '',
    images: [],
  });
  const [helperText, setHelperText] = useState({});


  const loadImage = async (e) => {
    setGallery((arr) => [
      ...arr, {
        name: e.target.files[0].name,
        src: URL.createObjectURL(e.target.files[0]),
      }
    ]);

    setData({ ...data, images: [...data.images, e.target.files[0]] });
  };

  const removeImage = (index) => {
    const galleryFilter = gallery;
    const imagesFilter = data.images;
    galleryFilter.splice(index, 1);
    imagesFilter.splice(index, 1);
    setGallery(galleryFilter);
    setData({ ...data, images: imagesFilter });
  };

  const getCategories = async () => {
    const { data } = await apiService.get('/admin/categories');
    setCategories(data.map((item) => ({ text: item.title, value: item._id })));
  };

  const getProduct = async () => {
    try {
      setLoading('Buscando produto...');
      const { data } = await apiService.get('/admin/products/' + id);
      setData({
        name: data.name,
        description: data.description,
        code: '',
        price: data.price,
        discountPrice: null,
        status: data.isActive,
        category: data.category._id,
        unit: '',
        images: [],
      });

      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(null);
    }
  };

  const validateData = () => {
    let errors = 0;

    setHelperText({});

    if (!data.name.trim().length) {
      setHelperText({ name: 'Preencha o campo' });
      toast.error('O nome do produto não pode ficar vazio');
      errors += 1;
    }

    if (data.price) {
      let price = data.price + '';
      price = price?.replaceAll('.', '').replace(',', '.')?.replace('R$', '');
      price = Number(price);

      console.log('aqui  ' + price);

      setData({ ...data, price: price });
    }

    if (!data.price) {
      setHelperText((prev) => ({ ...prev, price: 'Preço é obrigatório' }));
      toast.error('O nome do preço é obrigatório');
      errors += 1;
    }

    if (data.discountPrice && !data.discountPrice > 0) {
      setHelperText((prev) => ({ ...prev, discountPrice: 'Preço inválido' }));
      errors += 1;
    }

    if (!data.unit) {
      toast.error('Selecione a unidade de medida do produto');
      errors += 1;
    }

    if (!data.category) {
      toast.error('Selecione a categoria do produto');
      errors += 1;
    }

    if (errors) return false;

    return true;
  };

  const handleSubmit = async () => {
    if (!validateData()) return;
    setLoading('Criando produto...');


    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('description', data.description);
      formData.append('code', data.code);
      formData.append('price', data.price);
      formData.append('discountPrice', data.discountPrice);
      formData.append('isActive', data.status);
      formData.append('category', data.category);
      formData.append('unit', data.unit);

      await apiService.post('/admin/products', formData, true);

      toast.success('Produto cadastrado');

      setTimeout(() => {
        // navigate({ pathname: '/admin/products' });
      }, 2000);
    } catch (error) {
      if (error?.response?.data?.message) return toast.error(error?.response?.data?.message);
      toast.error('Erro ao cadastrar produto');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event, newValue) => setTabCurrent(newValue);

  const customInput = React.forwardRef((props, ref) => <TextField {...props} />);

  useEffect(() => {
    getProduct();
    getCategories();
  }, []);

  return (
    <>
      <Header
        title="Editar produto"
        back={-1}
        buttonText="Salvar"
        buttonClick={handleSubmit}
        buttonDisabled={isSubmitDisabled}
      />

      <Box sx={{ bgcolor: 'background.paper', mb: 2 }}>
        <Tabs value={tabCurrent} onChange={handleChange} variant="scrollable">
          <Tab label="Detalhes" />
          <Tab label="Complementos" />
        </Tabs>
      </Box>

      <Box component="section">
        {tabCurrent === 0 && (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                label="Nome"
                helperText={helperText?.name}
                required={true}
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                {...propsTextField}
              />
            </Grid>

            <Grid item xs={6} sm={6}>
              <TextField
                label="Código"
                helperText={helperText?.code}
                value={data.code}
                onChange={(e) => setData({ ...data, code: e.target.value })}
                {...propsTextField}
              />
            </Grid>

            <Grid item xs={6} sx={{ display: 'flex', alignItems: 'end', mb: '4px' }}>
              <Select
                data={[{ text: 'Ativo', value: true }, { text: 'Desativo', value: false }]}
                label="Status"
                value={data.status}
                onChange={(e) => console.log(e.target.value)}
              />
            </Grid>

            <Grid item xs={6} >
              <TextField
                label="Preço"
                helperText={helperText?.price}
                customInput={customInput}
                required={true}
                value={data.price}
                defaultValue={data.price}
                onBlur={(e) => setData({ ...data, price: e.target.value })}
                {...propsTextField}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                helperText={helperText?.discountPrice}
                label="Preço com desconto"
                value={data.discountPrice}
                onBlur={(e) => setData({ ...data, discountPrice: e.target.value })}
                {...propsTextField}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                helperText={helperText?.description}
                label="Descrição"
                multiline
                rows={3}
                value={data.description}
                onChange={(e) => setData({ ...data, description: e.target.value })}
                {...propsTextField}
              />
            </Grid>

            <Grid item xs={12} sx={{ mt: 1.1 }}>
              <Select
                value={data.unit}
                data={units}
                label="Unidade de medida *"
                onChange={(e) => setData({ ...data, unit: e.target.value })}
              />
            </Grid>

            <Grid item xs={12} sx={{ mt: 1.1, mb: 1.1 }}>
              <Select
                value={data.category}
                data={categories}
                label="Categoria *"
                onChange={(e) => setData({ ...data, category: e.target.value })}
              />
            </Grid>

            <Grid item xs={12}>
              <ButtonUpload
                text={gallery ? 'Adicionar imagem' : 'Adicionar nova image'}
                loadFile={loadImage}
              />
              <Gallery data={gallery} closeImage={removeImage} />
            </Grid>
          </Grid>
        )}
      </Box>
    </>
  );
};

export default Create;
