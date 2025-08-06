import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function UserInfo({user, setIsClick, isClick}) {
    const [isClose, setIsClose] = useState(false)
    const navigate = useNavigate()

    function closeAccount() {
        localStorage.setItem('token', '')
        navigate('/')
    }



  return (
    <section className='flex gap-5 h-fit justify-around w-[75%] mt-5'>
        <article className='flex flex-col gap-3'>
            <h2 className='text-3xl font-bold flex items-center gap-2'>{user.username} <img className='w-10 h-10 p-3 rounded-full bg-[#ADC178]' src={user.is_verification ? '/images/galochka.png' : '/images/cancel.png'} alt="" /></h2>
            <h3 className='text-2xl font-medium'>{user.email}</h3>
            <h4 className='text-xl'>{user.phone_number ? `${user.phone_number}` : 'Телефон номер жоқ'}</h4>
            </article>
            <article className='flex flex-col justify-between items-center'>
            <span onClick={() => setIsClick(!isClick)} className='flex items-center text-2xl font-medium gap-3 hoverEffect'>Верификация жасау <img className='bg-[#ADC178] p-2 w-7 rounded-[100px]' src="/images/pen.png" alt="" /></span>
            <h3 className='text-2xl font-medium'>Тапқан ақша құны</h3> 
            <h1 className='text-center text-4xl font-extrabold'>{user.earned} тг</h1>
        </article>
        <article className='flex flex-col justify-between'>
            <button onClick={() => setIsClose(!isClose)} className='bg-red-500 text-white font-medium text-xl p-2 rounded cursor-pointer'>Шығу</button>
            <h3 className='text-2xl font-medium'>Жалға берген заттар</h3>
            <h1 className='text-center text-4xl font-extrabold'>{user.rented}</h1>
        </article>

        {isClose && <article className='close-window'>
            
            <div className='bg-white flex flex-col items-center gap-5 p-5 rounded-lg w-80'>
                <h1 className='font-semibold text-center text-xl'>Сіз шынымен шығайын деп жатсызба ?</h1>
                <div className='flex w-full gap-5'>
                    <button onClick={closeAccount} className='bg-[#ADC178] w-[50%] text-white p-2 rounded text-lg cursor-pointer'>Иә</button>
                    <button onClick={()=> setIsClose(!isClose)} className='bg-[#ADC178] w-[50%] text-white p-2 rounded text-lg cursor-pointer'>Жоқ</button>
                </div>
            </div>
            
        </article>}

    </section>
  )
}

export default UserInfo