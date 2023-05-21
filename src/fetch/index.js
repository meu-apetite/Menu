const url = 'http://127.0.0.1:5000'

let token = localStorage.getItem('token')
let _id = localStorage.getItem('_id')

if (token) token = JSON.parse(token)
if (_id) _id = JSON.parse(_id)

const fetchApi = async (
  method = 'get',
  route = 'product',
  body = null,
  auth = true,
  multipart = false
) => {

  let headers = { 'Content-Type': 'application/json' };

  if(multipart) headers = {};

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
