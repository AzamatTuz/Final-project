import React from 'react'
import Header from '../components/Header'
import NotificationMain from '../components/Notification/NotificationMain'

function Notifications() {
  return (
    <>
    
    <Header className="flex top-0 bg-[#534239] items-center p-6 pl-20 pr-20 justify-between fixed  w-full z-100"/>
    <NotificationMain/>
    </>
  )
}

export default Notifications