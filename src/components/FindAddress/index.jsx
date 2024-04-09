import { useState } from 'react';
import { IconButton, useMediaQuery, DialogTitle } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import AddressCep from './AddressCep';
import AddressEdit from './AddressEdit';
import * as S from './style';

const FindAddress = (props /* { getData() } */) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [address, setAddress] = useState({
    zipCode: null,
    city: null,
    state: null,
    street: null,
    district: null,
    number: null,
    complement: null,
    condominium: null,
  });
  const [openEdit, setOpenEdit] = useState('cep');
  const [edit, setEdit] = useState(false);
  
  const getAddressCep = (data) => {
    if (data?.edit) {
      setEdit(true);
      delete data.edit;
    }
    setAddress(data);
    setOpenEdit('address');
  };

  const getAddressEdit = (data) => {
    setAddress(data);
    props.getData(data);
  };

  return (
    <S.BootstrapDialog open={true} fullScreen={fullScreen}>
      <DialogTitle sx={{ m: 0, p: 2, fontSize: '1.4rem' }} id="customized-dialog-title">
        Cadastro de endereço
      </DialogTitle>

      <IconButton
        onClick={props.closeModal}
        sx={{
          position: 'absolute', right: 8, top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>

      <S.CustomDialogContent dividers>
        {openEdit === 'cep' && (
          <AddressCep getAddress={(data) => getAddressCep(data)} />
        )}

        {openEdit === 'address' && (
          <AddressEdit 
            address={address} 
            edit={edit} 
            getAddress={getAddressEdit} 
            deliveryOption={props.deliveryOption}
          />
        )}
      </S.CustomDialogContent>
    </S.BootstrapDialog>
  );
};

export default FindAddress;
