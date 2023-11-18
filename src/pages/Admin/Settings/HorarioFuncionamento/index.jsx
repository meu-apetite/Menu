import React, { useState } from 'react';
import { Grid, Typography, TextField, TimePicker, Button } from '@mui/material';

const HorarioFuncionamento = () => {
  const diasDaSemana = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

  const [horarios, setHorarios] = useState({
    segunda: { abertura: '', fechamento: '' },
    terca: { abertura: '', fechamento: '' },
    quarta: { abertura: '', fechamento: '' },
    quinta: { abertura: '', fechamento: '' },
    sexta: { abertura: '', fechamento: '' },
    sabado: { abertura: '', fechamento: '' },
    domingo: { abertura: '', fechamento: '' },
  });

  const handleHoraChange = (dia, tipo, hora) => {
    setHorarios((prevHorarios) => ({
      ...prevHorarios,
      [dia]: {
        ...prevHorarios[dia],
        [tipo]: hora,
      },
    }));
  };

  const handleSalvar = () => {
    // Implemente a lógica para salvar os horários
    console.log('Horários salvos:', horarios);
  };

  return (
    <Grid container spacing={2}>
      {diasDaSemana.map((dia) => (
        <Grid item key={dia} xs={12} md={6}>
          <Typography variant="h6" sx={{ fontSize: '1.1rem' }}>{dia}</Typography>
          <TextField
            label="Abertura"
            type="time"
            // value={horarios[dia.toLowerCase()].abertura}
            onChange={(e) => handleHoraChange(dia.toLowerCase(), 'abertura', e.target.value)}
            InputLabelProps={{ shrink: true }}
            inputProps={{ step: 300 }}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Fechamento"
            type="time"
            // value={horarios[dia.toLowerCase()].fechamento}
            onChange={(e) => handleHoraChange(dia.toLowerCase(), 'fechamento', e.target.value)}
            InputLabelProps={{ shrink: true }}
            inputProps={{ step: 300 }}
            fullWidth
            margin="dense"
          />
        </Grid>
      ))}
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleSalvar}>
          Salvar Horários
        </Button>
      </Grid>
    </Grid>
  );
};

export default HorarioFuncionamento;
