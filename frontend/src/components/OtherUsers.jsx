import React from 'react'
import OtherUser from "./OtherUser";
import useGetOtherUsers from '../hooks/useGetOtherUsers';
import { useSelector } from 'react-redux';
export default function OtherUsers() {
    // my custom hook
    useGetOtherUsers();
    const {otherUsers} = useSelector(store => store.user);
    if(!OtherUsers) return;
    return (
    <div className='overflow-auto flex-1'>
        {
            otherUsers?.map((user)=>{
                return ( <OtherUser key={user._id} user={user}/> )
            })
        }
    </div>
    )
}
