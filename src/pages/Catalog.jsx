import React, { useState } from 'react'
import Header from '../components/Header'
import AsideCatalog from '../components/AsideCatalog'
import Footer from '../components/Footer'
import MainProducts from '../components/MainProducts'

function Catalog() {
    const [category, setCategory] = useState('Барлығы')
  return (
    <>
    
    <Header className="flex top-0 bg-[#534239] items-center p-6 pl-20 pr-20 justify-between fixed  w-full z-100 transition duration-700 ease-in-out"/>

    <main className=' min-h-[100vh] flex'>
        <AsideCatalog setCategory={setCategory} category={category}/>
        <MainProducts categoryFilter={category}/>
    </main>

    <Footer/>
    
    </>
  )
}

export default Catalog