import React, { useState, useEffect } from 'react';
import supabase from './config/supabaseClient';
import 'antd/dist/reset.css';
import './app.css';
import { Button } from 'antd';
const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({
    name: '', age: ''
  })
  console.log("🚀 ~ file: App.jsx:6 ~ App ~ users:", user)

  useEffect(() => {

    fetchUsers();
  }, [])

  const fetchUsers = async () => {
    const { data } = await supabase.from('users').select('*');
    setUsers(data)
  }
  const handleChange = (e) => {
    setUser(prevFormData => {
      return {
        ...prevFormData,
        [e.target.name]: e.target.value,

      }
    })
  }
  const createUser = async () => {
    await supabase.from('users').insert({ name: user.name, age: user.age })
  }
  const delUser = async (id) => {
    const {data, error} = await supabase.from('users').delete().eq('id', id);
    fetchUsers();
    if(error){
      console.log(error);
    }
    if(data){
      console.log(data);
    }
  }
  return (
    <div>
      <form onSubmit={createUser}>
        <input className='border-[1px] border-black p-1 px-2 mx-1' type="text" placeholder='Name' name='name'
          onChange={(e) => handleChange(e)}
        />
        <input className='border-[1px] border-black p-1 mx-1' type="number" placeholder='Age' name='age'
          onChange={(e) => handleChange(e)}
        />
        <button type='submit' className='border-[1px] border-black px-2 py-1 rounded-sm'>Create user</button>

      </form>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>AGE</th>
            <th>ACITONS</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user, index) => (
            <tr key={index}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.age}</td>
              <td><button className='border-[1px] border-black p-1 px-3 rounded-md'
                onClick={() => delUser(user.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  )
}

export default App