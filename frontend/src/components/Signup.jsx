import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';


export default function Signup() {
  const [user,setuser] = useState({
      fullName : "",
      username : "",
      password : "",
      confirmPassword : "",
      gender : ""
  });
  const navigate = useNavigate();
  const handleCheckbox = (gender)=>{
    setuser({...user,gender:gender})
  }
  const onSubmitHandler =async (e)=>{
    e.preventDefault();
    // console.log(user);
    try {
      const response = await axios.post("http://localhost:8080/api/v1/user/register",user , {
        headers : {
          'Content-Type' : 'application/json'
        },
        withCredentials : true
      });
      if(response.data.success){
        navigate("/login");
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    // after submitting file is empty
    setuser({
      fullName : "",
      username : "",
      password : "",
      confirmPassword : "",
      gender : ""
    })
  }
  return (
    <div className='min-w-96 mx-auto'>
      <div className="w-full p-6 rpund-lg shadow-md bg-grey-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100">
      <h1 className='text-3xl font-bold text-center text-grey-300'>Signup</h1>
      <form action="" onSubmit={onSubmitHandler}>
        <div>
        <label className='label p-2'>
          <span className='text-base label-text'>Fullname</span>
        </label>
        <input value={user.fullName} onChange={(e)=>setuser({...user,fullName:e.target.value})} className="w-full input input-bordered h-10" type="text" placeholder="full name"/>
        </div>
        <div>
        <label className='label p-2'>
          <span className='text-base label-text'>Username</span>
        </label>
        <input value={user.username} onChange={(e)=>setuser({...user,username:e.target.value})} className="w-full input input-bordered h-10" type="text" placeholder="username"/>
        </div>
        <div>
        <label className='label p-2'>
          <span className='text-base label-text'>Password</span>
        </label>
        <input value={user.password} onChange={(e)=>setuser({...user,password:e.target.value})} className="w-full input input-bordered h-10" type="password" placeholder="password"/>
        </div>
        <div>
        <label className='label p-2'>
          <span className='text-base label-text'>Confirm Password</span>
        </label>
        <input value={user.confirmPassword}  onChange={(e)=>setuser({...user,confirmPassword:e.target.value})} className="w-full input input-bordered h-10" type="password" placeholder="confirm-password"/>
        </div>
        <div className='flex items-center mx-4 mt-2'>
          <div className='flex items-center'>
            <p>Male : </p>
            <input  type="checkbox"  checked={user.gender === "male"} onChange={()=>handleCheckbox("male")} defaultChecked className="checkbox mx-2" />
          </div>
          <div className='flex items-center'>
            <p>Female : </p>
            <input  type="checkbox" checked={user.gender === "female"} onChange={()=>handleCheckbox("female")} defaultChecked className="checkbox mx-2" />
          </div>
        </div>
        <p className='text-center mt-2'>
          <Link to="/login">
            Already have an account?signin
          </Link>
        </p>
        <div>
          <button type='submit' className='btn btn-block btn-sm mt-2 border-slate-700'>Signup</button>
        </div>
      </form>
      </div>
    </div>
  )
}
