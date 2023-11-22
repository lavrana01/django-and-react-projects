import {API} from '../../backend'

import React from 'react'

export default function getmeToken(userId,token) {
  return fetch(`${API}payment/gettoken/${userId}/${token}/`,{
    method: "GET",
  })
  .then(response => {
    return response.json()
  })
  .catch((err)=> console.log(err))
}

export const processPayment = (userId,token,paymentInfo) => {
    const formData = new FormData();
    for(const name in paymentInfo){
        formData.append(name,paymentInfo[name])
    }
    return fetch(`${API}payment/process/${userId}/${token}/`,{
        method: 'POST',
        body: formData
    })
    .then(response => {
        return response.json()
      })
    .catch((err)=> console.log(err))
}
