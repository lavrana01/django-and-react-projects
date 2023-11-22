import React,{useState} from 'react'
import Base from '../core/Base'
import { Link } from 'react-router-dom'
import { signup } from '../auth/helper'

export default function Signup() {
    const [values,setValues] = useState({
        name: "",
        email:"",
        password: "",
        error:"",
        success: false
    })
    const {name,email,password,error,success} = values;
    
    const handleChange = (name) => (event) => {
        setValues({...values,error: false,[name]: event.target.value})
    };

    const onSubmit = (event)=> {
        event.preventDefault();
        setValues({...values,error:false})
        signup({name,email,password})
        .then(data=>{
            console.log("Data",data);
            if(data.email === email){
                setValues({
                    ...values,name: "",email:"",password:"",error:"",success:true
                })
            }
            else{
                setValues({
                    ...values,error: true,success:false
                })
            }
        })
        .catch(err => console.log(err))
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
    const signUpForm = () =>{
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Name</label>
                            <input type="text" value={name} onChange={handleChange("name")} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input type="text" value={email} onChange={handleChange("email")} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input type="password" value={password} onChange={handleChange("password")} className="form-control" />
                        </div>
                        <button onClick={onSubmit} className="btn btn-success btn-block">Sign Up</button>
                    </form>
                </div>
            </div>
        )
    }
  
    return (
    <Base title='Sign Up Page' description='Signup for CliXury User'>
        {successMessage()}
        {errorMessage()}
        {signUpForm()}
        <p className='text-white text-center'>
            {JSON.stringify(values)}</p> 
    </Base>
  )
}
