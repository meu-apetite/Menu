import { AccordionSummary, Skeleton } from '@mui/material';
import * as S from './style';

const SpinnerProduct = (props) => {
  const { loading = false, products } = props;
  const itens = Array.from({ length: products });

  return (
    loading ? (
      <S.AccordionCustom expanded={true}>
        <AccordionSummary>
          <Skeleton animation="wave" height={10} width="32%" style={{ marginBottom: 5 }} />
        </AccordionSummary>
        <S.AccordionDetailsCustom>
          {itens.map((item, i) => (
            <S.CardContentCustom key={i} sx={{ flex: '1 0 auto', pt: 0 }}>
              <S.CardInfo>
                <div>
                  <Skeleton animation="wave" height={10} width="32%" style={{ marginBottom: 5 }} />
                  <Skeleton animation="wave" height={10} width="72%" style={{ marginBottom: 6 }} />
                </div>
                <Skeleton animation="wave" height={10} width="16%" />
              </S.CardInfo>
              <Skeleton variant="rectangular" width="100%">
                <div style={{ paddingTop: '100%' }} />
              </Skeleton>
            </S.CardContentCustom>
          ))}
        </S.AccordionDetailsCustom>
      </S.AccordionCustom>
    ) : null
  );
};

export default SpinnerProduct;