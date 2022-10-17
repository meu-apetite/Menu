import React, { createContext, useEffect, useState } from 'react'
import fetchApi from 'fetch'

export const AuthContext = createContext()

export const AuthProvider = (props) => {
  const [company, setCompany] = useState({})
  const [token, setToken] = useState('')

  const update = async () => {
    const id = JSON.parse(localStorage.getItem('_id'))
    const response = await fetchApi('get', `company/${id}`)
    const company = await response.json()
    setCompany(company)
  }

  useEffect(() => {
    update()
  }, [])

  return (
    <AuthContext.Provider value={{ company, setCompany, token, setToken }}>
      {props.children}
    </AuthContext.Provider>
  )
}
