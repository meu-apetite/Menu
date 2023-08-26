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
  width: '100%',
  background: '#fff'

  // h1 {
  //   margin: 0;
  //   font-size: .75rem;
  //   fontWeight: 500;
  //   left: 0;
  //   position: absolute;
  //   text-align: center;
  //   text-transform: uppercase;
  //   width: 100%;   
  //   height: auto;
  // }
});

export const ContainerProduct = styled('div')({
  gridArea: 'product',
  overflow: 'auto',
  // img {
  //   width: 100%;
  //   height: 40vh;
  //   object-fit: cover;
  // }
  // .subtitle {
  //   margin: 10px 0 0;
  //   font-size: 1rem;
  //   fontWeight: 500;
  //   color: #3e3e3e;
  // }
  // .description p {
  //   font-size: .875rem;
  //   padding-top: 10px;
  //   margin: 0;
  //   fontWeight: 300;
  //   line-height: 1.22;
  //   color: #717171;
  //   white-space: pre-line;
  //   word-break: break-all;
  // }
})

export const optionItem = styled('div')({
  backgroundImage: `url(${props => props.bgImg})`,
  width: '100%',
  height: '40vh',
  backgroundPosition: '50%',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
});

export const BackgroundImg = styled('div')({
  backgroundImage: `url(${props => props.bgImg})`,
  height: '35vh',
  width: '100%',
  backgroundPosition: '50%',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
});


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
  // .required {
  //   background-color: #717171,
  //   color: #f5f0eb,
  //   border: 'none',
  //   padding: 6px 6px 4px,
  //   borderRadius: '3px',
  //   text-transform: uppercase,
  //   font-size: 0.6rem,
  //   height: fit-content,
  //   margin: auto 0,
  // }
  // .infoCount {
  //   fontWeight: 400,
  //   font-size: .8rem,
  //   display: block,
  //   color: #717171,
  // }
});

export const ComplementOption = styled('label')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '1.1rem 0',
  borderBottom: '1px solid #3f3e3e12',
  // .title {
  //   margin: 0;
  //   font-size: 1rem;
  //   line-height: 1.27;
  //   color: #3f3e3e;
  //   fontWeight: 300;
  // }
  // .price {
  //   font-size: 0.9rem;
  //   color: #717171;
  // }
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
  padding:'0 0.6rem',
  display: 'flex',
  alignItems: 'center',
  gap: '1.6rem',
  border: '1px solid #dcdcdc',
  borderRadius: '4px',
  // i {
  //   color: #ea1d2c;
  // }
});

export const Comment = styled('div')({
  marginTop: '1rem',
  padding: '1.2rem 0'
  // .label {
  //   margin: 0;
  //   fontWeight: 500;
  //   font-size: 1rem;
  //   color: #717171;
  // }
});