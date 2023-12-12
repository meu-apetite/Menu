import { styled } from '@mui/system';
import { alpha } from '@mui/material/styles';
import { Paper } from '@mui/material';


export const CardInfo = styled('div')({
  display: 'grid',
  gridTemplateRows: '1fr 20px',
  margin: 0,
});

// export const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//   '& .MuiDialogContent-root': {
//     padding: theme.spacing(2),
//   },
//   '& .MuiDialogActions-root': {
//     padding: theme.spacing(1),
//   },
// }));


export const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    margin: 'auto',
    maxWidth: '600px',
    textAlign: 'center',
  }))

export const Icon = styled('div')(({ theme }) => ({
  fontSize: '50px',
  color: theme.palette.primary.main
}))

export const Section = styled('div')(({ theme }) => ({
  marginBottom: theme.spacing(2)
}))