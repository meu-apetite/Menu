import React, { useEffect, useState } from 'react'
import Container from 'components/Container'
import fetchApi from 'fetch'

const Home = (props) => {
  const companyId = localStorage.getItem('_id')
  const [company, setCompany] = useState();



  useEffect(() => {
    const getCompany = async () => {
      let res = await fetchApi('get', `company`);
      console.log(res)
    }
    getCompany()
  })

  return <Container></Container>
}

export default Home
