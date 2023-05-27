const url = 'http://127.0.0.1:5000';

let token = localStorage.getItem('token');
let _id = localStorage.getItem('_id');

if (token) token = JSON.parse(token);
if (_id) _id = JSON.parse(_id);

const fetchApi = async (method = 'get', route = 'product', body = null, auth = true, multipart = false) => {
  let headers = { 'Content-Type': 'application/json' };

  if (multipart) {
    headers = { 
      'enctype': 'multipart/form-data'
     };
  }

  const params = { headers, method };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
    headers['_id'] = _id;
  }

  if (method === 'post' || method === 'put') {
    params.body = JSON.stringify(body);
  } 
  
  if(multipart) {
    params.body = body;
    console.log(body.get('title')); // Exibe o valor do campo 'title'
    console.log(body.get('image')); // Exibe o valor do campo 'image'
  }

  const response = await fetch(`${url}/${route}`, params);

  return response;
};

export default fetchApi;
