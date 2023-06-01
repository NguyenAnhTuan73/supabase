import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from './client';
import { Input } from 'antd';

const SignUp = () => {

    const [formData, setFormData] = useState({
        fullName: '', email: '', password: ''
    })

    console.log(formData)

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
            const { data, error } = await supabase.auth.signUp(
                {
                    email: formData.email,
                    password: formData.password,
                    options: {
                        data: {
                            full_name: formData.fullName,
                        }
                    }
                }
            )
            if (error) throw error
            alert('Check your email for verification link')


        } catch (error) {
            alert(error)
        }
    }




    return (
        <div className='bg w-full h-screen flex justify-center items-center'>
            <form className='w-[500px] px-2' onSubmit={handleSubmit}>
                <h1 className='text-center'>REGISTER FORM</h1>
                <div className='flex w-full mb-2'>
                    <h1 className='w-1/5 text-base'>Full name:</h1>
                    <Input
                        className='w-full h-[2.5rem]'
                        placeholder='Fullname'
                        name='fullName'
                        onChange={handleChange}
                    />
                </div>
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
                    />
                </div>

                {/* <input
                    placeholder='Email'
                    name='email'
                    onChange={handleChange}
                />

                <input
                    placeholder='Password'
                    name='password'
                    type="password"
                    onChange={handleChange}
                /> */}
                <div className='text-center my-5'>
                    <button type='submit' className='py-1 px-5 '>
                        Submit
                    </button>
                </div>
                    <div className='text-end'>

                        Already have a account ? <Link to='/'>Login</Link>
                    </div>


            </form>
        </div>
    )
}

export default SignUp