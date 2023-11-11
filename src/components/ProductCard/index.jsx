import { useState } from 'react';
import Box from '@mui/material/Box';
import ProductView from 'components/ProductView';
import * as S from './style';

/**
 * props: {
 *  product: {
 *    id: string,
 *    name: string,
 *    price: number,
 *    description: string,
 *    image?: []
 *  }
 *}
 */

const ProductCard = (props) => {
  const product = props.product;
  const images = product?.images;

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);

  return (
    <>
      <S.CardCustom onClick={handleOpenModal}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <S.CardContentCustom sx={{ flex: '1 0 auto', pt: 0 }}>
            <S.CardInfo>
              <div>
                <S.TitleProduct>{product.name}</S.TitleProduct>
                <S.Description>{product.description}</S.Description>
              </div>
              <S.Price>
                {/* A partir de{' '} */}
                {product.price.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </S.Price>
            </S.CardInfo>
            <S.CardMediaCustom image={images.length ? images[0].url : 1} />
          </S.CardContentCustom>
        </Box>
      </S.CardCustom>

      {openModal && (
        <S.ModalContainer>
          <S.ModalContent>
            <ProductView product={product} closeProduct={data => setOpenModal(!data)} />
          </S.ModalContent>
        </S.ModalContainer>
      )}
    </>
  );
};

export default ProductCard;
