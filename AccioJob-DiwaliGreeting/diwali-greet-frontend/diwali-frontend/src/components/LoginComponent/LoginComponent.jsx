import { ClipLoader } from "react-spinners";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginComponent() {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const apiVersion = import.meta.env.VITE_APP_API_VERSION;
  const navigate = useNavigate();
  const [inputClicked, setInputClicked] = useState({
    name: false,
    email: false,
    // userName: false,
    password: false
  });
  const [showPassword, setShowPassoword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // const dispatch = useDispatch();

  const [value, setValue] = useState({
    email: "",
    password: "",
  });
  const handleChange = (prop) => (event) => {
    setValue({ ...value, [prop]: event.target.value });
  };

  const handleSignIn = async () => {
    console.log(userEmail);
    console.log(password);
    try {
      // if(!userEmail||!password)return
      setError("")
      setLoading(true);
      const result = await axios.post(`${apiUrl}/${apiVersion}/user/login`, { email:userEmail, password:password }, { withCredentials: true });
      console.log(result.data);
      setLoading(false);
      if (result.data.success) {
        navigate('/');
      }
    }
    catch (err) {
      setError(err?.response?.data?.Message);
      console.log(err);
      setLoading(false);
    }
  }
  return (
  
    <div className='h-screen w-full bg-linear-to-b from-black to-gray-900 flex flex-col justify-center items-center'>
      <div className='w-[90%] lg:max-w-[60%] h-[600px] bg-white rounded-2xl flex justify-center items-center overflow-hidden border-2 border-[#1a1f23]'>

        <div className='w-full lg:w-[50%] h-full bg-white flex flex-col justify-center items-center p-[10] gap-5'>
          <div className='flex gap-2.5 items-center text-[20px] font-semibold mt-10'>
            <span>Sign In to Diwali Grettings</span>
          </div>
          <div className='relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl  border-2 border-black' onClick={() => setInputClicked({ ...inputClicked, userEmail: true })}>
            <label htmlFor="userEmail" className={`absolute text-gray-700 left-5 p-[5px] bg-white text-[15px] ${inputClicked.userEmail ? "top-[-18px]" : ""}`}>Enter Email</label>
            <input type="email" id="userEmail" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} className='w-full h-full rounded-2xl px-5 outline-none border-0' required />
          </div>
          <div className='relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl border-2 border-black' onClick={() => setInputClicked({ ...inputClicked, password: true })}>
            <label htmlFor="pass" className={`absolute text-gray-700 left-5 p-[5px] bg-white text-[15px] ${inputClicked.password ? "top-[-18px]" : ""}`}>Enter Password </label>
            <input type={showPassword ? "text" : "password"} id="pass" value={password} onChange={(e) => setPassword(e.target.value)} className='w-full h-full rounded-2xl px-5 outline-none border-0' required />
            {showPassword ? <IoIosEye className='absolute cursor-pointer right-[25px] w-[25px] h-[25px]' onClick={() => setShowPassoword(false)} /> :
              <IoIosEyeOff onClick={() => setShowPassoword(true)} className='absolute cursor-pointer right-[25px] w-[25px] h-[25px]' />}
          </div>

          {/* 
      <div className='w-[90%] px-5 cursor-pointer' onClick={() => navigate("/forgot-password")}>Forgot Password?</div> */}
          <div>

            <p className='text-red-600 font-extrabold'>{error} </p>
          </div>
          <button className={`w-[70%] px-5 py-2.5 bg-black text-white font-semibold h-[50px] cursor-pointer rounded-2xl mt-[30px] ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-black text-white cursor-pointer'}`} type='button' onClick={handleSignIn} disabled={loading}>{loading ? <ClipLoader color='white' size={30} /> : "Sign In"}</button>
          <p className='cursor-pointer text-gray-800' onClick={() => navigate("/signup")}>Want to Create A New Account ? <span className='border-b-2 border-b-black pb-[3px] text-black '>Sign Up</span></p>
        </div>
      </div>
    </div>
  );
}
export default LoginComponent;
