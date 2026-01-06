import React, { useState } from 'react'
import { Link,useNavigate} from 'react-router-dom'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../redux/userSlice';


export default function Login() {
     const [user,setuser] = useState({
          username : "",
          password : "",
      });
      const dispatch = useDispatch();
    const navigate = useNavigate();
      const onSubmitHandler =async(e)=>{
        e.preventDefault();
            try {
              const response = await axios.post("http://localhost:8080/api/v1/user/login",user,{
                headers : {
                  'Content-Type' : 'application/json'
                },
                withCredentials : true
              });
                toast.success("Login successful!");
                navigate("/");
                console.log(response);
                dispatch(setAuthUser(response.data));
            } catch (error) {
                toast.error(error.response.data.message);
              console.log(error);
        }
        // after submitting file is empty
        setuser({
          username : "",
          password : "",
        })
      }
  return (
    <div className='min-w-96 mx-auto'>
      <div className="w-full p-6 rpund-lg shadow-md bg-grey-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100">
      <h1 className='text-3xl font-bold text-center text-grey-300'>Login</h1>
      <form action="" onSubmit={onSubmitHandler}>
        <div>
        <label className='label p-2'>
            <span className='text-base label-text'>Username</span>
        </label>
        <input className="w-full input input-bordered h-10" value={user.username} onChange={(e)=>setuser({...user,username : e.target.value})} type="text" placeholder="username"/>
        </div>
        <div>
        <label className='label p-2'>
            <span className='text-base label-text'>Password</span>
        </label>
        <input className="w-full input input-bordered h-10" value={user.password} onChange={(e)=>setuser({...user,password : e.target.value})} type="password" placeholder="password"/>
        </div>
        <p className='text-center mt-2'>
            <Link to="/register">
            Don't have an account?Signup
            </Link>
        </p>
        <div>
            <button type="submit" className='btn btn-block btn-sm mt-2 border-slate-700'>login</button>
        </div>
        </form>
        </div>
    </div>
  )
}
