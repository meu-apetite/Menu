import React, { useEffect, useState } from 'react'
import './style.css';
import { useParams } from 'react-router-dom';
import fetchApi from 'fetch';

const Presentation = () => {
  const [company, setCompany] = useState();
  const params = useParams();
  
  const getCompany = async (id) => {
    let response = await fetchApi('get', `app/${id}`)
    response = await response.json()
    setCompany(response)
  }
  useEffect(() => {
    const id = params?.storeId;
    getCompany(id);
  }, [])

  return (
    <div>
      <section className="main">
        <header className="header container">
          <div className="header__logo">{company?.fantasyName}</div>
          <nav className="header__nav">
            <ul className='header__nav__list'>
              <li className="item"><a href="#test"><span className="fab fa-font-awesome-flag"></span>Sobre</a></li>
              <li className="item"><a href="#test"><span className="fas fa-images"></span>Galeria</a></li>
              <li className="item"><a href="#test"><span className="fas fa-sale"></span>Catálogo</a></li>
              <li className="item"><a href="#test"><span className="fas fa-map-marked-alt"></span>Localização</a></li>
              <li className="item"><a href="#test"><span className="fas fa-address-book"></span>Contato</a></li>
              <li className="item"><a href="#test"><span className="fas fa-store-alt"></span>Loja</a></li>
            </ul>
          </nav>
        </header>
        
        <div className="intro container">
          <h1 className="title">{company?.fantasyName}</h1> 
          <hr className='line-decoration'/>
          <h2 className='slogan'>{company?.slogan}</h2>
          <a class="button-gallery" href="#portfolio">Galeria</a>
        </div>
      </section>

      <section className="about">

      </section>
    </div>
  )
}

export default Presentation
