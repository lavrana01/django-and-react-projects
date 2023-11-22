import React, { useEffect, useState } from 'react'
import { redirect } from 'react-router-dom'
import { cartEmpty } from './helper/CartHelper'
import getmeToken,{processPayment} from './helper/PaymentHelper'
import { createOrder } from './helper/OrderHelper'
import { isAuthenticated ,signout} from '../auth/helper'
import DropIn from 'braintree-web-drop-in-react'

export default function Paymentb({products,reload=undefined,setReload=f=>f}) {
    const [info,setInfo] = useState({
        loading:false,
        success: false,
        clientToken: null,
        error: '',
        instance: {}

    })
    const userId = isAuthenticated && isAuthenticated().user.id
    const token = isAuthenticated && isAuthenticated().token
    

    const getToken = (userId,token) =>{
        getmeToken(userId,token)
        .then(info => {
            if(info.error){
                setInfo({
                    ...info,
                    error: info.error
                })
                signout(() => {
                    return redirect('/')
                })
            }
            else{
                const clientToken = info.ClientToken
                setInfo({clientToken})
            }
        })
    }
    useEffect(()=> {
        getToken(userId,token)
    },[])
   
    const getAmount = ()=>{
        let amount = 0;
        products.map(p => {
            amount = amount + parseInt(p.price)
        })
        return amount;
    }
    const onPurchase = () => {
        setInfo({loading: true})
        let nonce;
        let getNonce = info.instance.requestPaymentMethod()
        .then(data => {
            nonce = data.nonce
            const paymentData = {
                paymentMethodNonce: nonce,
                amount: getAmount()
            };
            processPayment(userId,token,paymentData)
            .then(response => {
                if (response.error) {
                    if (response.code === '1'){
                        console.log('Payment failed')
                        signout(()=>{
                            return redirect('/')
                        })
                    }
                }
                else {
                    setInfo({...info,
                    success:response.Success,
                    loading:false
                    })
                    console.log("Payment Success")
                    let product_names = ''
                    products.forEach(function(item){
                        product_names += item.name + ', '
                    })
                    const orderData = {
                        products: product_names,
                        transaction_id : response.transaction.id,
                        amount: response.transaction.amount
                    }
                    createOrder(userId,token,orderData)
                    .then(response => {
                        if (response.error){
                            if (response.code === '1'){
                                console.log('Order failed')
                            }
                            signout(()=>{
                                return redirect('/')
                            })
                        
                        }
                        else {
                            if (response.success === true){
                                console.log('ORDER PLACED')
                            }
                            
                        }
                    })
                    .catch(err => {
                        setInfo({loading:false,success:false})
                        console.log("ORDER FAILED", err)
                    })
                    cartEmpty(()=>{
                        console.log('Cart is empty now')
                    })
                    setReload(!reload)
                }

            })
            .catch(e => console.log(e))
        })
        .catch(err => console.log(err))
    }
    const showbtnDropIn = ()=>{
        return (
            <div>
                {
                    info.clientToken !== null && products.length > 0 ? (
                        <div> 
                            <DropIn 
                            options={{ authorization: info.clientToken }}
                            onInstance={(instance) => (info.instance = instance)}>
                                </DropIn>
                            <button onClick={onPurchase} className='btn btn-block btn-success'>Buy Now</button>
                        </div>
                    ) : 
                    (
                        <div>
                        <h3> Please login first or add something in cart</h3>
                        </div>
                        )

                }
            </div>
        )
    }
  return (
    <div>
        <h3>Your total Bill is ${getAmount()}</h3>
        {showbtnDropIn()}
    </div>
  )
}
