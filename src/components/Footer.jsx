import React from 'react'
import FooterLink from './FooterLink'

function Footer() {
  return (
    <footer className='bg-[#534239] flex flex-col items-center pl-40 pr-20 p-7 gap-7'>
        <img src="public/images/logo.png" alt="" />
        <section className='grid grid-cols-4 w-full '>
            <article className='flex flex-col gap-4'>
                <h1 className='text-white text-2xl font-semibold'>Тауар</h1>
                <FooterLink text="Каталог" to=""/>
                <FooterLink text="Ұнағандар" to=""/>
                <FooterLink text="Жаңалар" to=""/>
            </article>
            <article className='flex flex-col gap-4'>
                <h1 className='text-white text-2xl font-semibold'>Компания</h1>
                <FooterLink text="Біз туралы" to=""/>
                <FooterLink text="Жаңалықтар" to=""/>
                <FooterLink text="Блогтар" to=""/>
            </article>
            <article className='flex flex-col gap-4'>
                <h1 className='text-white text-2xl font-semibold'>Көмек</h1>
                <FooterLink text="Көмектесу орталығы" to=""/>
                <FooterLink text="Статус" to=""/>
                <FooterLink text="Қате туралы хабарлау" to=""/>
            </article>
            <article className='flex flex-col gap-4'>
                <h1 className='text-white text-2xl font-semibold'>Аддрес</h1>
                <p className='text-white flex items-center gap-5'><img className='w-5' src="public/images/mail.png" alt="" />loremipsumov@gmail.com</p>
                <p className='text-white flex items-center gap-5'><img className='w-5' src="public/images/phone.png" alt="" />+7 700 700 7007</p>
                <p className='text-white flex items-center gap-5'><img className='w-5' src="public/images/map.png" alt="" />Мауленова 92</p>
            </article>
        </section>
        <hr className='w-full border-none outline-none h-[1px] bg-white'/>
        <section className='w-full flex justify-between'>
            <p className='text-white'>© 2024 Your Company. All Rights Reserved.</p>
            <article className='flex gap-5'>
                <img src="public/images/visa.png" alt="" />
                <img src="public/images/mastercard.png" alt="" />
            </article>
        </section>
    </footer>
  )
}

export default Footer