import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Radio, TextField } from '@mui/material';
import * as S from './style';

const ProductView = (props) => {
  const { state } = useLocation();

  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: 0,
    complements: [],
    images: [],
  });

  const [counterValue, setCounterValue] = useState(1);
  const [price, setPrice] = useState(0);
  const [complements, setComplements] = useState([]);

  const [selectedValue, setSelectedValue] = useState('a');
  const [selectedComplements, setSelectedComplements] = useState([]);
  

  const handleChange = (event) => setSelectedValue(event.target.value);

  const controlProps = (item) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: 'size-radio-button-demo',
    inputProps: { 'aria-label': item },
  });

  const addComplementsCalculation = (option) => {
    setSelectedComplements((prevSelectedComplements) => {
      const newSelectedComplements = [...prevSelectedComplements, option];
      return newSelectedComplements;
    });
  };
  
  const addProductCalculation = () => {
    const totalComplement = selectedComplements.reduce((acc, current) => acc + current.price, 0);
    const priceUnit = parseFloat(price) + parseFloat(totalComplement);
    let total = 0;

    for (let i = 0; i < counterValue; i++) {
      total += priceUnit;
    }
    
    setPrice(total)
    console.log(selectedComplements)
    // console.log(totalx)
  };

  const setProductItem = () => {
    setCounterValue(counterValue + 1);
    addProductCalculation();
  }

  const setOption = (id, parent, remove = false) => {
    setComplements((prev) => {
      const updateValue = JSON.parse(JSON.stringify(prev));

      prev.forEach((item, index) => {
        if (item.count >= item.max && !remove) return;

        const indexOption = item.options.findIndex(o => o.id === id);
        if (indexOption < 0) return prev;

        const option = item['options'][indexOption];
        if (option.quantity === 0 && remove) return;

        if (remove) {
          option.quantity -= 1;
        } else {
          option.quantity += 1;
          addComplementsCalculation(option);
          addProductCalculation();
        }

        updateValue[index]['options'][indexOption] = option;
        updateValue[index]['count'] = updateValue[index]['options']
          .reduce((acc, value) => acc + value?.quantity, 0);
      });
      return updateValue;
    });
  };

  const removeProductItem = () => {
    // if(counterValue <= 1) return;
    // removendo o valor para cada produto add
    console.log(counterValue)
      // setPrice(price - (price/counterValue));
      // setCounterValue(counterValue - 1);
  };


  useEffect(() => {
    const product = props?.product || state.product;
    setProduct(product);
    setPrice(Number(product.price));

    const complementsAll = [];
    product.complements.forEach((item) => {
      complementsAll.push({
        parent: item._id,
        min: item.min,
        max: item.max,
        count: 0,
        options: item.options.map(option =>
          ({ id: option._id, quantity: 0, price: option.price })
        )
      });
    });

    setComplements(complementsAll);
    console.log(complementsAll);
  }, []);

  return (
    <S.Main>
      <S.Header>
        <S.Container>
          <h1>{product.name}</h1>
        </S.Container>
      </S.Header>

      <S.ContainerProduct>
        <S.BackgroundImg bgImg={product.images[0]?.url} />

        <S.Container>
          <h2 className="subtitle">{product.name}</h2>
          <div className="description">
            <p>{product.description}</p>
            <p>{product.price}</p>
          </div>
        </S.Container>

        <div className="complements">
          {product.complements.map((item, i) => {
            const complementOption = complements.find(c => c.parent === item._id);

            return (
              <div key={i}>
                <S.ComplementHeader>
                  <div>
                    <span className="title">{item.name}</span>
                    <span className="infoCount">
                      Escolha {item.isRequired ? item.max : `até ${item.max}`} opções
                    </span>
                  </div>
                  <div className="required">
                    <span>{`${complementOption.count}/${item.max}`}</span>
                    <span>{item.isRequired ? 'Obrigatório' : 'Opcional'}</span>
                  </div>
                </S.ComplementHeader>

                {item.options.map((option, indexOption) => {
                  const currentOption = complementOption.options.find(c => c.id === option._id);

                  return (
                    <S.Container key={option.name}>
                      <S.ComplementOption>
                        <span>
                          <span className="title">
                            {option.name.replace('+', '')}
                          </span>
                          <br />
                          <span className="price">
                            {option.price > 0 &&
                              '+ ' +
                              option.price.toLocaleString('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                              })}
                          </span>
                        </span>
                        {item.max === 1 ? (
                          <Radio {...controlProps('b')} />
                        ) : (
                          <S.CountItem>
                            <span
                              className="fa-solid fa-minus"
                              onClick={() => setOption(option._id, item._id, true)}
                            />
                            <span className="value">{currentOption.quantity}</span>
                            <span
                              className="fa-solid fa-plus"
                              onClick={() => setOption(option._id, item._id)}
                            />
                          </S.CountItem>
                        )}
                      </S.ComplementOption>
                    </S.Container>
                  );
                })}
              </div>
            );
          })}
        </div>

        <S.Container>
          <S.Comment>
            <label className="label">Algum comentário?</label>
            <TextField
              label="Ex: tirar a cebola, maionese à parte etc."
              multiline
              rows={3}
              fullWidth={true}
            // onChange={(e) => setData({ ...data, description: e.target.value })}
            />
          </S.Comment>
        </S.Container>
      </S.ContainerProduct>

      <S.ContainerAction>
        <S.CountItem>
          <span className="fa-solid fa-minus" onClick={removeProductItem}></span>
          <span className="value">{counterValue}</span>
          <span className="fa-solid fa-plus" onClick={setProductItem}></span>
        </S.CountItem>

        <S.ButtonAdd>
          <span>Adicionar</span>
          <span>
            {price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </span>
        </S.ButtonAdd>
      </S.ContainerAction>
    </S.Main>
  );
};

export default ProductView;
