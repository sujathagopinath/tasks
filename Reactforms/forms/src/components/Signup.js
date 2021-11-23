import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { recognition } from './Voicesearch'
import './Signup.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophone } from '@fortawesome/free-solid-svg-icons'

const Form = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [userInfo, setUserInfo] = useState()
    const [voiceText, setVoiceText] = useState('')

    const onSubmit = (data) => {
        setUserInfo(data)
        console.log(data)
    }
    console.log(errors)

    const OpenVoice = () => {
        recognition.start();
        recognition.onresult = (e) => {
            var current = e.resultIndex;
            var transcript = e.results[current][0].transcript;
            setVoiceText(voiceText + transcript)
        }
    }
    return (
        <div className='container'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2>Sign Up</h2>
                <div className="divider">
                    <div className='forms'>
                        <div className='field'>
                            <label>Username</label>
                            <input placeholder='Username' type="text"
                                {...register('name', { required: "Name is required" })}
                            />
                            {errors.name && (<small className='text-danger'>Name is required</small>)}
                            <button type='button' className='btn' onClick={() => OpenVoice()}>
                                <FontAwesomeIcon icon={faMicrophone}/>
                            </button>
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
                            {errors.email && (<small className='text-danger'>Email is required</small>)}
                            <button type='button' className='btn'>
                                <FontAwesomeIcon icon={faMicrophone} />
                            </button>
                        </div>

                        <div className='field'>
                            <label>Password</label>
                            <input placeholder='Password' type="password" {...register('password', { required: true })} />
                            {errors.password && (<small className='text-danger'>Password is required</small>)}
                            <button type='button' className='btn'>
                                <FontAwesomeIcon icon={faMicrophone} />
                            </button>
                        </div>
                    </div>
                    <button className='submit'>Register Here</button>
                </div>
            </form >
            <pre>{JSON.stringify(userInfo, undefined, 2)}</pre>
        </div >
    )
}

export default Form