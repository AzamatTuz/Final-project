import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

function ProductDetailMain() {
    const [product, setProduct] = useState({})
    const [products, setProducts] = useState([])
    const navigate = useNavigate()
    const { id } = useParams()
    const [time, setTime] = useState()
    const [message, setMessage] = useState()
    const [allPrice, setAllPrice] = useState()

    async function getProduct() {
        try {
            const result = await axios.get(`https://peer2p-back.onrender.com/product/${id}`)
            setProduct(result.data)
            
            getProductOnCategory(result.data.category)
        } catch (error) {
            console.error(error);
            
        }
    }


    
    
    async function getProductOnCategory(catregory) {
        try {
            const result = await axios.get(`https://peer2p-back.onrender.com/producton/${catregory}`)
            
            setProducts(result.data)
            
            
        } catch (error) {
            console.error(error);
            
        }
    }


    const filteredProducts = products.filter((item) => item.id != id)

    function changePage(item) {
        getProductOnCategory(product.category)
        setProduct(item)
        navigate(`/product/${item.id}`)
    }

    
    
    async function validateDate() {
        // const timeNow = new Date().getHours() + ":" + new Date().getMinutes()
        // const month = (new Date().getMonth()+1).toString().length < 2 ? "0" + (new Date().getMonth()+1) : new Date().getMonth()+1
        // const dayNow = Date().split(' ')[3] + '-' + month + '-' + Date().split(' ')[2]

        // console.log(dayNow > day);
        // console.log(hour < timeNow);

        if (!time ) {
            return setMessage('Уақытын жазыңыз');
            
        } else if(time <= 0) {
            return setMessage('Уақытын жазыңыз');
        }

        try {
            const result = await axios.post('https://peer2p-back.onrender.com/addnotification', {
                productId: product.id,
                landLordId: product.owner_id,
                time: product.time,
                timeValue: time
            },{
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            })

            getProduct()
            setMessage(result.data)
            console.log(result.data);
            
        } catch (error) {
            console.error(error);
            
        }

        
    }

    
    

    useEffect(() => {
        getProduct()
        
    },[])
  return (
    <main id='main' className='mt-40 p-5 flex flex-col gap-20 items-center'>
        
        <section className='flex justify-center gap-20'>
            
            <div  className='w-[50%] overflow-hidden border-4 border-[#ADC178] flex flex-col items-center justify-center rounded-2xl'>
                <img  className='w-200 h-full' src={`https://peer2p-back.onrender.com/uploads/${product.product_image}`} alt="" />
            </div>
            
            <article className='flex flex-col gap-8'>
                
                <h1 className='text-6xl font-bold '>{product.name}</h1>
                <h3 className='text-2xl font-bold'>Бағасы: <span className='font-normal'>{product.price}тг {product.time == 'hour' ? 'сағатына' : 'күніне'}</span></h3>
                <h3 className='text-2xl font-bold'>Категориясы: <span className='font-normal'>{product.category}</span></h3>
                <h3 className='text-2xl font-bold'>Жалға алуға: <span className='font-normal'>{product.is_rent ? 'болмайды' : 'болады'}</span></h3>
                
                    
                {!product.is_rent && <input  placeholder='Уақытын жазыңыз ' min={0} id='time' onChange={(e) => {setTime(e.target.value), setAllPrice(product.price * e.target.value)}} className='bg-[#ADC178] text-white p-3 font-medium  w-full hover:bg-[#a4b969] text-xl rounded-full placeholder:text-white pl-4' type='number' />}
                    

                {allPrice > 0 && <p className='text-2xl font-bold'>Жалпы құны: <span className='font-normal'>{allPrice} тг</span></p>}
                {message && <p>{message}</p>}
                {!product.is_rent && <button onClick={validateDate} className='bg-[#ADC178] text-white p-3 font-medium cursor-pointer hover:bg-[#a4b969] text-2xl rounded-full'>Жалға алу</button>}
                {product.is_rent && <button disabled onClick={validateDate} className='bg-[#90a064] disBtn text-white p-3 font-medium cursor-no-drop text-2xl rounded-full'>Жалға алу</button>}
            
            </article>

        </section>

        <section className='flex flex-col gap-5'>
            <h1 className='text-5xl font-bold'>Мазмұны</h1>
            <p className='text-2xl w-260'>{product.description}</p>
        </section>

        <h1 className='text-5xl font-bold'>Ұқсас тауарлар</h1>

        <section className='grid grid-cols-3 gap-28'>

            {filteredProducts.map((item) => 

                <article className='relative flex flex-col items-center gap-5 w-70 p-3 shadow-2xl rounded-2xl' key={item.id}>
                  <img className='w-70 h-70 object-cover rounded-2xl' src={`https://peer2p-back.onrender.com/uploads/${item.product_image}`} alt="" />
                  <h3 className='text-xl font-medium'>{item.name}</h3>
                  <a href='#main' onClick={() => changePage(item)} className='bg-[#ADC178] text-center authBtn w-full p-2 text-white font-semibold rounded-lg cursor-pointer'><span className='relative z-3'>Қарау</span></a>  
                </article> 

            )}

        </section>
    </main>
  )
}



export default ProductDetailMain