import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom/dist';
import { supabase } from './client';
import { Button, Input, Table } from 'antd';
const Homepage = ({ token }) => {
    const navigate = useNavigate()
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({
        name: '', age: ''
    })
    const [userEdit, setUserEdit] = useState({
        id: '', name: '', age: ''
    })
    const fetchUsers = async () => {
        const { data } = await supabase.from('users').select('*');
        setUsers(data)
    }
    console.log('userEdit', userEdit);
    const handleChange = (e) => {
        setUser(prevFormData => {
            return {
                ...prevFormData,
                [e.target.name]: e.target.value,

            }
        })
    }
    const handleChangeEdit = (e) => {
        setUserEdit(prevFormData => {
            return {
                ...prevFormData,
                [e.target.name]: e.target.value,

            }
        })
    }
    const createUser = async () => {
        await supabase.from('users').insert({ name: user.name, age: user.age })
    }
    const delUser = async (item) => {
        console.log("🚀 ~ file: Homepage.jsx:40 ~ delUser ~ item:", item)

        const { data, error } = await supabase.from('users').delete().eq('id', item.id);
        fetchUsers();
        if (error) {
            console.log(error);
        }
        if (data) {
            console.log(data);
        }
    }
    // edit user

    const editUser = async (item) => {
        setUserEdit({ name: item.name, age: item.age, id: item.id });
    }

    const updateUser = async (userId) => {
        const { data, error } = await supabase
            .from('users')
            .update({ name: userEdit.name, age: userEdit.age, id: userEdit.id })
            .eq('id', userId);
        if (error) {
            console.log(error);
        }
        if (data) {
            console.log(data);
        }
        fetchUsers();
    }
    const handleLogout = () => {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('sb-hzzqerfhbmadwacopfym-auth-token');
        navigate('/')
    }
    useEffect(() => {

        fetchUsers();
    }, [])

    const columns = [
        {
            title: 'No.',
            key: 'id',
            with: '10%',
            render: (text, object, index) => index + 1

        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Actions',
            dataIndex: '',
            key: '',
            render: (text, item) => (
                <div>
                    <Button className='mx-1' type='primary' onClick={() => editUser(item)}>
                        Edit
                    </Button>
                    <Button className='mx-1' danger type='primary' onClick={() => delUser(item)}>
                        Delete
                    </Button>

                </div>
            ),
        },


    ];
    return (
        <div className='h-screen p-2'>
            <div className='flex justify-between items-center mb-10'>
                <h3>Welcome Home page,</h3>
                <Button onClick={handleLogout} type='primary'>Logout</Button>

            </div>
            <div className='w-2/3 mx-auto'>
                <div className='w-2/3 mx-auto'>
                    <form onSubmit={createUser}>
                        <div className='flex items-center'>
                            <Input className='border-[1px] border-black p-1 px-2 mx-1' type="text" placeholder='Name' name='name'
                                onChange={(e) => handleChange(e)}
                            />
                            <Input className='border-[1px] border-black p-1 mx-1' type="number" placeholder='Age' name='age'
                                onChange={(e) => handleChange(e)}
                            />
                            <div>
                                <button type='submit' className='border-[1px] border-[#3C93FF] px-2 py-2 rounded-md  w-[6rem] bg-[#3C93FF] text-white'>Create user</button>

                            </div>
                        </div>
                    </form>
                    {/* edit */}
                    <form onSubmit={() => updateUser(userEdit.id)} className='mt-5'>
                        <div className='flex items-center'>
                            <Input className='border-[1px] border-black p-1 px-2 mx-1'
                                type="text" value={userEdit.name} name='name'
                                onChange={(e) => handleChangeEdit(e)}
                            />
                            <Input className='border-[1px] border-black p-1 mx-1'
                                type="number" value={userEdit.age} name='age'
                                onChange={(e) => handleChangeEdit(e)}
                            />
                            <div>
                                <button type='submit' className='border-[1px] border-[#3C93FF] px-2 py-2 rounded-lg  w-[6rem] bg-[#3C93FF] text-white'>Save change</button>

                            </div>

                        </div>
                    </form>

                </div>
                <div className='mt-5'>
                    <Table dataSource={users} columns={columns} />

                </div>
            </div>

        </div>
    )
}

export default Homepage