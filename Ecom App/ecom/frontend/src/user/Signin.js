import React, { useState } from 'react'
import Base from '../core/Base'
import { Link ,redirect,Navigate} from 'react-router-dom'
import {signin,authenticate,isAuthenticated} from '../auth/helper'

export default function Signin() {

    const [values,setValues] = useState({
        name:"",
        email: "",
        password:"",
        error:"",
        success:"",
        loading: "",
        didRedirect: false
    })
    const {name,email,password,error,success,loading,didRedirect} = values
    const handleChange = (name) => (event) => {
        setValues({...values,error:false,[name]: event.target.value})
    };

    const onSubmit = (event) => {
        event.preventDefault();
        setValues({...values,error:false,loading:true})
        signin({email,password})
        .then(data =>{
            console.log("DATA",data)
            if (data.token){
                
                authenticate(data, () => {
                    console.log("Token Added")
                    setValues({...values,didRedirect:true})
                })
                
            }
            else {
                setValues({...values, loading: false})
                
                    
                
            }
        })
        .catch((e) => console.log(e))
    };

    const performRedirect = () => {
        if (isAuthenticated() && didRedirect) {
            return (
                <Navigate to='/' />
            )
        }
    }
    

    const loadingMessage = () => {
        return (
            loading && (
                <div className="alert alert-info">
                    <h2>Loading....</h2>
                </div>
            )
        )
    }
    const errorMessage = () =>{
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left" >
                    <div className='alert alert-danger'
                    style={{display: error? "": "none" }}>
                        Check all fields
                    </div>
                </div>
            </div>
        )
    }

    const successMessage = () =>{
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left" >
                    <div className='alert alert-success'
                    style={{display: success? "": "none" }}>
                        New Account created Succesfully. Please <Link to='/signin'>Login now</Link> 
                    </div>
                </div>
            </div>
        )
    }
    const signInForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input type="text" value={email} onChange={handleChange("email")} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input type="password" value={password} onChange={handleChange("password")} className="form-control" />
                        </div>
                        <button onClick={onSubmit} className="btn btn-success btn-block">Sign In</button>
                    </form>
                </div>
            </div>
        )
    }
  return (
    <Base title='Welcome to Sign In Page' description='CliXury Store'>
        {loadingMessage()}
        {signInForm()}
        <p className='text-center'>{JSON.stringify(values)}</p>
        {performRedirect()}
    </Base>
  )
}
