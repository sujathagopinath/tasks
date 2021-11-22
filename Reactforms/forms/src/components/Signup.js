import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import './Signup.css'
import { BsFillMicFill } from "react-icons/bs";

const Form = () => {
    const { register, handleSubmit, errors } = useForm()
    const [userInfo, setUserInfo] = useState()

    const onSubmit = (data) => {
        setUserInfo(data)
        console.log(data)
    }
    console.log(errors)
    return (
        <div className='container'>
            <pre>{JSON.stringify(userInfo, undefined, 2)}</pre>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2>Sign Up</h2>
                <div className="divider">
                    <div className='forms'>
                        <div className='field'>
                            <label>Username</label>
                            <input placeholder='Username' type="text" {...register('name', { required: true })}
                            />
                            <BsFillMicFill className='icons' />
                        </div>

                        <div className='field'>
                            <label>Email</label>
                            <input placeholder='Email' type="email" {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: "this is not valid",
                                }
                            })} />
                            <BsFillMicFill className='icons' />
                        </div>

                        <div className='field'>
                            <label>Password</label>
                            <input placeholder='Password' type="password" {...register('password', { required: true })} />
                            <BsFillMicFill className='icons' />
                        </div>
                    </div>
                    <button className='submit'>Register Here</button>
                </div>
            </form >
        </div >
    )
}

export default Form