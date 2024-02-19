import { useContext, useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import { Typography, Tooltip, Button, TextField } from '@mui/material';
import toast from 'react-hot-toast';
import Box from '@mui/material/Box';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

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
  qrCode: {
    margin: 'auto',
  },
};

const PayPix = (props) => {
  const handleCopyClick = () => {
    navigator.clipboard.writeText(props.code);
    toast.success('Código copiado!');
  };

  const handleWhatsAppClick = () => {
    window.open(
      `https://wa.me/whatsappphonenumber/?text=${encodeURIComponent(props.code)}`, 
      '_blank'
    );
  };

  return (

    <Box>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Instruções para pagamento PIX
      </Typography>

      <Typography paragraph>
        Assim que concluir a transação, por favor, envie o comprovante para o
        no WhatsApp, para que possamos aprovar o seu pedido. <br />
      </Typography>

      <Box sx={{ display: 'grid', mt: 1 }}>
        <QRCode value={props.code} style={useStyles.qrCode} />

        <TextField
          id="code"
          label="Código PIX"
          value={props.code}
          InputProps={{ readOnly: true }}
          fullWidth
          variant="outlined"
          sx={{ mt: 2, mb: 1 }}
          onClick={(e) => e.target.select()}
        />

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
        <br />
        4. Após concluir o pagamento clique em "Enviar comprovante via WhatsApp".
        <br />
        4. Após concluir o pagamento clique em "Enviar comprovante via WhatsApp".
        <br />
      </Typography>

      <Button
        variant="contained"
        color="success"
        startIcon={<WhatsAppIcon />}
        onClick={handleWhatsAppClick}
        sx={{ mt: 0.5 }}
      >
        Enviar comprovante via WhatsApp
      </Button>
    </Box>
  );
};

export default PayPix;
