const url = 'https://b34b-45-167-217-40.sa.ngrok.io'
let token = localStorage.getItem('token')
let _id = localStorage.getItem('_id')
if (token) token = JSON.parse(token)
if (_id) _id = JSON.parse(_id)

const fetchApi = async (
  method = 'get',
  route = 'product',
  body = null,
  auth = true,
) => {
  const headers = {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'dev',
  }
  const params = { headers, method }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
    headers['_id'] = _id
  }

  if (method === 'post' || method === 'put') params.body = JSON.stringify(body)

  const response = await fetch(`${url}/${route}`, params)

  if (auth) {
    if (response.status === 401) {
      alert('Ocorreu um erro na autenticação, faça o login para continuar!')
      return (window.location.href = '/login')
    }
  }

  return response
}

export default fetchApi
