import React from 'react'
import Header from '../components/Header'
import ProfileMain from '../components/ProfileMain'
import FavoriteMain from '../components/Favourite/FavoriteMain.jsx'
import Footer from '../components/Footer.jsx'

function Favorite() {
  return (
    <>

        <Header className="flex top-0 bg-[#534239] items-center p-6 pl-20 pr-20 justify-between fixed  w-full z-100"/>
        <FavoriteMain/>
        <Footer/>
    </>
  )
}

export default Favorite