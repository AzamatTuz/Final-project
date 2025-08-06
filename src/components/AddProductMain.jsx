import axios from 'axios'
import React, { useEffect, useState } from 'react'

function AddProductMain() {

    const [time, setTime] = useState('hour')
    const [image, setImage] = useState(null)
    const [productName, setProductName] = useState()
    const [productPrice, setProductPrice] = useState()
    const [prodcutDescription, setProductDescription] = useState()
    const [preview, setPreview] = useState(null)
    const [errorMessage, setErrorMessage] = useState()
    const [message, setMessage] = useState()
    const [categories, setCategories] = useState([])
    const [catergoryId, setCategoryId] = useState()
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setPreview(URL.createObjectURL(file));
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!productName || !prodcutDescription || !productPrice || !catergoryId) {
            return setErrorMessage('Барлық жолдар толтырылуы қажет!!!')
        }

        if (prodcutDescription.length < 100) {
            return setErrorMessage("Мазмұндағы әріптер саны 100 ден көп болуы қажет!!!")
        }

        const formData = new FormData();
        formData.append("productName", productName.trim());
        formData.append("time", time);
        formData.append("productPrice", productPrice.trim());
        formData.append("prodcutDescription", prodcutDescription.trim());
        formData.append("catergoryId", catergoryId.trim());
        if (image) formData.append("image", image);

        try {
            
            const res = await axios.post("https://peer2p-back.onrender.com/addproduct", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            });
            setProductDescription('')
            setProductName('')
            setProductPrice('')
            setTime('hour')
            setImage(null);
            setPreview(null);
            setErrorMessage('')
            setMessage(res.data)
            
        } catch (err) {
            console.error(err);
        }
    };

    async function getCetgory() {
        try {
            const result = await axios.get('https://peer2p-back.onrender.com/category')
            setCategories(result.data)
            
        } catch (error) {
            console.error(error);
            
        }
    }

    useEffect(() => {
        getCetgory()
    },[])
    

  return (
    <main className='mt-40 mb-50 flex flex-col items-center justify-center w-full gap-15'>
        <h1 className='text-5xl text-[#534239] font-bold'>Жалға беру</h1>
        <form onSubmit={handleSubmit} className='flex w-[80%] gap-10'>
            <label className='w-[50%] overflow-hidden bg-[#7a361146] border-3 border-[#534239] text-[#534239] text-3xl flex flex-col items-center justify-center rounded-2xl cursor-pointer' htmlFor="product_image"><img src={preview ? preview : "/images/image.png"} className={`${preview ? '' : 'w-30'}`} alt="" />{preview ?'' : 'Сурет қою'}</label>
            <input accept="image/*" onChange={handleImageChange} className='form-file' id='product_image' type="file" />
            <section className='flex flex-col w-[50%] gap-5'>
                <input value={productName} onChange={(e) => setProductName(e.target.value)} placeholder='Заттың аты' className='pl-5 text-[#534239] font-medium outline-none border-3 rounded-full p-2 border-[#534239] placeholder:text-[#534239]' type="text" name="" id="" />
                <article className='w-[100%] flex gap-5'>
                    <input value={productPrice} onChange={(e) => setProductPrice(e.target.value)} placeholder='Заттың бағасы (тенге)'  className='pl-5 w-[50%]  text-[#534239] font-medium outline-none border-3 rounded-full p-2 border-[#534239] placeholder:text-[#534239]' type="number" name="" id="" />
                    <label className={`${time == 'hour' && 'bg-[#534239] text-white'} w-[25%] text-center text-[#534239] font-medium border-3 rounded-full p-2 border-[#534239] cursor-pointer`} htmlFor="hour">Сағатына</label>
                    <input onChange={() => setTime('hour')} value={'hour'} id='hour' className='form-file' name='time' type="radio" />
                    <label className={`${time == 'day' && 'bg-[#534239] text-white'} w-[25%] text-center text-[#534239] font-medium border-3 rounded-full p-2 border-[#534239] cursor-pointer`} htmlFor="day">Күніне</label>
                    <input onChange={() => setTime('day')} value={'day'} id='day' className='form-file' name='time' type="radio" />
                </article>
                <select onChange={(e) => setCategoryId(e.target.value)} className='pl-5 text-[#534239] font-medium outline-none border-3 rounded-full p-2 border-[#534239] placeholder:text-[#534239]' name="" id="">
                    <option value="">Категория таңдаңыз</option>
                    {categories.map((item) => 
                        <option key={item.id} value={item.id}>{item.category}</option>
                    )}
                </select>
                <textarea value={prodcutDescription} onChange={(e) => setProductDescription(e.target.value)} placeholder='Заттың мазмұны. . . . .' className='text-[#534239] font-medium outline-none border-3 rounded-3xl p-5 border-[#534239] placeholder:text-[#534239]' name="" id="" cols="30" rows="10"></textarea>
                {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
                {message && <p className='text-green-500'>{message}</p>}
                <button type='submit' className=' text-[#534239] font-medium border-3 rounded-full p-2 border-[#534239] hover:text-white hover:bg-[#534239] cursor-pointer transition duration-300 ease-in-out'>Растау</button>
            </section>
        </form>

    </main>
  )
}

export default AddProductMain