import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { TextField } from '@mui/material';
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
  const [selectedComplements, setSelectedComplements] = useState([]);

  const productCalculation = () => {
    const totalComplement = selectedComplements.reduce((acc, current) => acc + (current.price * current.quantity), 0);
    const priceUnit = product.price;
    let total = 0;

    for (let i = 0; i < counterValue; i++) {
      total += (priceUnit + totalComplement);
    }

    setPrice(total);
  };

  const setProductItem = () => setCounterValue(counterValue + 1);

  const removeProductItem = () => {
    if (counterValue === 1) return;
    setCounterValue(counterValue - 1);
  };

  const setOption = (id, parent, remove = false) => {
    setComplements((prev) => {
      const updateValue = JSON.parse(JSON.stringify(prev));

      prev.forEach((item, index) => {
        if (item.count >= item.max && !remove) return;

        const indexOption = item.options.findIndex(o => o.id === id);
        if (indexOption < 0) return prev;

        const option = item['options'][indexOption];
        if (option.quantity === 0 && remove) return;

        option.parentId = parent;

        if (remove) {
          option.quantity -= 1;
          const findIndex = selectedComplements.findIndex(s => s.id === option.id);

          if (findIndex >= 0) {
            const newSelectComplements = selectedComplements;
            newSelectComplements[findIndex] = option;
            setSelectedComplements(newSelectComplements);
          }
        } else {
          option.quantity += 1;
          const findIndex = selectedComplements.findIndex(s => s.id === option.id);

          if (findIndex >= 0) {
            const newSelectComplements = selectedComplements;
            newSelectComplements[findIndex] = option;
            setSelectedComplements(newSelectComplements);
          } else {
            setSelectedComplements((prev) => [...prev, option]);
          }

          productCalculation();
        }

        updateValue[index]['options'][indexOption] = option;
        updateValue[index]['count'] = updateValue[index]['options']
          .reduce((acc, value) => acc + value?.quantity, 0);
      });
      return updateValue;
    });
  };

  const addToCart = () => {
    console.log({ productId: product._id, complements: selectedComplements, total: price })
  };

  useEffect(() => {
    productCalculation();
  }, [complements, counterValue]);

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
                                style: 'currency', currency: 'BRL'
                              })
                            }
                          </span>
                        </span>

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

        <S.ButtonAdd onClick={addToCart}>
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
