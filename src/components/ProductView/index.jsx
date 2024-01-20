import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { TextField } from '@mui/material';
import { StoreContext } from 'contexts/store';
import * as S from './style';

const ProductView = (props) => {
  const { state } = useLocation();
  const { saveProduct } = useContext(StoreContext);

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
  const [requiredComplements, setRequiredComplements] = useState([]);
  const [confirm, setConfirm] = useState(false);

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
      const complementComplent = [];
      
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

        updateValue.forEach(c => {
          if (!c.isRequired) return;
          c.count >= c.min ? complementComplent.push(true) : complementComplent.push(false);
        });

        setConfirm(complementComplent.every(c => c === true))
      });
      return updateValue;
    });
  };

  const addToCart = () => {
    if (!confirm) return;

    saveProduct({
      productId: product._id,
      complements: selectedComplements,
      total: price,
      quantity: counterValue
    });

    props.closeProduct(true);
  };

  useEffect(() => {
    productCalculation();
  }, [complements, counterValue]);

  useEffect(() => {
    requiredComplements.length === 0 ? setConfirm(true) : setConfirm(false);
  }, [requiredComplements]);

  useEffect(() => {
    const product = props?.product || state.product;
    setProduct(product);
    setPrice(Number(product.price));

    const complementsAll = [];
    
    product.complements.forEach((item) => {
      if (item.isRequired) {
        setRequiredComplements((old) => [...old, item._id]);
      }

      complementsAll.push({
        parent: item._id,
        min: item.min,
        max: item.max,
        isRequired: item.isRequired,
        count: 0,
        options: item.options?.map(option =>
          ({ id: option._id, quantity: 0, price: option.price })
        )
      });
    });

    setComplements(complementsAll);
  }, []);

  return (
    <S.Main>
      <S.ContainerProduct>
        <S.BackgroundImg bgImg={product.images[0]?.url} />

        <S.Container>
          <h2 className="subtitle">{product.name}</h2>
          <div className="description">
            <p>{product.description}</p>
            <p style={{ fontSize: '1.4rem', margin: '0.2rem 0 1.4rem', color: '#008000' }}>
              {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </p>
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
                      Escolha {item.isRequired ? `pelo menos ${item.min} ${item.min === 1 ? 'opção' : 'opcões'}` : `até ${item.max} opções`}
                    </span>
                  </div>
                  <div className="required">
                    <div>
                      {
                        complementOption.count >= item.min
                          ? <span className="fa fa-check" style={{ fontSize: '1rem', color: '#00ff00' }}></span>
                          : <S.WrapperInfo>
                            <span>{`${complementOption.count}/${item.max}`}</span>
                          </S.WrapperInfo>
                      }
                    </div>
                    <S.WrapperInfo>{item.isRequired ? 'Obrigatório' : 'Opcional'}</S.WrapperInfo>
                  </div>
                </S.ComplementHeader>

                {item.options?.map((option, indexOption) => {
                  const currentOption = complementOption.options.find(c => c.id === option._id);

                  return (
                    <S.Container key={option.name}>
                      <S.ComplementOption>
                        <span>
                          <span className="title">{option.name.replace('+', '')}</span> <br />
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
              multiline
              rows={3}
              fullWidth={true}
              placeholder="Ex: tirar a cebola, maionese à parte etc."
            // onChange={(e) => setData({ ...data, description: e.target.value })}
            />
          </S.Comment>
        </S.Container>
      </S.ContainerProduct>

      <S.ContainerAction>
        <S.CountItem>
          <span className="fa-solid fa-minus" style={{ cursor: 'pointer' }} onClick={removeProductItem}></span>
          <span className="value">{counterValue}</span>
          <span className="fa-solid fa-plus" style={{ cursor: 'pointer' }} onClick={setProductItem}></span>
        </S.CountItem>
        <S.ButtonAdd onClick={addToCart} disabled={!confirm}>
          <span>Adicionar</span>
          <span>{price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
        </S.ButtonAdd>
      </S.ContainerAction>
    </S.Main>
  );
};

export default ProductView;
