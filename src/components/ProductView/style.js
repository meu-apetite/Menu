import { styled } from '@mui/system';

export const Container = styled('div')({
  padding: '0 1rem',
  maxWidth: '1170px'
});

export const Main = styled('main')({
  height: '100%',
  display: 'grid',
  gridTemplateTows: '30px auto auto',
  gridTemplateAreas: `"header"
    "product"
    "footer"
  `
});

export const Header = styled('header')({
  gridArea: 'header',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '30px',
  background: '#fff',
  'h1': {
    margin: 0,
    fontSize: '.9rem',
    fontWeight: 500,
    textTransform: 'uppercase',
  }
});

export const ContainerProduct = styled('div')({
  gridArea: 'product',
  overflow: 'auto',
  'img': {
    width: '100%',
    height: '40vh',
    objectFit: 'cover',
  },
  '.subtitle': {
    margin:' 10px 0 0',
    fontSize: '1rem',
    fontWeight: 500,
    color: '#3e3e3e',
  },
  '.description p': {
    fontSize: '.875rem',
    padding: '5px 0 10px 0',
    margin: 0,
    fontWeight: 300,
    lineHeight: 1.22,
    color: '#717171',
    whiteSpace: 'pre-line',
    wordBreak: 'break-all',
  }
})

export const optionItem = styled('div')({
  backgroundImage: `url(${props => props.bgImg})`,
  width: '100%',
  height: '40vh',
  backgroundPosition: '50%',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
});

export const BackgroundImg = styled('div')(({ bgImg }) => ({
  backgroundImage: `url(${bgImg})`,
  height: '35vh',
  width: '100%',
  backgroundPosition: '50%',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
}));

export const ComplementHeader = styled('div')({
  background: '#f2f2f2',
  padding: '12px 1rem',
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.5rem',
  justifyContent: 'space-between',
  zIndex: 20,
  position: 'sticky',
  top: 0,
  '.required': {
    color:' #f5f0eb',
    border: 'none',
    padding: '4px 6px 4px',
    borderRadius: '3px',
    textTransform: 'uppercase',
    fontSize: '0.7rem',
    margin: 'auto 0',
    display: 'flex',
    gap: '4px',
  },
  '.infoCount': {
    fontWeight: 400,
    fontSize: '.8rem',
    display: 'block',
    color: '#717171',
  }
});

export const WrapperInfo = styled('div')({ 
  padding: '0.1rem 0.3rem',
  backgroundColor: '#717171',
  borderRadius: 4
})

export const ComplementOption = styled('label')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '1.1rem 0',
  borderBottom: '1px solid #3f3e3e12',
  '.title': {
    margin: 0,
    fontSize:' 1rem',
    lineHeight: 1.27,
    color: '#3f3e3e',
    fontWeight: 300,
  },
  '.price': {
    fontSize: '0.9rem',
    color: '#717171',
  }
});

export const ContainerAction = styled('div')({
  gridArea: 'footer',
  background: '#fff',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'end',
  gap: '0.8rem',
  padding: '1rem',
  borderTop: '2px solid #f5f0eb'
});

export const ButtonAdd = styled('button')({
  width: '100%',
  maxWidth: '250px',
  height: '50px',
  background: '#ea1d2c',
  color: '#fff',
  border: 'none',
  padding: '0 20px',
  borderRadius: '4px',
  margin: '3px 0',
  fontWeight: 500,
  transition: '.1s',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 1.2rem',
});

export const CountItem = styled('div')({
  height: '50px',
  padding: '0 0.6rem',
  display: 'flex',
  alignItems: 'center',
  gap: '1.6rem',
  border: '1px solid #dcdcdc',
  borderRadius: '4px',
  'i': {
    color:' #ea1d2c'
  }
});

export const Comment = styled('div')({
  marginTop: '1rem',
  padding: '1.2rem 0',
  '.label': {
    margin: 0,
    fontWeight: 500,
    fontSize: '1rem',
    color: '#717171',
  }
});