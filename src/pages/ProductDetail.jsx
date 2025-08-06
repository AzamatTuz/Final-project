import React from 'react'
import Footer from '../components/Footer'
import ProductDetailMain from '../components/ProductDetailMain'
import Header from '../components/Header'

function ProductDetail() {
  return (
    <>
    <Header className="flex top-0 bg-[#534239] items-center p-6 pl-20 pr-20 justify-between fixed  w-full z-100 transition duration-700 ease-in-out"/>
      <ProductDetailMain/>
    <Footer/>
    </>
  )
}

export default ProductDetail