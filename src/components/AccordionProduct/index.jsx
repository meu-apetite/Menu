import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ProductCard from 'components/ProductCard';

const AccordionProduct = (props) => {
  return (
    <Accordion expanded={true} sx={{ borderTop: '2px solid #564aa3', mb: 21 }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
        <Typography>{props.categoryTitle}</Typography>
      </AccordionSummary>

      <AccordionDetails sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(48%, 1fr))', gap:' 2rem' }}>
        {props.products?.map((item, i) => <ProductCard key={i} product={item} />)}
      </AccordionDetails>
    </Accordion>
  );
};

export default AccordionProduct;