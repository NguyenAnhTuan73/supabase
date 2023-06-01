import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from './client';
import { Input } from 'antd';

const Login = ({ setToken }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '', password: ''
    })

    function handleChange(event) {
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value
            }
        })
    }
    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: formData.email,
                password: formData.password,
            })
            if (error) throw error
            // alert('Check your email for verification link');
            console.log(data);
            setToken(data.session?.access_token);
            navigate('/home')
        } catch (error) {
            alert(error)
        }
    }
    return (
        <div className='bg w-full h-screen flex justify-center items-center'>
            <form className='w-[500px] px-2' onSubmit={handleSubmit}>
                <h1 className='text-center'>LOGIN FORM</h1>
                <div className='flex w-full mb-2'>
                    <h1 className='w-1/5 text-base'>Email:</h1>
                    <Input
                        className='w-full h-[2.5rem]'
                        placeholder='Email'
                        name='email'
                        onChange={handleChange}
                    />
                </div>
                <div className='flex w-full mb-2'>
                    <h1 className='w-1/5 text-base'>Password:</h1>
                    <Input
                        className='w-full h-[2.5rem]'
                        placeholder='Password'
                        name='password'
                        onChange={handleChange}
                        type='password'
                    />
                </div>
                <div className='text-center my-5'>
                    <button type='submit' className='py-1 px-5 '>
                        Submit
                    </button>
                </div>
                <div className='text-end'>

                    Don't have a account ? <Link to='/signup'>Signup</Link>
                </div>


            </form>
        </div>
    )
}

export default Login