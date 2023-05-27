import React, { useEffect, useState } from 'react'
import fetchApi from 'fetch';
import './style.css'

const Home = (props) => {
  const update = async () => {
    let id = localStorage.getItem('_id')
    if (!id) id = null
    id = JSON.parse(id)

    const response = await fetchApi('get', `/${id}`)
    const company = await response.json();
    console.log(company)
  }

  useEffect(() => {
    update()
  }, [])

  return (
    <>
        <div className="dashboard">
          <style>
            
          </style>
      <div className="section">
        <h2>Produtos em destaque</h2>
        <ul>
          <li>Produto 1</li>
          <li>Produto 2</li>
          <li>Produto 3</li>
        </ul>
      </div>
      <div className="section">
        <h2>Produtos mais vendidos</h2>
        <ol>
          <li>Produto 4</li>
          <li>Produto 5</li>
          <li>Produto 6</li>
        </ol>
      </div>
      <div className="section">
        <h2>Produtos com estoque baixo</h2>
        <table>
          <tr>
            <th>Produto</th>
            <th>Quantidade</th>
          </tr>
          <tr>
            <td>Produto 7</td>
            <td>2</td>
          </tr>
          <tr>
            <td>Produto 8</td>
            <td>5</td>
          </tr>
          <tr>
            <td>Produto 9</td>
            <td>10</td>
          </tr>
        </table>
      </div>
      <div className="section">
        <h2>Localização</h2>
        <div className="qr-code">
          {/* <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=lojaficticia.com.br"> */}
        </div>
        <div className="map">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3840.456515570109!2d-48.48179388519753!3d-1.445711836212218!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x92fbff8c7cf08e31%3A0xa810d66e8c7d31b!2sCentral%20do%20Bambu%20Manaus!5e0!3m2!1spt-BR!2sbr!4v1622797367347!5m2!1spt-BR!2sbr" title="Mapa da loja"></iframe>
          
        </div>
      </div>
    </div>
    </>
  )
}

export default Home
