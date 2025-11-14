import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const apiVersion = import.meta.env.VITE_APP_API_VERSION;
  const navigate = useNavigate();
  const logOut = async () => {
    try {
      
      const fetch = await axios.post(`${apiUrl}/${apiVersion}/user/logout`, { withCredential: true });
      navigate("/login");
      console.log(fetch);
    } catch (err) {
      res.status(500).json({ message: err });
    }
    // console.log("Umesj");
  }
  return (
    <div className='h-23 border border-black flex items-center justify-between px-5 bg-red-400'>
          <h1 className='font-bold text-4xl'>Acciojob</h1>
          <button onClick={logOut} className='font-bold text-2xl bg-teal-300 px-2 py-1 rounded-xl'>Log Out</button>
    </div>
  )
}

export default Navbar
