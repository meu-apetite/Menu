import { useState } from 'react';
import Box from '@mui/material/Box';
import ProductView from 'components/ProductView';
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import * as S from './style';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
  const [sizeWidth, setSizeWidth] = useState(0);

  const handleOpenModal = () => {
    setSizeWidth(window.innerWidth);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  }

  return (
    <>
      <S.CardCustom onClick={handleOpenModal} id={product._id}>
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
        sizeWidth <= 756 ? (
          <Dialog fullScreen open={openModal} onClose={handleCloseModal} TransitionComponent={Transition}>
            <AppBar>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={handleCloseModal}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
                <Typography sx={{ ml: 2, flex: 1 }} variant="h6">{product.name}</Typography>
              </Toolbar>
            </AppBar>
            <ProductView product={product} closeProduct={data => setOpenModal(!data)} />
          </Dialog>
        ) : (
          <S.DialogCustom
            fullScreen
            open={openModal}
            onClose={handleCloseModal}
            TransitionComponent={Transition}
          >
             <S.ToolbarCustom>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={handleCloseModal}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
                <Typography sx={{ ml: 2, flex: 1}} variant="h6">{product.name}</Typography>
              </S.ToolbarCustom>
              
            <S.DialogContentCustom>
              <ProductView product={product} closeProduct={data => setOpenModal(!data)} />
            </S.DialogContentCustom>
          </S.DialogCustom>
        )
      )}
    </>
  );
};

export default ProductCard;
