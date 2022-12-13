import React, { createContext, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

import Loading from 'components/Loading'

export const AuthContext = createContext()

export const AuthProvider = (props) => {
  const [company, setCompany] = useState({})
  const [token, setToken] = useState('')
  const [loading, setLoading] = useState(false)

  return (
    <AuthContext.Provider
      value={{
        company,
        setCompany,
        token,
        setToken,
        loading,
        setLoading,
        toast,
      }}
    >
      {loading && <Loading text={loading} />}
      <Toaster position="bottom-right" reverseOrder={false} />
      {props.children}
    </AuthContext.Provider>
  )
}
