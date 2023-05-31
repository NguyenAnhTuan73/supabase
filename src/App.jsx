import React, { useState, useEffect } from 'react';
import supabase from './config/supabaseClient';
import 'antd/dist/reset.css';
import './app.css';
const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({
    name: '', age: ''
  })
  const [userEdit, setUserEdit] = useState({
    id: '', name: '', age: ''
  })
  console.log("🚀 ~ file: App.jsx:6 ~ App ~ users:", userEdit)

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
  const delUser = async (id) => {
    const { data, error } = await supabase.from('users').delete().eq('id', id);
    fetchUsers();
    if (error) {
      console.log(error);
    }
    if (data) {
      console.log(data);
    }
  }
  // edit user

  const editUser = async (userId) => {
    users?.map((user) => {
      if (user.id === userId) {
        setUserEdit({ name: user.name, age: user.age, id: user.id });
      }

    })


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
      {/* edit */}
      <form onSubmit={() => updateUser(userEdit.id)} className='mt-5'>
        <input className='border-[1px] border-black p-1 px-2 mx-1' type="text" defaultValue={userEdit.name} name='name'
          onChange={(e) => handleChangeEdit(e)}
        />
        <input className='border-[1px] border-black p-1 mx-1' type="number" defaultValue={userEdit.age} name='age'
          onChange={(e) => handleChangeEdit(e)}
        />
        <button type='submit' className='border-[1px] border-black px-2 py-1 rounded-sm'>Save change</button>
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
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.age}</td>
              <td>
                <button className='border-[1px] border-black p-1 px-3 mx-1 rounded-md'
                  onClick={() => delUser(user.id)}>Delete</button>
                <button className='border-[1px] border-black p-1 px-3 mx-1 rounded-md'
                  onClick={() => editUser(user.id)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  )
}

export default App