const url = 'https://d84b-45-167-217-144.sa.ngrok.io'
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


  return response
}

export default fetchApi
