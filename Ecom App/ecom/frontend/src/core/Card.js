import React, { useState } from 'react'
import { ImageHelper } from './helper/ImageHelper';
import { Navigate} from 'react-router-dom';
import { addItemToCart , removeItemFromCart} from './helper/CartHelper';
import {isAuthenticated} from '../auth/helper/index'



export default function Card({
    product,
    addtoCart = true,
    removeFromCart = false,
    reload = undefined,
    setReload = (f) => f
}) {
    const [redirect,setRedirect] = useState(false)
    const carttitle = product ? product.name : 'A photo from Myntra'
    const cartdescription = product ? product.description : 'Default description'
    const cartprice = product ? product.price : 'Default'

   const addToCart = () => {
    if (isAuthenticated()) {
      addItemToCart(product, () => setRedirect(true))
     
      console.log('Added to Cart');
    }
    else{
      console.log("Login Please");
    }
   }
    const getAredirect = (redirect) => {
        if (redirect) {
            return (
              <Navigate to='/cart' />
                )
        }
    }
    const showaddToCart = (addtoCart) => {
        return addtoCart && (
                    <button
                    onClick={addToCart}
                    className="btn btn-block btn-outline-success mt-2 mb-2"
                    >
                    Add to Cart
                  </button>
        )
    }
    const showremovefromCart = (removeFromCart) => {
        return removeFromCart && <button
        onClick={() => {
          removeItemFromCart(product.id)
          setReload(!reload)
            console.log('Product removed from cart')
        }}
        className="btn btn-block btn-outline-danger mt-2 mb-2"
      >
        Remove from cart
      </button>
    }
    
        return (
          <div className="card text-white bg-dark border border-info ">
            <div className="card-header lead">{carttitle}</div>
            <div className="card-body">
            {getAredirect(redirect)}
              <div className="rounded border border-success p-2">
                <ImageHelper product={product}/>
              </div>
              <p className="lead bg-success font-weight-normal text-wrap">
                {cartdescription}
              </p>
              <p className="btn btn-success rounded  btn-sm px-4">{cartprice}$</p>
              <div className="row">
                <div className="col-12">
                  {showaddToCart(addtoCart)}
                </div>
                <div className="col-12">
                  {showremovefromCart(removeFromCart)}
                </div>
              </div>
            </div>
          </div>
        );
      };
