import { apis } from '../../services/Apis'

export async function getPlansInternet(value) {
  // axios
  //   .get(localhost + '/api/v1/planes-internet', {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //   .then((response) => {
  //     console.log(response)
  //     if (response.data) {
  //       setRecords(response.data)
  //     }
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //   })

  var token = localStorage.getItem('token')
  var response = await fetch(apis.SERVER + apis.PLANS_INTERNET, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(value),
  })
  response = await response.json()
  return response
}

export async function insert(value) {
  var token = localStorage.getItem('token')
  var response = await fetch(apis.SERVER + apis.CLIENTS, {
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

export async function bulkInsertion(value) {
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
export async function update(value) {
  var token = localStorage.getItem('token')
  var response = await fetch(apis.SERVER + apis.CLIENTS, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(value),
  })
  response = await response.json()
  console.log(response)
  return response
}

export async function remove(value) {
  var token = localStorage.getItem('token')
  var response = await fetch(apis.SERVER + apis.CLIENTS, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(value),
  })
  response = await response.json()
  return response
}
