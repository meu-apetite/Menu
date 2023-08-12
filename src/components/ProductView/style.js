import styled from "styled-components";

export const Container = styled.div`
  padding: 0 1rem;
  max-width: 1170px;
`;

export const Main = styled.main`
  height: 100%;
  display: grid;
  grid-template-rows: 30px auto auto;
  grid-template-areas: "header"
    "product"
    "footer"
`;

export const Header = styled.header`
  grid-area: header;
  width: 100%;
  background: #fff;

  h1 {
    margin: 0;
    font-size: .75rem;
    font-weight: 500;
    left: 0;
    position: absolute;
    text-align: center;
    text-transform: uppercase;
    width: 100%;   
    height: auto;
  }
`;

export const ContainerProduct = styled.div`
  grid-area: product;
  overflow: auto;

  img {
    width: 100%;
    height: 40vh;
    object-fit: cover;
  }
  .subtitle {
    margin: 10px 0 0;
    font-size: 1rem;
    font-weight: 500;
    color: #3e3e3e;
  }
  .description p {
    font-size: .875rem;
    padding-top: 10px;
    margin: 0;
    font-weight: 300;
    line-height: 1.22;
    color: #717171;
    white-space: pre-line;
    word-break: break-all;
  }
`;

export const optionItem = styled.div`
  background-image: url(${props => props.bgImg});
  width: 100%;
  height: 40vh;
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: cover;
`;

export const BackgroundImg = styled.div`
  background-image: url(${props => props.bgImg});
  height: 35vh;
  width: 100%;
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: cover;
`;

export const WrapperComplementHeader = styled.div``

export const ComplementHeader = styled.div`
  background: #f2f2f2;
  padding: 12px 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: space-between;
  z-index: 20;
  position: sticky;
  top: 0;
  .required {
    background-color: #717171;
    color: #f5f0eb;
    border: none;
    padding: 6px 6px 4px;
    border-radius: 3px;
    text-transform: uppercase;
    font-size: 0.6rem;
    height: fit-content;
    margin: auto 0;
  }
  .infoCount {
    font-weight: 400;
    font-size: .8rem;
    display: block;
    color: #717171;
  }
`;

export const ComplementOption = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.1rem 0;
  border-bottom: 1px solid #3f3e3e12;
  .title {
    margin: 0;
    font-size: 1rem;
    line-height: 1.27;
    color: #3f3e3e;
    font-weight: 300;
  }
  .price {
    font-size: 0.9rem;
    color: #717171;
  }
`;

export const ContainerAction = styled.div`
  grid-area: footer;
  background: #fff;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 0.8rem;
  padding: 1rem;
  border-top: 2px solid #f5f0eb;
`;

export const ButtonAdd = styled.button`
  width: 100%;
  max-width: 250px;
  height: 50px;
  background: #ea1d2c;
  color: #fff;
  border: none;
  padding: 0 20px;
  border-radius: 4px;
  margin: 3px 0;
  font-weight: 500;
  transition: .1s;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.2rem;
`;

export const CountItem = styled.div`
  height: 50px;
  padding: 0 0.6rem;
  display: flex;
  align-items: center;
  gap: 1.6rem;
  border: 1px solid #dcdcdc;
  border-radius: 4px;

  i {
    color: #ea1d2c;
  }
`;

export const Comment = styled.div`
  margin-top: 1rem;
  padding: 1.2rem 0;
  .label {
    margin: 0;
    font-weight: 500;
    font-size: 1rem;
    color: #717171;
  }
`;