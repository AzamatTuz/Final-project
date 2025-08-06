import axios from 'axios';
import React, { useEffect, useState } from 'react'

function MyRents() {

    const [rents, setRents] = useState([])


    async function getMyRents() {
        try {
            const result = await axios.get('https://peer2p-back.onrender.com/profile/myrents', {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            })


            setRents(result.data)
            console.log(result.data);
            
        } catch (error) {
            console.error(error);
            
        }
    }
    async function endRent(product) {
        try {
            const result = await axios.put('https://peer2p-back.onrender.com/end/rented', {rentId: product.rent_id, productId: product.id, notifId: product.notification_id})
            console.log(result.data);
            getMyRents()
            
        } catch (error) {
            console.error(error);
            
        }
    }


    useEffect(()=>{
        getMyRents()
    },[])

  return (
    <section className='flex items-center justify-center mt-20 mb-20 min-h-[50vh]'>
        <div  className='grid grid-cols-3 justify-center gap-30'>
            {rents.map((product) => 
                <article className='relative flex flex-col items-center gap-5 w-70 p-3 shadow-2xl rounded-2xl' key={product.id}>
                    <img className='w-70 h-70 object-cover rounded-2xl' src={`https://peer2p-back.onrender.com/uploads/${product.product_image}`} alt="" />
                    <h3 className='text-xl font-medium'>{product.name}</h3>
                    <h3 className='text-xl font-medium'>{product.time_value} { product.time == 'hour' ? 'сағатқа' : 'күнге'}</h3>
                    <button onClick={() => endRent(product)} className='bg-[#d30e0e] text-center w-full p-2 text-white font-semibold rounded-lg cursor-pointer transition duration-300 hover:bg-red-500'>Аяқтау</button>
                </article> 
            )}
        </div>
    </section>
  )
}

export default MyRents