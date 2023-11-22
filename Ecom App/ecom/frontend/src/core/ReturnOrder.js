import React, { useEffect, useState } from 'react'
import Base from './Base'
import { orderHistory } from './helper/OrderHelper';
import { orderReturn } from './helper/ReturnHelper'
import { Navigate, redirect, useNavigate } from 'react-router-dom'




export default function ReturnOrder() {
  
  const navigate = useNavigate();
  const [rproduct,setRproduct] = useState({
      rproduct_name : '',
      rproduct_reason: '',
      rproduct_image: '',
      success: '',
      error: false
  })
  const [selectedFile, setSelectedFile] = useState(null);
  const [check,setCheck] = useState(true)
  const {rproduct_name,rproduct_reason,rproduct_image,success,error} = rproduct
  const padata = localStorage.getItem('jwt')
  const parseddata = JSON.parse(padata)
  const userid = parseddata.user.id
  const token = parseddata.token


  const loadOrders = () => {
    orderHistory(userid,token)
    .then(response => {
        
       // Set orders first
      setRproduct({ ...rproduct, rproduct_name: response.order_history.product_names });
      
      
      
    })
    .catch(err => console.log(err))
  }
  
  useEffect(() => {
    
    if (check){
      loadOrders()
    }
    
    
  },[])
  const handleChange = (name) => (event)=> {
      setRproduct({...rproduct,error:false,[name]: event.target.value})
      
      
  }
  const handleImage = (event)=>{
    const file = event.target.files[0];
    setSelectedFile(file)
  }
  
  
  const submitReturn = ()=>{
    
    const returnData = {
      product: rproduct_name,
      reason: rproduct_reason,
      rimage: selectedFile
    }
    
    try {
    orderReturn(userid,token,returnData)
    .then(response => {
      
          if (response.success === true){
              console.log('ORDER RETURN REQUEST PLACED SUCCESSFULLY') 
              setCheck(false)
              
              
          }
          
  })
  navigate('/')
}
catch (error) {
  console.error('An error occurred:', error);
}
  }
  
  const successMessage = () =>{
    return (
        <div className="row">
            <div className="col-md-6 offset-sm-3 text-left" >
                <div className='alert alert-success'
                style={{display: success? "": "none" }}>
                   ORDER RETURN REQUEST PLACED SUCCESSFULLY..
                </div>
            </div>
        </div>
    )
}
  return (
    
    <Base title='Order Return' description='Place a return request!'>
      
      {successMessage()}
    <form>
        <div className="form-group">
        <div className="form-group">
          <label>Product</label>
          <input
            type="text"
            className="form-control"
            value={rproduct_name}
            readOnly
          />
          </div>
          <label htmlFor="image">Upload Return Product Image:</label>
          <input
            type="file"
            className="form-control-file"
            accept="image/*"
            onChange={handleImage}
          />
        </div>
        <div className="form-group">
          <label>Product Return Reason</label>
          <input
            type="text"
            className="form-control"
            value={rproduct_reason}
           onChange={handleChange("rproduct_reason")}
          />
          </div>
        <button onClick={submitReturn} className="btn btn-success">
          Return
        </button>
      </form>
      
</Base>
  )
}
