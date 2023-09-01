import * as React from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ProductCard from 'components/ProductCard'
import * as S from './style'

const AccordionProduct = (props) => {
  return (
    <Accordion expanded={true} sx={{ borderTop: '2px solid #564aa3', mb: 21 }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} id="">
        <S.Title>{props.categoryTitle}</S.Title>
      </AccordionSummary>

      <S.AccordionDetailsCustom>
        {props.products?.map((item, i) => <ProductCard key={i} product={item} />)}
      </S.AccordionDetailsCustom>
    </Accordion>
  )
}

export default AccordionProduct
