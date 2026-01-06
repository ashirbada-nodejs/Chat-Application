import React from 'react'
import { IoMdSearch } from "react-icons/io";
import OtherUsers from './OtherUsers';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { setAuthUser, setOtherUsers } from '../redux/userSlice';

export default function Sidebar() {
    const [search,setSearch]  = useState("");
    const {otherUsers} = useSelector(store=>store.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const logoutHandler = async (req,res)=>{
            try {
                const res = await axios.get("http://localhost:8080/api/v1/user/logout");
                console.log(res);
                navigate("/login");
                toast.success(res.data.message);
                dispatch(setAuthUser(null))
            } catch (error) {
                console.log(error);
            }
    }
    const searchSubmitHandler = (e)=>{
            e.preventDefault();
            const conversationUser = otherUsers?.find(user =>
  user.fullName.toLowerCase().includes(search.toLowerCase())
);
            if(conversationUser){
                dispatch(setOtherUsers([conversationUser]));
            }else{
                toast.error("User not found")
            }
    }
    return (
    <div className='border-r border-slate-500 p-4 flex flex-col'> 
        <form onSubmit={searchSubmitHandler} className='flex items-center gap-2'>
        <input className='input input-bordered rounded-md' value={search} onChange={(e)=>setSearch(e.target.value)} type='text' placeholder='search...'/>
        <button type='submit' className='btn btn-circle bg--zinc-500'>
            <IoMdSearch className='w-6 h-6 outline-none'/>
        </button>
        </form>
        <div className="divider px-3"></div>
        <OtherUsers/>
        <div className='mt-2'>
            <button onClick={logoutHandler} className='btn btn-sm'>Logout</button>
        </div>
    </div>
  )
}
