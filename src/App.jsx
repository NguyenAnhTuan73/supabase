import React, { useEffect, useState } from 'react';
import { SignUp, Login, Homepage } from './pages';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const App = () => {
  const [token, setToken] = useState(false);

  if (token) {
    window.localStorage.setItem('token', JSON.stringify(token));
  }

  useEffect(() => {
    if (window.localStorage.getItem('token')) {
      let data = JSON.parse(window.localStorage.getItem('token'));
      setToken(data.ses);
    }
  }, [])

  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Login setToken={setToken} />} />
          <Route path='/signup' element={<SignUp />} />
           <Route path='/home' element={<Homepage token={token} />} /> 
        </Routes>
      </Router>

    </div>
  )
}

export default App