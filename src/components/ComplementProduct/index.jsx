import React, { useState } from 'react'
import {
Accordion,
AccordionDetails,
AccordionSummary,
Typography,
Grid,
TextField,
Button,
Checkbox,
FormControlLabel,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import DeleteIcon from '@mui/icons-material/Delete'

const ComplementProduct = () => {
  const propsTextFields = { margin: 'dense', required: true, fullWidth: true }
  const initComplement = {
    name: '',
    max: 0,
    min: 0,
    isRequerid: null,
    options: [{ name: '', description: '', price: 0 }],
  }
  const [complements, setComplements] = useState([initComplement])

  const setValue = (index, key, value) => {
    const newComplement = [...complements]
    newComplement[index][key] = value
    setComplements(newComplement)
  }

  const setValueOption = (index, indexOption, key, value) => {
    const newComplement = [...complements]
    newComplement[index].options[indexOption][key] = value
    setComplements(newComplement)
  }

  const addComplement = (index) => {
    const newComplement = [...complements]
    newComplement[index].options.push({ name: '', price: 0 })
    setComplements(newComplement)
  }

  return (
    <Grid container spacing={2} sx={{ width: '100%', margin: 'auto' }}>
      {complements.map((item, i) => {
        const options = item.options || []

        return (
          <Accordion key={i} sx={{ width: '100%', margin: 'auto' }}>
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
                    onChange={(e) => setValue(i, 'name', e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sx={{ mt: 1.1, mb: 1.1 }}>
                  <Typography sx={{ fontWeight: 'bold' }}>Indique se a categoria é necessária para pedir o prato</Typography>

                  <FormControlLabel
                    control={
                      <Checkbox onChange={() => setValue(i, 'isRequired', false)} checked={complements[i].isRequired === false} />
                    }
                    label="Opcional, o cliente pode ou não selecionar os itens"
                  />

                  <br />

                  <FormControlLabel
                    sx={{ mt: 0.2 }}
                    control={
                      <Checkbox onChange={() => setValue(i, 'isRequired', true)} checked={complements[i].isRequired} />
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
                    onChange={(e) => setValue(i, 'min', e.target.value)}
                  />
                </Grid>

                <Grid item xs={6} sm={6}>
                  <TextField
                    {...propsTextFields}
                    InputLabelProps={{ shrink: true }}
                    label="Quant. máxima"
                    type="number"
                    value={complements[i].max}
                    onChange={(e) => setValue(i, 'max', e.target.value)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography><strong>Opções</strong></Typography>
                </Grid>

                {options.map((option, indexOption) => (
                  <>
                    <Grid item xs={12} sm={7}>
                      <TextField
                        {...propsTextFields}
                        margin="none"
                        size="small"
                        label="Nome"
                        value={complements[i].options[indexOption].name}
                        onChange={(e) => setValueOption(i, indexOption, 'name', e.target.value)}
                      />
                    </Grid>

                    <Grid item xs={8} sm={4}>
                      <TextField
                        {...propsTextFields}
                        margin="none"
                        size="small"
                        label="Valor adicional (R$)"
                        value={complements[i].options[indexOption].price}
                        onChange={(e) => setValueOption(i,indexOption,'price',e.target.value)}
                      />
                    </Grid>

                    <Grid item xs={0.5} sm={0.5}>
                      <DeleteIcon />
                    </Grid>
                  </>
                ))}

                <Grid item xs={12}>
                  <Button variant="outlined" onClick={() => addComplement(i)}>+ Novo complemento</Button>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        )
      })}

      <Grid
        item
        xs={12}
        sx={{ display: 'flex', justifyContent: 'end', flexWrap: 'wrap', mt: 2, gap: 1 }}
      >
        <Button variant="contained" onClick={addComplement}>Novo grupo de complemento</Button>
        <Button variant="contained" onClick={addComplement}>Importar grupo</Button>
      </Grid>
    </Grid>
  )
}

export default ComplementProduct;