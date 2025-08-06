import axios from 'axios';
import React, { useEffect, useState } from 'react'

function MyRentNotifi() {
    const [rents, setRents] = useState([])
    const [isClick, setIsClick] = useState(false)
    const [notifiId, setNotifiId] = useState()

    async function getNotifi() {
        try {
            const result = await axios.get('https://peer2p-back.onrender.com/myrents', {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            })

            setRents(result.data);
            
            
        } catch (error) {
            console.error(error);
            
        }
    }

    async function startRent() {
        try {
            const result = await axios.post('https://peer2p-back.onrender.com/start/rent', {notifiId: notifiId})
            console.log(result.data);
            setIsClick(false)
            getNotifi()
        } catch (error) {
            console.error(error);
            
        }
    }

    


    useEffect(() => {
        getNotifi()
    },[])


  return (
    <>
        {rents.length > 0 && <>
        
        <h1 className='text-4xl font-bold'>Мен жіберген сұраныстар</h1>
        <hr className='w-full h-[4px] border-none outline-none bg-[#ADC178]' />
        <section  className='grid grid-cols-4 gap-15'>
        
        {rents.map((item) => 
        
            <div key={item.notification_id} className='bg-white relative flex flex-col items-center gap-5 w-70 p-3 shadow-2xl rounded-2xl'>
                    <img className='w-70 h-70 object-cover rounded-2xl' src={`https://peer2p-back.onrender.com/uploads/${item.product_image}`} alt="" />
                    <h3 className='text-xl font-medium'>{item.name}</h3>
                    <h3 className='text-xl font-medium'>{item.time_value} { item.time == 'hour' ? 'сағатқа' : 'күнге'}</h3>
                    <p className='text-xl font-bold'>{item.answer == 'not' ? 'Жауап жоқ' : item.answer == 'true' ? 'Келісім берілді' : item.answer == 'false' ? 'Келісім берілмеді' : ''}</p>
                    {item.answer == 'true' && <button onClick={() => { setNotifiId(item.notification_id), setIsClick(true)}} className='bg-[#ADC178] text-center authBtn w-full p-2 text-white font-semibold rounded-lg cursor-pointer'><span className='relative z-3'>Бастау</span></button>}
                    {item.answer == 'start' && <p className='text-xl font-bold'>Жалға алу басталды</p>}
            </div>  
        
        )}
        </section>

        {isClick && <article className='close-window'>
            
            <div className='bg-white flex flex-col items-center gap-5 p-5 rounded-lg w-80'>
                <h1 className='font-semibold text-center text-xl'>Сіз сенімдісізбе ?</h1>
                <div className='flex w-full gap-5'>
                    <button onClick={startRent} className='bg-[#ADC178] w-[50%] text-white p-2 rounded text-lg cursor-pointer'>Иә</button>
                    <button onClick={() => setIsClick(false)} className='bg-[#ADC178] w-[50%] text-white p-2 rounded text-lg cursor-pointer'>Жоқ</button>
                </div>
            </div>
            
        </article>}
    
        
        </>}
    </>
  )
}

export default MyRentNotifi