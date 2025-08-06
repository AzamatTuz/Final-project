import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Layout() {
  const token = localStorage.getItem('token') ? localStorage.getItem('token') : null
  const [message, setMessage] = useState()
  const navigate = useNavigate()
  async function IsJoined() {
    try {
      const result = await axios.get('https://peer2p-back.onrender.com/profile', {
                headers: {
                    "authorization": `Bearer ${token}`,
                },
            })
      console.log(result.data);
      if (result.data[0].id > 0 && result.data[0].is_verification) {
        navigate('/addproduct')
      } else {
        console.log(1212);
        
      }
      
    } catch (error) {
      console.error(error.status);
      if (error.status == 403) {
        setMessage('Бірінші тіркеліңіз')

        setTimeout(() => {
          setMessage()
        }, 3000)
      }
    }
  }

  return (
    <>
    <section className='absolute top-50 left-40 flex flex-col gap-5'>
        <h1 className='text-5xl font-extrabold text-[#534239] w-150 leading-15'>Сенімді жалға алу – оңай әрі қауіпсіз!</h1>
        <p className='text-2xl font-medium w-120 text-[#534239]'>Жақын маңнан керек дүниеңізді тауып, уақытша пайдаланыңыз – үнемді, ыңғайлы және сенімді.</p>
        <article className='flex gap-10 mt-10 '>
            <Link to={'/catalog'} className='bg-[#534239] text-white p-2 w-60 text-center rounded-[15px] transition duration-300 ease-in-out hover:bg-[#3C302A]'>Тауарларды қарау</Link>
            <button onClick={IsJoined} className='cursor-pointer bg-[#534239] text-white p-2.5 w-60 text-center rounded-[15px] transition duration-300 ease-in-out hover:bg-[#3C302A]'>Жалға беру</button>
        </article>
    </section>

     <div className={`message ${message ? 'right-3' : 'right-[-350px] '} `}>
      
        <p className='text-center p-5 text-2xl font-medium'>{message}</p>

        <div className={message && 'lineAnimation'}></div>
      
      </div>
    </>
  )
}

export default Layout