import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'
import { Divider } from '@mui/material'
import Tab from 'components/Tab'
import ButtonUpload from 'components/ButtonUpload'
import Galery from 'components/Galery'
import SelectCustom from 'components/Select'
import TabVertical from 'components/TabVertical'
import DeleteIcon from '@mui/icons-material/Delete'
import convertFile from 'utils/convertBase64'
import convertNumberRoman from 'utils/convertNumberRoman'
import Container from 'components/Container'

const modelVariation = {
  title: '',
  isMandatory: false,
  isMultiple: false,
  variants: [{ name: '', priceAdditional: 0 }],
}

const Create = () => {
  const [formData, setformData] = useState([])
  const [categories, setCategories] = useState([])
  const [images, setImages] = useState([])
  const [variations, setVariations] = useState([modelVariation])
  const [isVariations, setIsVariations] = useState(true)

  const handleSubmit = (e) => {
    e.preventDefault()
    alert("Blz")

    console.log(variations)
  }

  //Categories
  const handleChangeCategories = (e) => {
    const value = e.target.value
    setCategories(typeof value === 'string' ? value.split(',') : value)
  }

  //Load images
  const loadFile = async (e) => {
    const file = e.target.files[0]
    const fileBase64 = await convertFile(file)
    setImages((old) => [
      ...old,
      {
        img: fileBase64,
        title: file.name,
        index: `${file.name}-${parseInt(Math.random(0, 1) * 100000)}`,
      },
    ])
  }

  const closeImage = (id) => {
    setImages((items) => items.filter((item) => item.id !== id))
  }

  //Variations
  const toggleVariation = {
    createVariation() {
      setVariations((old) => [...old, modelVariation])
    },

    updateVariation(index, key, value) {
      const variantion = variations
      variantion[index][key] = value
      setVariations(variantion)
    },

    //Variants
    createVariants(parentIndex) {
      setVariations(
        variations.filter(
          (item, index) =>
            parentIndex === index &&
            item.variants.push({ name: '', priceAdditional: 0 }),
        ),
      )
    },

    updateVariants(itemIndex, parentIndex, name, value) {
      const variantion = variations
      variantion[parentIndex].variants[itemIndex][name] = value
      setVariations(variantion)
    },

    remove(index) {
      document.querySelector(`[data-variation-index='${index}']`).remove()
    },
  }

  return (
    <Container component="form" title="Novo produto" handleSubmit={handleSubmit}>
      <Tab
        tabs={[
          {
            title: 'Informações',
            body: (
              <Box component="section" noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={8}>
                    <TextField
                      margin="dense"
                      required
                      fullWidth
                      name="name"
                      label="Nome"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      margin="dense"
                      fullWidth
                      id="code"
                      label="Código"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      margin="dense"
                      required
                      fullWidth
                      name="price"
                      label="Preço (R$)"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      margin="dense"
                      fullWidth
                      name="price"
                      label="Comparação de preço (R$)"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      margin="dense"
                      name="description"
                      label="Descrição"
                      fullWidth
                      multiline
                      maxRows={4}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <SelectCustom
                      data={['OK', 'Ok1', 'Ok2']}
                      categories={categories}
                      change={handleChangeCategories}
                    />
                  </Grid>
                </Grid>
              </Box>
            ),
          },

          {
            title: 'Variações',
            body: (
              <Box component="section" noValidate>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        onChange={() => setIsVariations(!isVariations)}
                        checked={isVariations}
                      />
                    }
                    label="Este produto tem opções, como tamanho ou cor?"
                  />
                </Grid>

                {isVariations &&
                  variations.map((item, itemIndex) => {
                    let numberOrder = itemIndex

                    return (
                      <TabVertical
                        title={`Variação ${convertNumberRoman(++numberOrder)}`}
                        body={
                          <Box key={`variation-${item.title}-${itemIndex}`}>
                            <Grid item xs={12}>
                              <FormControlLabel
                                control={
                                  <Switch
                                    onChange={(e) => {
                                      toggleVariation.updateVariation(
                                        itemIndex,
                                        'isMandatory',
                                        !item.isMandatory,
                                      )
                                    }}
                                    checked={item.isMandatory}
                                  />
                                }
                                label={
                                  'Variação obrigatória?' + item.isMandatory
                                }
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <FormControlLabel
                                control={
                                  <Switch
                                    onChange={() =>
                                      setIsVariations(!isVariations)
                                    }
                                    checked={isVariations}
                                  />
                                }
                                label="Permitir multiplas seleção?"
                              />
                            </Grid>
                            <Grid item xs={12} sx={{ mb: 1 }}>
                              <TextField
                                fullWidth
                                label={`Nome da viarição (ex. Cor)`}
                                name="title"
                                defaultValue={item.title}
                                onBlur={(e) =>
                                  toggleVariation.updateVariation(
                                    itemIndex,
                                    e.target.name,
                                    e.target.value,
                                  )
                                }
                              />
                            </Grid>
                            {item.variants.map((option, optionIndex) => (
                              <Grid
                                container
                                spacing={1}
                                data-variation-index={`${optionIndex}`}
                              >
                                <Grid item xs={12}>
                                  <Divider sx={{ my: 0.4 }} />
                                </Grid>
                                <Grid item xs={12} md={8}>
                                  <TextField
                                    fullWidth
                                    label={`Variação (ex. ${
                                      [
                                        'Azul',
                                        'Vermelho',
                                        'Branco',
                                        'Preto',
                                        'Verde',
                                        'Amarelo',
                                        'Rosa',
                                        'Roxo',
                                        'Marron',
                                        'Lilaz',
                                      ][optionIndex]
                                    })`}
                                    name="name"
                                    onBlur={(e) =>
                                      toggleVariation.updateVariants(
                                        optionIndex,
                                        itemIndex,
                                        e.target.name,
                                        e.target.value,
                                      )
                                    }
                                    defaultValue={option.name}
                                  />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                  <TextField
                                    fullWidth
                                    label="Preço adicional (R$)"
                                    name="priceAdditional"
                                    onBlur={(e) =>
                                      toggleVariation.updateVariants(
                                        optionIndex,
                                        itemIndex,
                                        e.target.name,
                                        e.target.value,
                                      )
                                    }
                                    defaultValue={option.price}
                                  />
                                </Grid>
                                <Grid
                                  item
                                  xs={12}
                                  sx={{
                                    textAlign: 'right',
                                    minHeight: '55px',
                                  }}
                                >
                                  <Button
                                    sx={{ height: '100%' }}
                                    onClick={() =>
                                      toggleVariation.remove(option.index)
                                    }
                                    variant="outlined"
                                    startIcon={<DeleteIcon />}
                                  >
                                    Excluir
                                  </Button>
                                </Grid>
                              </Grid>
                            ))}

                            <Button
                              variant="contained"
                              sx={{ height: '40px', mt: 2 }}
                              onClick={() =>
                                toggleVariation.createVariants(itemIndex)
                              }
                            >
                              Adicionar mais variáveis{itemIndex}
                            </Button>
                          </Box>
                        }
                      />
                    )
                  })}

                {isVariations && (
                  <Grid sx={{ mt: 1, textAlign: 'right' }}>
                    <Button
                      variant="contained"
                      onClick={toggleVariation.createVariation}
                      sx={{
                        mt: 1,
                      }}
                    >
                      Nova variação
                    </Button>
                  </Grid>
                )}
              </Box>
            ),
          },

          {
            title: 'Fotos',
            body: (
              <Box>
                <ButtonUpload loadFile={loadFile} />
                <Galery itemData={images} closeImage={closeImage} />
              </Box>
            ),
          },
        ]}
      />
    </Container>
  )
}

export default Create
