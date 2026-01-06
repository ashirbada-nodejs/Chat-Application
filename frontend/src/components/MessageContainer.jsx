import React, { useEffect } from 'react'
import SendInput from './SendInput'
import Messaegs from './Messaegs'
import { useDispatch, useSelector } from 'react-redux'
import {setSelectedUser} from "../redux/userSlice"

export default function MessageContainer() {
  const {selectedUser,authUser,onlineUsers} = useSelector(store=>store.user);
  const dispatch = useDispatch();

  const isOnline = onlineUsers.includes(selectedUser._id);
  return (
    <>
    {selectedUser !== null ? (
      <div className='md:min-w-[550px] flex flex-col'>
      <div className='flex gap-2 items-center  text-white bg-zinc-800 px-4 py-2 mb-2'>
        <div className={`avatar ${isOnline ? 'online' : ''}`}>
            <div className='w-12 rounded-full'>
                <img src={selectedUser?.profilePhoto} alt='user-profile'></img>
            </div>
        </div>
        <div className='flex flex-col flex-1'>
            <div className='flex justify-between gap-2'>
                <p>{selectedUser?.fullName}</p>
            </div>
        </div>
      </div>
      <Messaegs/>
      <SendInput/>
    </div>
    ):(<div className='md:min-w-[550px] flex flex-col justify-center items-center'>
      <h1 className='text-4xl text-white font-bold'> Hi,{authUser?.fullName}</h1>
      <h1 className='text-2xl text-white'>let's start conversation</h1>
    </div>
    ) }
    </>
    
  )
}
