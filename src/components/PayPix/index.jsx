import { useContext, useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import { Typography, Grid, styled, Modal, Tooltip, Button } from '@mui/material';
import toast from 'react-hot-toast';
import Box from '@mui/material/Box';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Container = styled(Grid)({
  padding: 2,
});

const useStyles = {
  pixImage: {
    maxWidth: 'auto',
    height: '80px',
    marginTop: 2,
  },
  container: {
    padding: 2,
    textAlign: 'center',
  },
  paper: {
    padding: 2,
    textAlign: 'center',
  },
  qrCode: {
    margin: 'auto',
  },
};

const PayPix = (props) => {
  const [open, setOpen] = useState(true);

  const handleClose = () => setOpen(false);

  const handleCopyClick = () => {
    toast.success('Código copiado!')
    navigator.clipboard.writeText(props.code);
  };

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/whatsappphonenumber/?text=${encodeURIComponent(props.code)}`, '_blank');
  };

  return (
    <Container container justifyContent="center">
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Instruções para pagamento PIX
            </Typography>

            <Box sx={{ display: 'grid', mt: 1 }}>
              <QRCode value={props.code} style={useStyles.qrCode} />

              <Tooltip title="Copiar código PIX" arrow>
                <Button onClick={handleCopyClick} color="info" style={useStyles.button} startIcon={<FileCopyIcon />}>
                  Copiar Código
                </Button>
              </Tooltip>
            </Box>

            <Typography id="modal-modal-description" sx={{ mt: 1 }}>
              1. Abra o aplicativo do seu banco.
              <br />
              2. Selecione a opção de pagamento PIX.
              <br />
              3. Escaneie o QR Code ou insira a chave PIX manualmente.
            </Typography>

            <Button
              variant="contained"
              color="success"
              startIcon={<WhatsAppIcon />}
              onClick={handleWhatsAppClick}
            >
              Enviar comprovante via WhatsApp
            </Button>

            <small></small>
          </Box>
        </Modal>
      </div>
    </Container>
  );
};

export default PayPix;
