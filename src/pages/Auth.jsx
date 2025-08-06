import React, { useState } from 'react'
import Register from '../components/Register'
import Login from '../components/Login'
import AuthContext from '../components/AuthContext'
import SakuraFall from '../components/SakuraFall'
import "./Test.css"

function Auth() {
  
  const [isClick, setIsClick] = useState(true)

  console.log(isClick);
  
  
  return (
    <>
    <AuthContext.Provider value={[isClick, setIsClick]}>
      <main className='overflow-hidden relative h-screen'>
        <section className={`h-screen relative z-10 bg-white w-[200%] flex items-center justify-between animated  ${isClick ? 'left-[50%]' : 'left-[-150%]'}`}>
          <Login/>
          <Register/>
        </section>
        <SakuraFall/>
        <img className={`absolute animated top-0 h-[112%] ${isClick ? 'left-0' : 'left-[50%]'}`} src="public/images/bg1.jpg" alt="" />
    </main>
    </AuthContext.Provider>
    </>
  )
}

export default Auth