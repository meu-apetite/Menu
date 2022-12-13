import React, { useEffect, useState } from 'react'
import fetchApi from 'fetch'

const Home = (props) => {
  const update = async () => {
    let id = localStorage.getItem('_id')
    if (!id) id = null
    id = JSON.parse(id)

    const response = await fetchApi('get', `company/${id}`)
    const company = await response.json()
  }

  useEffect(() => {
    update()
  }, [])

  return (
    <>
      <h1>ok</h1>
    </>
  )
}

export default Home
