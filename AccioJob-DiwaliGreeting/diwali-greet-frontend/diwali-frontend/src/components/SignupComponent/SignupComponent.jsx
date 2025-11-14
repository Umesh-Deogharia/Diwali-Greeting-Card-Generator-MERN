import React, { createContext } from 'react'
import { useState } from 'react'
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { useNavigate } from 'react-router-dom';
function SignupComponent() {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const apiVersion = import.meta.env.VITE_APP_API_VERSION;
    const [inputClicked, setInputClicked] = useState({
        name: false,
        email: false,
        userName: false,
        password: false
    });
    const [showPassword, setShowPassoword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [firstName, setName] = useState("");
    const [userLastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const myContext = createContext()

    const handleSignUp = async () => {
        try {
            setError("")
            setLoading(true);
            const result = await axios.post(`${apiUrl}/${apiVersion}/user/createUser`, { firstName, lastName:userLastName, email, password }, { withCredentials: true });
            console.log(result?.data);
            if(result?.data?.Status) navigate("/")
            setLoading(false);
        }
        catch (err) {
            console.log(err);
            setError(err?.response?.data?.Message)
            // console.log("Error",error);
            // console.log("ErrorCdddd", err?.response?.data?.message);
            setLoading(false);
        }
    }

    return (
        <div className='h-screen w-full bg-linear-to-b from-black to-gray-900 flex flex-col justify-center items-center'>
            <div className='w-[90%] lg:max-w-[60%] h-[600px] bg-white rounded-2xl flex justify-center items-center overflow-hidden border-2 border-[#1a1f23]'>
                <div className='w-full lg:w-[50%] h-full bg-white flex flex-col items-center p-[10] gap-5'>
                    <div className='flex gap-2.5 items-center text-[20px] font-semibold mt-10'>
                        <span>Sign Up to Diwali Grettings</span>
                    </div>
                    <div className='relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl mt-[30px] border-2 border-black' onClick={() => setInputClicked({ ...inputClicked, name: true })}>
                        <label htmlFor="name" className={`absolute text-gray-700 left-5 p-[5px] bg-white text-[15px] ${inputClicked.name ? "top-[-18px]" : ""}`}>Enter First Name</label>
                        <input type="text" id="name" value={firstName} onChange={(e) => setName(e.target.value)} className='w-full h-full rounded-2xl px-5 outline-none border-0' required />
                    </div>
                    <div className='relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl  border-2 border-black' onClick={() => setInputClicked({ ...inputClicked, userName: true })}>
                        <label htmlFor="username" className={`absolute text-gray-700 left-5 p-[5px] bg-white text-[15px] ${inputClicked.userName ? "top-[-18px]" : ""}`}>Enter Last Name</label>
                        <input type="text" id="username" value={userLastName} onChange={(e) => setLastName(e.target.value)} className='w-full h-full rounded-2xl px-5 outline-none border-0' required />
                    </div>
                    <div className='relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl  border-2 border-black' onClick={() => setInputClicked({ ...inputClicked, email: true })}>
                        <label htmlFor="email" className={`absolute text-gray-700 left-5 p-[5px] bg-white text-[15px] ${inputClicked.email ? "top-[-18px]" : ""}`}>Enter Email</label>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className='w-full h-full rounded-2xl px-5 outline-none border-0' required />
                    </div>
                    <div className='relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl border-2 border-black' onClick={() => setInputClicked({ ...inputClicked, password: true })}>
                        <label htmlFor="pass" className={`absolute text-gray-700 left-5 p-[5px] bg-white text-[15px] ${inputClicked.password ? "top-[-18px]" : ""}`}>Enter Password </label>
                        <input type={showPassword ? "text" : "password"} id="pass" value={password} onChange={(e) => setPassword(e.target.value)} className='w-full h-full rounded-2xl px-5 outline-none border-0' required />
                        {showPassword ? <IoIosEye className='absolute cursor-pointer right-[25px] w-[25px] h-[25px]' onClick={() => setShowPassoword(false)} /> :
                            <IoIosEyeOff onClick={() => setShowPassoword(true)} className='absolute cursor-pointer right-[25px] w-[25px] h-[25px]' />}
                    </div>
                    <div>
                        <p className='text-red-600 font-extrabold'>{error} </p>
                    </div>
                    <button className={`w-[70%] px-5 py-2.5 bg-black text-white font-semibold h-[50px] cursor-pointer rounded-2xl mt-[30px] ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-black text-white cursor-pointer'}`} onClick={handleSignUp} disabled={loading}>{loading ? <ClipLoader color='white' size={30} /> : "Sign Up"}</button>
                    <p className='cursor-pointer text-gray-800' onClick={() => navigate("/login")}>Already Have An Account ? <span className='border-b-2 border-b-black pb-[3px] text-black '>Sign In</span></p>
                </div>
                
            </div>
        </div>
    )
}

export default SignupComponent;