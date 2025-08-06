import React from 'react'

function Procces(props) {
  return (
    <article className='flex flex-col w-150'>
        <div className='flex items-center justify-between'>
            <h1 className='text-[#D5BDB1] customFont text-[275px] leading-none'>{props.number}</h1>
            <img className='w-60 ' src={props.image} alt="" />
        </div>
        <div className='ml-5'>
            <h1 className='text-[#534239] text-3xl font-bold w-120'>{props.text}</h1>
            <p className='text-xl text-[#A98467]'>{props.pText} <span className='text-[#ADC178]'>{props.span}</span></p>
        </div>
    </article>
  )
}

export default Procces