import React from 'react'
import Sidebar from "./Sidebar";
import MessageContainer from "./MessageContainer";
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function HomePage() {
  const { authUser } = useSelector(store => store.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!authUser) {
      navigate("/login");
    }
  }, []);
  return (
    <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-grey-400 bg-clip-padding backdrop:filter backdrop-blur-lg bg-opacity-0'>
      <Sidebar/>
      <MessageContainer/>
    </div>
  )
}
