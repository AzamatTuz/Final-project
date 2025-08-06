import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import MyRentNotifi from './MyRentNotifi';

function NotificationMain() {

    const [notification, setNotification] = useState([])

    async function getNotification() {
        try {
            const result = await axios.get('https://peer2p-back.onrender.com/notification', {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            })

            setNotification(result.data);
            
        } catch (error) {
            console.error(error);
            
        }
    }

    async function updateAnswer(answer, id, productId) {
        try {
            await axios.put('https://peer2p-back.onrender.com/update/answer', { answer: answer, id: id, productId: productId })

            getNotification()

        } catch (error) {
            console.error(error);
                
        }
    }

    async function deleteNotifi(id) {
        try {
            const result = await axios.delete(`https://peer2p-back.onrender.com/delete/notifi/${id}`)
            console.log(result.data);
            

            getNotification()
        } catch (error) {
            console.error(error);
            
        }
    }

    console.log(notification);
    
    

    useEffect(() => {
        getNotification()
    },[])
  return (
    <main className='mt-40 flex flex-col items-center gap-10 mb-40'>
        {notification.length > 0 && <>
        
        <h1 className='text-4xl font-bold'>Маған келген сұраныстар</h1>
        <hr className='w-full h-[4px] border-none outline-none bg-[#ADC178]' />
        <section className='grid grid-cols-4 gap-15' >
            {notification.map((item) => 
        
            <div key={item.notification_id} className='bg-white relative flex flex-col items-center gap-5 w-70 p-3 shadow-2xl rounded-2xl'>
                    <img className='w-70 h-70 object-cover rounded-2xl' src={`https://peer2p-back.onrender.com/uploads/${item.product_image}`} alt="" />
                    <h3 className='text-xl font-medium'>{item.name}</h3>
                    <h3 className='text-xl font-medium'>{item.time_value} { item.time == 'hour' ? 'сағатқа' : 'күнге'}</h3>
                    <p>{item.phone_number}</p>
                    { item.answer == 'not' ? <div className='flex justify-between w-full gap-5'>
                        <button onClick={() => updateAnswer('true', item.notification_id, item.id)} className='bg-[#ADC178] text-center w-full p-2 text-white font-semibold rounded-lg cursor-pointer transition duration-300 hover:bg-[#c6e179]'>Келісемін</button>
                        <button onClick={() => updateAnswer('false', item.notification_id, item.id)} className='bg-[#d30e0e] text-center w-full p-2 text-white font-semibold rounded-lg cursor-pointer transition duration-300 hover:bg-red-500'>Келіспеймін</button>
                    </div> : <div>
                    
                        {item.answer == 'true' &&  <p className='text-xl font-bold'> Келісім берілді</p>}
                        {item.answer == 'false' &&  <p className='text-xl font-bold'> Келісім берілмеді</p>}
                        {item.answer == 'false' &&  <button onClick={() => deleteNotifi(item.notification_id)} className='bg-[#ADC178] p-2 text-white font-semibold rounded-full cursor-pointer absolute w-13 h-13 flex items-center justify-center top-[-20px] left-[-20px]'><img className='w-4' src="/images/delete.png" alt="" /></button>}
                        {item.answer == 'start' && <p>Жалға алу басталды</p>}
                    
                    </div>}
                    
            </div>  
        
        )}
        </section>
        
        </>}
        <MyRentNotifi/>
    </main>
  )
}

export default NotificationMain