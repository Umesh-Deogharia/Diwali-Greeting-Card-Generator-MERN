import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import axios from 'axios';
import { Spinner } from "@heroui/spinner";
// import DropDown from '../DropDown';

const LandingPage = () => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const apiVersion = import.meta.env.VITE_APP_API_VERSION;
    const [geminiResult, setGeminiResult] = useState('');
    const [geminiValue, setGeminiValue] = useState({ name: "", language: "English", tone: "Informal" });
    const handleChange = (e) => {
        // console.log(e.target.value);
        setGeminiValue({ ...geminiValue, [e.target.name]: e.target.value });
    }

    // console.log(geminiValue);
    const handleClick = async () => {
        try {
            const geminiRes = await axios.post(`${apiUrl}/${apiVersion}/gemini/generate`,
                { name: geminiValue.name, language: geminiValue.language, tone: geminiValue.tone },
                {
                    withCredentials: true,
                }
            );
            setGeminiResult(geminiRes?.data?.data);
            // console.log(geminiRes);
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <>

            <Navbar />
            <div className='h-screen w-full bg-linear-to-b from-green-600 to-yellow-900 flex flex-col justify-center items-center'>
                    <h1 className='-mt-20 text-white text-4xl font-bold mb-15 text-center'>Generate Your Own Diwali Greeting Card</h1>
                <div className='px-5 w-[90%] lg:max-w-[60%] h-[600px] bg-white rounded-2xl flex justify-center items-center flex-col md:flex-row overflow-hidden border-2 border-[#1a1f23]'>
                    <div className='flex flex-col items-center w-[50%] justify-center'>
                        <input className='h-12  w-55 md:w-80 border py-5 px-5 mt-14 mb-4 rounded-lg' type="text" name="name" id="" onChange={handleChange} />
                        <h3 className='text-2xl font-bold'>Dear, {geminiValue.name} </h3>
                        <div className='pt-8 flex gap-4'>
                            <select name="language" id="" onChange={handleChange} className='font-bold bg-purple-300 w-40 p-4 rounded-2xl'>
                                <option value="English" className='bg-green-400 rounded-2xl font-bold text-white '>English</option>
                                <option value="Bengali" className='bg-green-400 rounded-2xl font-bold text-white '>Bengali</option>
                                <option value="Hindi" className='bg-green-400 rounded-2xl font-bold text-white '>Hindi</option>
                            </select>
                            <select name="tone" id="" onChange={handleChange} className='w-40 bg-gray-400 font-bold p-4 rounded-2xl'>
                                <option value="Formal" className='bg-green-400 rounded-2xl font-bold text-white '>Formal</option>
                                <option value="Informal" className='bg-green-400 rounded-2xl font-bold text-white '>Informal</option>
                            </select>
                        </div>
                        <div className='bg-amber-400 h-10 '>
                        </div>
                        <button onClick={() => handleClick()} className='px-10 py-3 text-xl  bg-blue-300 font-bold rounded-lg flex '>Try</button>
                    </div>
                    <div className='p-2 border-2 w-[90%] md:w-[40%]  min-h-60 my-auto mx-auto flex justify-center items-center'>
                        <span className='m-2'>{geminiResult} </span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LandingPage
