import { useEffect, useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import Header from 'components/Header';
import HorarioFuncionamento from '../HorarioFuncionamento';
import Delivery from '../Delivery';
import InfoAdmin from '../InfoAdmin';
import InfoContact from '../InfoContact';
import * as S from './style';

const Settings = () => {
  const [tabValue, setTabValue] = useState('delivery');

  return (
    <section>
      <Header title="Configurações" back={-1} />

      <S.WrapperTabs>
        <S.Container>
          <Tabs
            value={tabValue}
            onChange={(e, v) => setTabValue(v)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ mr: 2, zIndex: 'auto' }}
          >
            <Tab value="orderTime" label="Horário de pedido" />
            <Tab value="delivery" label="Delivery" />
            <Tab value="contact" label="Comunicação" />
            <Tab value="admin" label="Administrador" />
          </Tabs>
        </S.Container>
      </S.WrapperTabs>

      {tabValue === 'orderTime' && <HorarioFuncionamento />}
      {tabValue === 'delivery' && <Delivery />}
      {tabValue === 'contact' && <InfoContact />}
      {tabValue === 'admin' && <InfoAdmin />}
    </section>
  );
};

export default Settings;
