import { useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import Header from 'components/Header';
import HorarioFuncionamento from '../HorarioFuncionamento';
import Delivery from '../Delivery';
import InfoAdmin from '../InfoAdmin';
import InfoContact from '../InfoContact';

const Settings = () => {
  const [tabValue, setTabValue] = useState('delivery');

  return (
    <section>
      <Header title="Configurações" back={-1} />

      <Box sx={{ overflow: 'hidden', mb: '1.2rem' }}>
        <Tabs
          value={tabValue}
          onChange={(e, v) => setTabValue(v)}
          variant="scrollable"
         
        >
          <Tab value="orderTime" label="Horário de pedido" />
          <Tab value="delivery" label="Delivery" />
          <Tab value="contact" label="Comunicação" />
          <Tab value="admin" label="Administrador" />
        </Tabs>
      </Box>

      {tabValue === 'orderTime' && <HorarioFuncionamento />}
      {tabValue === 'delivery' && <Delivery />}
      {tabValue === 'contact' && <InfoContact />}
      {tabValue === 'admin' && <InfoAdmin />}
    </section>
  );
};

export default Settings;
