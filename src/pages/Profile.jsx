import React from 'react'
import Header from '../components/Header'
import ProfileMain from '../components/ProfileMain'
import Footer from '../components/Footer'

function Profile() {
  return (
    <>

        <Header className='flex top-0 bg-[#534239] items-center p-6 pl-20 pr-20 justify-between fixed  w-full z-100 transition duration-700 ease-in-out'/>
        <ProfileMain/>
        <Footer/>
    </>
  )
}

export default Profile


