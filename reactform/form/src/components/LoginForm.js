import React from "react"; 

import { useForm } from "react-hook-form"; 
import TextField from '@mui/material/TextField';
import "./LoginForm.css"; 

 

const LoginForm = () => { 

  const { register, handleSubmit,formState: { errors }} = useForm(); 
console.log('reg',register)
 

  function onSubmit(data) { 

    console.log("Data submitted: ", data); 

  } 

 

  return ( 

    <div className="login-form"> 

      <form onSubmit={handleSubmit(onSubmit)} noValidate> 

        <label htmlFor="inputEmail">E-mail</label> 

        <TextField type="email" {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: "this is not valid",
                                }
                            })} />
        {errors.email && <p className="error">{errors.email.message}</p>} 

        <label htmlFor="inputPassword">Password</label> 
        <TextField  type="password" {...register('password', {
                                required: 'Password is required',
                                pattern: {
                                    value:/^[A-Za-z0-9]{5,10}$/,
                                    message: "this is not valid",
                                }
        })} />
        {errors.password && <p className="error">{errors.password.message}</p>} 

        <button type="submit">Login</button> 

      </form> 

    </div> 

  ); 

}; 

 

export default LoginForm; 

 