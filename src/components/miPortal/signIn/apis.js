import { apis } from '../../services/Apis'

 

export async function Login(value) {
  var token = localStorage.getItem('token')
  var response = await fetch(apis.SERVER + apis.CLIENTS + '/bulk-insertion', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(value),
  })
  response = await response.json()
  return response
}
 