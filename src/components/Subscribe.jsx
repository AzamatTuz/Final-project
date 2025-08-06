import React from 'react'

function Subscribe() {
  return (
    <section className='mt-20 flex gap-10 flex-col items-center mb-30'>
        <h1 className='text-5xl font-bold'>Соңғы жаңалықтарға тіркелу</h1>
        <p className='text-3xl'>Соңғы жаңалықтарды немесе жаңа тауарларды жіберіп алмаңыз</p>
        <article className='w-full relative'>
            <input className='bg-[#534239] outline-none placeholder:text-[#A98467] text-[#A98467] w-full p-4 rounded-full pl-8' placeholder='Электронды почтаңызды жазыңыз' type="text" />
            <button className='cursor-pointer bg-[#ADC178] text-[#534239] p-4 pl-12 pr-12 rounded-full absolute top-0 right-0 font-semibold'>Тіркелу</button>
        </article>
    </section>
  )
}

export default Subscribe