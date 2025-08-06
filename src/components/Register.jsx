import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import AuthContext from './AuthContext'
import { useNavigate } from 'react-router-dom'

function Register() {
  
  const[name, setName] = useState()
  const[email, SetEmail] = useState()
  const[password, setPassword] = useState()
  const[secPassword, setSecPassword] = useState()
  const[isClick, setIsClick] = useContext(AuthContext)
  const[errorMessage, setErrorMesage] = useState()
  const[token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '')
  const navigate = useNavigate()

async function handleSubmit(e) {
    e.preventDefault();
    
    if (!name || !email || !password || !secPassword) {
      return setErrorMesage('Барлық жолдар толтырылуы керек!!!');
      
    }

    if (password !== secPassword) {
      setErrorMesage('Құпия сөздер сәйкес келмиді!!!');
      return
    } else if(password.length < 8) {
      return setErrorMesage('Құпия сөз 8 симолдан көп болуы керек!!!')
    }

    if (!email.includes('@')) {
      setErrorMesage('@ символын ұмытып кеттіңіз!!!');
      return
    }

    try {
      const result = await axios.post('https://peer2p-back.onrender.com/register', {name, email, password})
      console.log(result.data);
      
      if (result.data.message === 'User registred') {
        setToken(result.data.token)
        navigate('/')
      } else {
        setErrorMesage(result.data)
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
    <form className='flex flex-col w-[25%] gap-[35px]  pl-20 pr-20' onSubmit={handleSubmit}>
        <h1 className='text-[#534239] text-4xl font-bold text-center'>Тіркелу</h1>
        <p className='text-[#534239] text-3xl text-center'>Жалғастыру үшін тіркеліңіз</p>
        <input onChange={(e) => setName(e.target.value.trim())} type="text" className={inputStyle} placeholder='Есіміңіз . . .'/>
        <input onChange={(e) => SetEmail(e.target.value.trim())} type="text" className={inputStyle} placeholder='Почтаңыз . . .'/>
        <input onChange={(e) => setPassword(e.target.value.trim())} type="password" className={inputStyle} placeholder='Құпия сөз . . .'/>
        <input onChange={(e) => setSecPassword(e.target.value.trim())} type="password" className={inputStyle} placeholder='Құпия сөзді тексеру . . .'/>
        <div className='flex justify-between '>
            <button className={btnStyle}><img className='w-8' src="public/images/devicon_google.png" alt="" />Google арқылы</button>
            <button className={btnStyle}><img className='w-8' src="public/images/Vectorв.png" alt="" />Vk арқылы</button>
        </div>
        {errorMessage && <p className='text-red-500 '>{errorMessage}</p>}
        <button className={`${inputStyle} authBtn mt-[-10px] font-bold text-2xl text-center cursor-pointer`}><p className=' relative z-3'>Тіркелу</p></button>
        <p className='text-[#534239] text-xl  text-center mt-[-20px]'>Аккаунтыңыз барма ? <span className='decoration-solid cursor-pointer auth-span' onClick={() => setIsClick(!isClick)}>Кіру</span></p>
    </form>
  )
}

export default Register