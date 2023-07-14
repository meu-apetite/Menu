import React, { useContext, useEffect, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Tab, Tabs, Typography, Grid, Box, TextField, Button, Checkbox, FormControlLabel } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import { NumericFormat } from 'react-number-format';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from 'contexts/auth';
import { ApiService } from 'services/api.service';
import Gallery from 'components/Gallery';
import Select from 'components/Select';
import Header from 'components/Header';
import ButtonUpload from 'components/ButtonUpload';

const Create = ({ navigation }) => {
  const apiService = new ApiService();
  const navigate = useNavigate();
  const { setLoading, toast } = useContext(AuthContext);
  const propsTextFields = { margin: 'dense', required: true, fullWidth: true };
  const initComplement = { name: '', max: 0, min: 0, isRequerid: null, options: [{ name: '', description: '', price: 0 }] };

  const [categories, setCategories] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const [tabCurrent, setTabCurrent] = useState(1);
  const [units, setUnits] = useState([
    { text: 'Quilogramas', value: 'kg' },
    { text: 'Mililitros', value: 'mL' },
    { text: 'Litros', value: 'L' },
    { text: 'Unidades', value: 'un' },
    { text: 'Pacotes', value: 'pct' },
    { text: 'Caixas', value: 'cx' },
    { text: 'Porções', value: 'porc' },
    { text: 'Gramas', value: 'g' },
  ]);
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
  const [complements, setComplements] = useState([initComplement]);

  const loadImage = async (e) => {
    setGallery((arr) => [...arr, { name: e.target.files[0].name, src: URL.createObjectURL(e.target.files[0]) }]);
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
    const response = await apiService.get('/admin/category');
    const data = response.data;
    setCategories(data.map((item) => ({ text: item.title, value: item._id })));
  };

  const createComplement = async () => {
    try{
      await apiService.post('/admin/complement', complements);
      console.log('criado')
    } catch(error) {
      toast.error(
        error.response.data?.message || 
        'Não foi possível criar o complemento, verifique os dados e tente novamente'
      );
      console.log(error)
    }
  };


  const handleSubmit = async () => {
    createComplement();

    try {
      console.log('ok')
return
      setLoading('Criando produto...');

      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('description', data.description);
      formData.append('code', data.code);
      formData.append('price', data.price);
      formData.append('discountPrice', data.discountPrice);
      formData.append('isActive', data.status);
      formData.append('category', data.category);
      formData.append('unit', data.unit);

      for (let i = 0; i < data.images.length; i++) {
        formData.append('images', data.images[i]);
      }

      await apiService.post('/admin/product', formData, true);

      toast.success('Produto cadastrado');

      setTimeout(() => {
        navigate({ pathname: '/admin/product' });
        setLoading(false);
      }, 2000);
    } catch {
      toast.error('Erro ao cadastrar produto');
      setLoading(false);
    }
  };

  const handleChange = (event, newValue) => setTabCurrent(newValue);

  const customInput = React.forwardRef((props, ref) => <TextField {...props} />);

  const addComplement = () => setComplements([...complements, initComplement]);

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <Header
        title="Novo produto"
        back={-1}
        buttonText="Salvar"
        buttonClick={handleSubmit}
        buttonDisabled={isSubmitDisabled}
      />

      <Box sx={{ bgcolor: 'background.paper', mb: 2 }}>
        <Tabs value={tabCurrent} onChange={handleChange} variant="scrollable">
          <Tab label="Informações básicas" />
          <Tab label="Complemento" />
        </Tabs>
      </Box>

      <Box component="section">
        {tabCurrent === 0 && (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                {...propsTextFields}
                label="Nome"
                value={data.name}
                onChange={(e) => console.log(complements)}
              />
            </Grid>

            <Grid item xs={6} sm={6}>
              <TextField
                {...propsTextFields}
                required={false}
                label="Código"
                value={data.code}
                onChange={(e) => setData({ ...data, code: e.target.value })}
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

            <Grid item xs={6} sx={{ display: 'flex', alignItems: 'end', mb: '4px', mt: '10px' }}>
              <NumericFormat
                sx={{ width: '100%' }}
                customInput={customInput}
                thousandSeparator="."
                decimalSeparator=","
                prefix="R$ "
                label="Preço"
                name="price"
                required={true}
                defaultValue={data.price}
                onBlur={(e) => setData({ ...data, price: e.target.value })}
              />
            </Grid>

            <Grid item xs={6} sx={{ display: 'flex', alignItems: 'end', mb: '4px' }}>
              <NumericFormat
                sx={{ width: '100%' }}
                customInput={customInput}
                thousandSeparator="."
                decimalSeparator=","
                prefix="R$ "
                label="Preço com desconto"
                name="discountPrice"
                value={data.discountPrice}
                onBlur={(e) => setData({ ...data, discountPrice: e.target.value })}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                {...propsTextFields}
                // sx={{ height: 40 }}
                label="Descrição"
                multiline
                rows={3}
                value={data.description}
                onChange={(e) => setData({ ...data, description: e.target.value })}
              />
            </Grid>

            <Grid item xs={12} sx={{ mt: 1.1 }}>
              <Select
                value={data.unit}
                data={units}
                label="Unidade de medida"
                onChange={(e) => setData({ ...data, unit: e.target.value })}
              />
            </Grid>

            <Grid item xs={12} sx={{ mt: 1.1, mb: 1.1 }}>
              <Select
                value={data.category}
                data={categories}
                label="Categoria"
                onChange={(e) => setData({ ...data, category: e.target.value })}
              />
            </Grid>

            <Grid item xs={12}>
              <ButtonUpload text={gallery ? 'Adicionar imagem' : 'Adicionar nova image'} loadFile={loadImage} />
              <Gallery data={gallery} closeImage={removeImage} />
            </Grid>
          </Grid>
        )}

        {tabCurrent === 1 && (
          <Grid container spacing={2} sx={{ width: '100%', margin: 'auto' }}>
            {complements.map((item, i) => {
              const options = item.options || [];
              const setText = (index, key, text) => {
                const newComplement = [...complements];
                newComplement[index][key] = text;
                setComplements(newComplement);
              };

              const setValueOption = (index, indexOption, key, value) => {
                const newComplement = [...complements];
                newComplement[index].options[indexOption][key] = value;
                setComplements(newComplement);
              };

              const addComplement = (index) => {
                const newComplement = [...complements];
                newComplement[index].options.push({ name: '', price: 0 });
                setComplements(newComplement);
              };

              return (
                <Accordion key={i} sx={{width: '100%', margin: 'auto' }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                    <Typography>{i + 1} - Grupo de complemento </Typography>
                  </AccordionSummary>

                  <AccordionDetails>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={12}>
                        <TextField
                          {...propsTextFields}
                          InputLabelProps={{ shrink: true }}
                          label="Nome"
                          value={complements[i].name}
                          onChange={(e) => setText(i, 'name', e.target.value)}
                        />
                      </Grid>

                      <Grid item xs={12} sx={{ mt: 1.1, mb: 1.1 }}>
                        <Typography sx={{ fontWeight: "bold" }}>Indique se a categoria é necessária para pedir o prato</Typography>
                        <FormControlLabel 
                          control={
                            <Checkbox onChange={() => setText(i, 'isRequired', false)} checked={complements[i].isRequired === false} />
                          } 
                          label={"Opcional, o cliente pode ou não selecionar os itens " + complements[i].isRequired}
                        /> 
                        
                        <br />

                        <FormControlLabel 
                          sx={{ mt: 0.2 }} 
                          control={
                            <Checkbox onChange={() => setText(i, 'isRequired', true)} checked={complements[i].isRequired === true} />
                          }
                          label="Obrigatório, o cliente deve selecionar  1 ou mais itens para adicionar o pedido no carrinho"
                        />
                      </Grid>

                      <Grid item xs={6} sm={6}>
                        <TextField
                          {...propsTextFields}
                          InputLabelProps={{ shrink: true }}
                          label="Quant. mínima"
                          type="number"
                          value={complements[i].min}
                          onChange={(e) => setText(i, 'min', e.target.value)}
                        />
                      </Grid>

                      <Grid item xs={6} sm={6}>
                        <TextField
                          {...propsTextFields}
                          InputLabelProps={{ shrink: true }}
                          label="Quant. máxima"
                          type="number"
                          value={complements[i].max}
                          onChange={(e) => setText(i, 'max', e.target.value)}
                        />
                      </Grid>

                      <Grid item xs={12}><Typography><strong>Opções</strong></Typography></Grid>
                      {options.map((option, indexOption) => (
                        <>
                          <Grid item xs={12} sm={7}>
                            <TextField
                              {...propsTextFields}
                              margin='none'
                              size="small"
                              label="Nome"
                              value={complements[i].options[indexOption].name}
                              onChange={(e) => setValueOption(i, indexOption, 'name', e.target.value)}
                            />
                          </Grid>

                          <Grid item xs={8} sm={4}>
                            <TextField
                              {...propsTextFields}
                              margin='none'
                              size="small"
                              label="Valor adicional (R$)"
                              value={complements[i].options[indexOption].price}
                              onChange={(e) => setValueOption(i, indexOption, 'price', e.target.value)}
                            />
                          </Grid>

                          <Grid item xs={0.5} sm={0.5}><DeleteIcon /></Grid>
                        </>
                      ))}

                      <Grid item xs={12}>
                        <Button variant="outlined" onClick={() => addComplement(i)}>+ Novo complemento</Button>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              );
            })}

            <Grid item xs={12} sx={{ display: "flex", justifyContent: "end", flexWrap: "wrap", mt: 2, gap: 1 }}>
              <Button variant="contained" onClick={addComplement}>Novo grupo de complemento</Button>
              <Button variant="contained" onClick={addComplement}>Importar grupo</Button>
            </Grid>
          </Grid>
        )}
      </Box>
    </>
  );
};

export default Create;
