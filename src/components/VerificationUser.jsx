import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import IMask from 'imask';

function VerificationUser({ setIsClick, isClick, id }) {
    const [phone, setPhone] = useState('')
    const [cities, setCities] = useState([])
    const [cityId, setCityId] = useState()
    const [gender, setGender] = useState()
    const [age, setAge] = useState()
    const [errorMessage, setErrorMessage] = useState()
    const inputRef = useRef(null);
    

    async function getCities() {
        try {
            const result = await axios.get('https://peer2p-back.onrender.com/city')
            setCities(result.data)
            
        } catch (error) {
            console.error(error);
            
        }
    }
    
    useEffect(() => {
        getCities()
        const maskOptions = {
      mask: '+{7} (700) 000-00-00',
      lazy: false, 
    };

    const mask = IMask(inputRef.current, maskOptions);

    mask.on('accept', () => {
      setPhone(mask.value);
    })
    },[phone])

    async function handleSubmit(e) {
        e.preventDefault()
        
        if (!phone || !cityId|| !age || !gender) {
            return setErrorMessage('Барлық жолдар толтырылуы қажет!!!')
        }
        
        if (age > 100) {
            return setErrorMessage('Жасыңыз қате!!!')
        }

        try {
            const result = await axios.put('https://peer2p-back.onrender.com/verification', {id, phone, cityId, age, gender})
            
            if (result.data == 'Great') {
                setIsClick(!isClick)
            } else {
                setErrorMessage(result.data)
            }
            
        } catch (error) {
            console.error(error);
            
        }
        
    }
    
  return (
    <section  className='verif-window flex items-center justify-center '>
        <form onSubmit={handleSubmit} className='bg-white p-5 gap-5 flex flex-col rounded-2xl relative'>
            <button type='button' onClick={() => setIsClick(!isClick)} className='bg-[#ADC178] w-fit p-4 rounded-full cursor-pointer absolute top-[-20px] right-[-20px]'><img className='w-6' src="/images/cancel.png" alt="" /></button>
            <h1 className='text-center text-3xl font-medium'>Верификация</h1>
            <input ref={inputRef} placeholder="+7 (7__) ___-__-__" onChange={(e) => setPhone(e.target.value.toString())} className='bg-[#ADC178] text-white outline-none border-none placeholder:text-white p-3 w-100 rounded-xl' type="text" />
            <select className='bg-[#ADC178]  text-white outline-none border-none placeholder:text-white p-3 w-100 rounded-xl' onChange={(e) => setCityId(e.target.value)}>
                {cities.map((city) => 
                    <option className='bg-[#fff] text-black' key={city.id}  value={city.id}>{city.name}</option>
                )}
            </select>
            <input onChange={(e) => setAge(e.target.value)} className='bg-[#ADC178] text-white outline-none border-none placeholder:text-white p-3 w-100 rounded-xl' type="number" placeholder='Жасыңыз' />
            <p className='text-center font-medium text-2xl'>Жынсыңыз</p>
            <div className='flex justify-around gap-4'>
                <article className='flex gap-2 items-center accent-[#ADC178] w-full'> 
                    <input className='genderRadio' id='boy' value='Ұл' onChange={(e) => setGender(e.target.value)} type="radio" name='gender'/>
                    <label className={`text-xl font-medium cursor-pointer w-full rounded-xl text-center p-2 ${gender == 'Ұл' && 'bg-[#ADC178] text-white'}`} htmlFor="boy">Ұл</label>
                
                </article>
                <article className='flex gap-2 items-center accent-[#ADC178] w-full'>
                    <input className='genderRadio' id='girl' value='Қыз' onChange={(e) => setGender(e.target.value)} type="radio" name='gender'/>
                    <label className={`text-xl font-medium cursor-pointer w-full text-center rounded-xl p-2 ${gender == 'Қыз' && 'bg-[#ADC178] text-white'}`} htmlFor="girl">Қыз</label>
                
                </article>
            </div>
            {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
            <button className='bg-[#ADC178] cursor-pointer transition duration-300 ease-in-out text-white outline-none border-none p-3 w-100 rounded-xl hover:bg-[#b2cb6c]' type='submit'>Растау</button>
        </form>
        
    </section>
  )
}

export default VerificationUser