
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import AuthContext from './AuthContext'
import { useNavigate } from 'react-router-dom'

function Login() {
    const[login, setLogin] = useState()
    const[password, setPassword] = useState()
    const[isClick, setIsClick] = useContext(AuthContext)
    const[errorMessage, setErrorMeassage] = useState('')
    const[token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '')
    const navigate = useNavigate()

async function handleSubmit(e) {
    e.preventDefault();
    
    if (!login.trim() || !password.trim()) {
      return setErrorMeassage('Барлық жолдар толтырылуы керек!!!');
      
    }
        

    try {
      const result =  await axios.post('https://peer2p-back.onrender.com/login', {login, password})
      
      if (!result.data.token) {
        setErrorMeassage(result.data.message)
      } else {
        setToken(result.data.token)
        navigate('/')
      }
      
    } catch (error) {
      console.error(error);
      
    }

  }

    useEffect(()=>{
        localStorage.setItem('token', token)
    },[token])


   const inputStyle = 'bg-[#ADC178] border-none outline-none text-white pl-8 p-3 rounded-full placeholder:text-white'
    const btnStyle = 'bg-white p-4 w-[47%] rounded-full font-semibold flex items-center gap-8 shadow-2xl' 
  return (
    <form className='flex flex-col w-[25%] gap-[35px] p-10 pl-20 pr-20' onSubmit={handleSubmit}>
        <h1 className='text-[#534239] text-4xl font-bold text-center'>Кіру</h1>
        <p className='text-[#534239] text-3xl text-center'>Жалғастыру үшін аккунтқа кіріңіз</p>
        <input onChange={(e) => setLogin(e.target.value.trim())} type="text" className={inputStyle} placeholder='Есіміңіз немесе почтаңыз. . .'/>
        <input onChange={(e) => setPassword(e.target.value.trim())} type="password" className={inputStyle} placeholder='Құпия сөз . . .'/>
        <div className='flex justify-between '>
            <button className={btnStyle}><img className='w-8' src="/images/devicon_google.png" alt="" />Google арқылы</button>
            <button className={btnStyle}><img className='w-8' src="/images/Vectorв.png" alt="" />Vk арқылы</button>
        </div>
        {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
        <button className={`${inputStyle} font-bold text-2xl text-center authBtn`}><p className='z-3 relative'>Кіру</p></button>
        <p className='text-[#534239] text-xl text-center'>Аккаунтыңыз жоқпа ? <span className='decoration cursor-pointer auth-span' onClick={() => setIsClick(!isClick)}>Тіркелу</span></p>
    </form>
  )
}

export default Login