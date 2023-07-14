import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export default function TabsCustom() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => setValue(newValue);

  return (
    <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto">
      {
        
      }
      <Tab label="Item One" />
      <Tab label="Item Two" />
      <Tab label="Item Three" />
      <Tab label="Item Four" />
      <Tab label="Item Five" />
      <Tab label="Item Six" />
      <Tab label="Item Seven" />
      <Tab label="Item Seven" />
      <Tab label="Item Seven" />
      <Tab label="Item Seven" />
      <Tab label="Item Seven" />
      <Tab label="Item Seven" />
      <Tab label="Item Seven" />
      <Tab label="Item Seven" />
      <Tab label="Item Seven" />
      <Tab label="Item Seven" />
      <Tab label="Item Seven" />
      <Tab label="Item Seven" />
    </Tabs>
  );
}