import React, {useEffect, useState} from 'react'
import Base from './Base'
import { orderHistory } from './helper/OrderHelper'
import { Link } from 'react-router-dom'

export default function MyOrders() {
  const [orders,setOrders] = useState({
    product_names: "",
    total_amount: "",
    txn_id: ""
  })
  const padata = localStorage.getItem('jwt')
  const parseddata = JSON.parse(padata)
  const loadOrders = ()=>{
    orderHistory(parseddata.user.id,parseddata.token)
    .then(response => {
        
        setOrders({product_names: response.order_history.product_names,total_amount: response.order_history.total_amount,txn_id:response.order_history.transaction_id})
    })
    .catch(err => console.log(err))
  }
  useEffect(() => {
    loadOrders();
  },[])
  console.log(parseddata.user.id)
  console.log(orders)
  
  return (
    <Base title='My Orders' description='Order History'>
    <div className="card">
    <div className="card-header bg-dark">
    Order for {orders.product_names}
    </div>
    <div className="card-body bg-dark">
    <h5 className="card-title">${orders.total_amount}</h5>
    <p className="card-text">Transaction Id: {orders.txn_id}</p>
    <Link to="/track" className="btn btn-success">Track Order</Link>
    <Link to="/return" className="btn btn-success ml-2">Return</Link>
    </div>
    </div>
    </Base>
  )
}
