import React from 'react'
import Header from '../components/Header'
import AddProductMain from '../components/AddProductMain'
import Footer from '../components/Footer'

function AddProduct() {
  return (
    <>
        <Header className="flex top-0 bg-[#534239] items-center p-6 pl-20 pr-20 justify-between fixed  w-full z-100 transition duration-700 ease-in-out"/>
        <AddProductMain/>
        <Footer/>
    </>
  )
}

export default AddProduct