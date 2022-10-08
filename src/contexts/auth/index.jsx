import React, { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext()

export const AuthProvider = (props) => {
  const [company, setCompany] = useState({})
  const [token, setToken] = useState('')

  useEffect(() => {
    console.log('oi content api')
  })
  
  return (
    <AuthContext.Provider value={{ company, setCompany, token, setToken }}>
      {props.children}
    </AuthContext.Provider>
  )
}
