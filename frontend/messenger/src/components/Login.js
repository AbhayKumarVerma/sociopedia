import React, { useState } from 'react';
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import { getUser } from '../redux/userSlice';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (isLogin) {
      // login
      try {
        const res = await axios.post(`${USER_API_END_POINT}/login`, { email, password }, {
          headers: {
            'Content-Type': "application/json"
          },
          withCredentials: true
        }); 
        dispatch(getUser(res?.data?.user));
        if(res.data.success){
          navigate("/");
          toast.success(res.data.message);
        }
      } catch (error) {
        toast.success(error.response.data.message);
        console.log(error);
      }
    } else {
      // signup
      try {
        const res = await axios.post(`${USER_API_END_POINT}/register`, { name, username, email, password }, {
          headers: {
            'Content-Type': "application/json"
          },
          withCredentials: true
        }); 
        if(res.data.success){
          setIsLogin(true);
          toast.success(res.data.message);
        }
      } catch (error) {
        toast.success(error.response.data.message);
        console.log(error);
      }
    }
  }


  const loginSignupHandler = () => {
    setIsLogin(!isLogin);
  }

  return (
    <div className='flex justify-center items-center w-screen h-screen'>
      <div className='flex items-center justify-evenly w-[80%]'>
        <div>
          <img className='ml-5' width={"500px"} src="https://imgs.search.brave.com/IrUxvc3niqpLy9DPCnnb9Zm0EU_IqvMzb2zTXOBMvXA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvZW4vdGh1bWIv/Mi8yMC9JbmRpYW5f/SW5zdGl0dXRlX29m/X0luZm9ybWF0aW9u/X1RlY2hub2xvZ3kl/MkNfTHVja25vd19M/b2dvLnBuZy81MTJw/eC1JbmRpYW5fSW5z/dGl0dXRlX29mX0lu/Zm9ybWF0aW9uX1Rl/Y2hub2xvZ3klMkNf/THVja25vd19Mb2dv/LnBuZw" alt="twitter-logo" />
        </div>
        <div>
          <div className='my-5'>
            <h1 className='text-6xl font-bold'>Happening now.</h1>
          </div>
          <h1 className='mt-4 mb-2 text-2xl font-bold'>{isLogin ? "Login" : "Singup"}</h1>
          <form onSubmit={submitHandler} className='flex flex-col w-[55%]'>
            {
              !isLogin && (<>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' className="px-3 py-2 my-1 font-semibold rounded-full border border-gray-800 outline-blue-500" />
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' className="px-3 py-2 my-1 font-semibold rounded-full border border-gray-800 outline-blue-500" />
              </>)
            }
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' className="px-3 py-2 my-1 font-semibold rounded-full border border-gray-800 outline-blue-500" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' className="px-3 py-2 my-1 font-semibold rounded-full border border-gray-800 outline-blue-500" />
            <button className='bg-[#1D9BF0] border-none py-2 my-4 rounded-full text-lg text-white'>{isLogin ? "Login" : "Create Account"}</button>
            <h1>{isLogin ? "Do not have an account?" : "Already have an account?"} <span onClick={loginSignupHandler} className='font-bold text-blue-600 cursor-pointer'>{isLogin ? "Signup" : "Login"}</span></h1>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
