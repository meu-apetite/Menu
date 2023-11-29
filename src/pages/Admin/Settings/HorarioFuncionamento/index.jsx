import { useState } from 'react';
import { Grid, Typography, TextField, TimePicker, Button } from '@mui/material';

const HorarioFuncionamento = () => {
  const listDayName = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

  const [horarios, setHorarios] = useState({
    monday: '',
    tuesday: '',
    wednesday: '',
    thursday: '',
    friday: '',
    saturday: '',
    sunday: '',
  });

  const handleHoraChange = (day, type, hora) => {
    setHorarios((prev) => ({ ...prev, [day]: { ...prev[day], [type]: hora }}));
  };

  const handleSalvar = () => {
    // Implemente a lógica para salvar os horários
    console.log('Horários salvos:', horarios);
  };

  return (
    <section>
      <p>
        <strong>
          Para indicar que está fechado, selecione a 
          opção de horário '00:00' para a abertura e 
          '00:00' para o fechamento.
        </strong>
      </p>

      <Grid container spacing={2}>
        {listDayName.map((day) => (
          <Grid item key={day} xs={12} md={6}>
            <Typography variant="h6" sx={{ fontSize: '1.1rem' }}>{day}</Typography>
            <TextField
              label="Abertura"
              type="time"
              // value={horarios[day.toLowerCase()].abertura}
              onChange={(e) => handleHoraChange(day.toLowerCase(), 'abertura', e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
              margin="dense"
            />
            <TextField
              label="Fechamento"
              type="time"
              // value={horarios[day.toLowerCase()].fechamento}
              onChange={(e) => handleHoraChange(day.toLowerCase(), 'fechamento', e.target.value)}
              InputLabelProps={{ shrink: true }}
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
    </section>
  );
};

export default HorarioFuncionamento;
