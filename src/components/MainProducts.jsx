import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function MainProducts({ categoryFilter }) {
    const [products, setProducts] = useState([])
    const [prompt, setPrompt] = useState('')
    const token = localStorage.getItem('token')
    const [favourites, setFavourites] = useState([])
    async function getUser() {
    try {

      const result = await axios.get("https://peer2p-back.onrender.com/profile", {
        headers: {
          "authorization": `Bearer ${token}`,
        },
      });

      if (result.data.length > 0) {
        
        setFavourites(result.data[0].favourite_id)
        
      }
    } catch (error) {
      console.error(error);
    }
  }
  

  useEffect(() => {
    getUser();
  }, []);
    
    async function getProducts() {
        try {
            const result = await axios.get('https://peer2p-back.onrender.com/products')
            setProducts(result.data)
            
            
        } catch (error) {
            console.error(error);
            
        }
    }

    const filteredProducts = products.filter((item) => {
        if (categoryFilter == 'Барлығы') {
            return item
        } else if (item.category == categoryFilter) {
            return item
        }
    })

    const searchedProducts = filteredProducts.filter((item) => {
        if (item.name.toLowerCase().includes(prompt.toLowerCase().trim())) {
            return item
        }
    })
    

    async function addToFavourites(id) {
        
        try {
            
            
            const result = await axios.put('https://peer2p-back.onrender.com/addtofavourite', {id: id}, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            })

            getUser()

            console.log(result.data );
            
        } catch (error) {
            console.error(error);
            
        }
    }

    useEffect(() => {
        getProducts()
    },[])
  return (
    <section className='mt-20 w-full flex flex-col items-center'>
        
        <article className='w-[80%] relative m-20'>
            <label className='absolute w-5 top-4 left-4' htmlFor="search"><img src="public/images/search.png" alt="" /></label>
            <input value={prompt} onChange={(e) => setPrompt(e.target.value)} className='w-full text-white bg-[#534239] p-3 pl-13 outline-none border-3 border-[#ADC178] rounded-full placeholder:text-white' placeholder='Іздеу' id='search' type="text" />
        </article>

        <article className='grid grid-cols-3 gap-30'>
            {searchedProducts.map((item) => 
                
                <div key={item.id} className='bg-white relative flex flex-col items-center gap-5 w-70 p-3 shadow-2xl rounded-2xl'>
                    <img className='w-70 h-70 object-cover rounded-2xl' src={`https://peer2p-back.onrender.com/uploads/${item.product_image}`} alt="" />
                    <h3 className='text-xl font-medium'>{item.name}</h3>
                    <Link to={`/product/${item.id}`} className='bg-[#ADC178] text-center authBtn w-full p-2 text-white font-semibold rounded-lg cursor-pointer'><span className='relative z-3'>Қарау</span></Link>
                    <button onClick={() => addToFavourites(item.id)} className={`w-15 h-15 absolute ${favourites.includes(item.id) ? 'bg-[#FF7575]' : 'bg-white'} rounded-full border transition duration-300 ease-in-out hover:bg-[#FF7575] border-[#FF7575] flex items-center justify-center top-[-20px] right-[-20px] cursor-pointer`}>
                        <img className='w-12 h-12 p-3' src="public/images/Heart.png" alt="" />
                    </button>
                
                </div>


            )}
        </article>

    </section>
  )
}

export default MainProducts