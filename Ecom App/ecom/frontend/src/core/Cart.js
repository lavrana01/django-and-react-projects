import React, { useEffect, useState } from 'react'
import Base from './Base'
import { loadCart } from './helper/CartHelper'
import Card from './Card'
import Paymentb from './Paymentb'


export default function Cart() {
    const[reload,setReload] = useState(false)
    const[products,setProducts] = useState([])

    useEffect(()=> {
        setProducts(loadCart())
    },[reload])
    console.log(loadCart())

    const loadAllProducts = (products) => {
        if (!products || products.length === 0) {
          return <p>No products in the cart.</p>;
        }
      
        return (
          <div>
            {products.map((product, index) => (
              <Card key={index} product={product} removeFromCart={true} addtoCart={false} reload={reload} setReload={setReload} />
            ))}
          </div>
        );
      };
      
    
  return (
    <Base title='Cart page' description='Welcome to Checkout'>
        <div className="row text-center">
        <div className="col-6">{loadAllProducts(products)}</div>
        <div className="col-6">{products.length > 0 ? (
          <Paymentb products={products} setReload={setReload}></Paymentb>
        ):
         (
            <h3>Please login or add something to cart </h3>
         )}</div>
        </div>
    </Base>
  )
}
