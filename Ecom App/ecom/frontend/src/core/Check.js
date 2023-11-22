import React from 'react'
import { orderReturn } from './helper/ReturnHelper'


export default function Check() {
    const padata = localStorage.getItem('jwt')
  const parseddata = JSON.parse(padata)
  const userid = parseddata.user.id
  const token = parseddata.token
    const dt = {
        product: 'Special edition',
        reason: 'fitting',

    }
    orderReturn(userid,token,dt)
    .then(response => console.log(response))
    .catch(err => console.log(err))
  return (
    <div>Checking..</div>
  )
}
