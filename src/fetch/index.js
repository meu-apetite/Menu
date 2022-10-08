const url = 'https://23b5-45-167-217-215.sa.ngrok.io'

const fetchApi = async (method = 'get', route = 'product', body = null) => {
  const params = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'ngrok-skip-browser-warning': 'test',
    },
    method: method,
  }

  if (method === 'post') params.body = JSON.stringify(body)

  const response = await fetch(`${url}/${route}`, params)
  return response
}

export default fetchApi
