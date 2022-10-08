import * as React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import {AuthProvider} from 'contexts/auth'
import Login from './pages/Login'
import Register from './pages/Register'

//Admin
import Home from './pages/admin/Home'
import ProductCreate from './pages/admin/product/Create'
import Product from './pages/admin/product'
import CategoryCreate from './pages/admin/category/Create'
import Category from './pages/admin/category'

const App = () => {
  React.useEffect(() => {
    console.log('ok')
  })
  
  return (
    <AuthProvider>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="admin" element={<Home />} />
        {/* <Route path="admin/product" element={<Home />} /> */}
        <Route path="admin/product/create/" element={<ProductCreate />} />
        <Route path="admin/product/" element={<Product />} />
        <Route path="admin/category/create/" element={<CategoryCreate />} />
        <Route path="admin/category/" element={<Category />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
