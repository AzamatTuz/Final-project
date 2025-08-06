import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function FavoriteMain() {
    const token = localStorage.getItem("token");
    const [favourites, setFavourites] = useState([])

    async function getFavouritesProduct() {
        try {
            const result = await axios.get('https://peer2p-back.onrender.com/favourites', {
                headers: {
                    "authorization": `Bearer ${token}`,
                },
            })
            setFavourites(result.data)
            
        } catch (error) {
            console.error(error);
            
        }
    }

    async function deleteOnFavourite(id) {
        try {
            
            
            const result = await axios.put('https://peer2p-back.onrender.com/deleteOnFavourite', {id: id}, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            })
            setFavourites(result.data)
            console.log(result.data);
            
        } catch (error) {
            console.error(error);
            
        }
    }

    useEffect(()=> {
        getFavouritesProduct()
    },[])

  return (
    <main className='mt-50 flex justify-center min-h-screen'>
        <section className='grid grid-cols-4 gap-20 '>
            {favourites.map((item) => 
                <article className='relative h-fit flex flex-col items-center gap-5 w-70 p-3 shadow-2xl rounded-2xl' key={item.id}>
                    <img className='w-70 h-70 object-cover rounded-2xl' src={`https://peer2p-back.onrender.com/uploads/${item.product_image}`} alt="" />
                    <h3 className='text-xl font-medium'>{item.name}</h3>
                    <Link to={`/product/${item.id}`} className='bg-[#ADC178] text-center authBtn w-full p-2 text-white font-semibold rounded-lg cursor-pointer'><span className='relative z-3'>Қарау</span></Link>
                    <button type='button' onClick={() => deleteOnFavourite(item.id)} className='bg-[#ADC178] w-fit p-4 rounded-full cursor-pointer absolute top-[-20px] right-[-20px]'><img className='w-6' src="/images/cancel.png" alt="" /></button>
                </article>  

            )}
        </section>
    </main>
  )
}

export default FavoriteMain