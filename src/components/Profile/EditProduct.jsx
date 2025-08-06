import axios from 'axios';
import React, { useEffect, useState } from 'react'

function EditProduct({ setIsEdit, isEdit, id, getProducts, userId }) {
    const [categories, setCategories] = useState([])
    const [categoryValue, setCategoryValue] = useState("")
    const [nameValue, setNameValue] = useState("")
    const [priceValue, setPriceValue] = useState("")
    const [timeValue, setTimeValue] = useState("")
    const [descriptionValue, setDescriptionValue] = useState("")
    const [imageValue, setImageValue] = useState(null)
    const [preview, setPreview] = useState(null)
    const [errorMessage, setErrorMessage] = useState()

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageValue(file);
        setPreview(URL.createObjectURL(file));
    };

    async function getCetgory() {
        try {
            const result = await axios.get('https://peer2p-back.onrender.com/category')
            setCategories(result.data)
            
        } catch (error) {
            console.error(error);
            
        }
    }

    async function getProduct() {
        try {
            const result = await axios.get(`https://peer2p-back.onrender.com/product/${id}`)
            console.log(result.data)

            setNameValue(result.data.name)
            setCategoryValue(result.data.category)
            setPriceValue(result.data.price)
            setTimeValue(result.data.time)
            setDescriptionValue(result.data.description)
            setPreview(`https://peer2p-back.onrender.com/uploads/${result.data.product_image}`)
            setImageValue(result.data.product_image)
        } catch (error) {
            console.error(error);
            
        }
    }

    async function editProduct(e) {
        e.preventDefault();

        if (!nameValue || !descriptionValue || !priceValue || !categoryValue) {
            return setErrorMessage('Барлық жолдар толтырылуы қажет!!!')
        }

        if (descriptionValue.length < 100) {
            return setErrorMessage("Мазмұндағы әріптер саны 100 ден көп болуы қажет!!!")
        }

        if (isNaN(categoryValue)) {
            return setErrorMessage('Категория таңдаңыз')
        }

        const formData = new FormData();
        formData.append("productName", nameValue.trim());
        formData.append("time", timeValue);
        formData.append("productPrice", priceValue.trim());
        formData.append("prodcutDescription", descriptionValue.trim());
        formData.append("catergoryId", categoryValue.trim());
        if (imageValue) formData.append("image", imageValue);

        try {
            
            const res = await axios.put(`https://peer2p-back.onrender.com/product/edit/${id}`, formData);

            setDescriptionValue('')
            setNameValue('')
            setPriceValue('')
            setTimeValue('hour')
            setImageValue(null);
            setPreview(null);
            setErrorMessage('')
            setIsEdit(false)
            getProducts(userId)
            
            
        } catch (err) {
            console.error(err);
        }
    }
    


    useEffect(() => {
        getCetgory()
        getProduct()
    },[])

  return (
    <section className='verif-window flex items-center justify-around'>
        <form onSubmit={editProduct} className='bg-white p-5 gap-5 flex flex-col rounded-2xl relative z-40 mt-5'>
            <button type='button' onClick={() => setIsEdit(!isEdit)} className='bg-[#ADC178] w-fit p-4 rounded-full cursor-pointer absolute top-[-20px] right-[-20px]'><img className='w-6' src="public/images/cancel.png" alt="" /></button>
            <h1 className='text-center text-3xl font-medium'>Өзгерту</h1>
            <input placeholder='Заттың аты' className='bg-[#ADC178] text-white outline-none border-none placeholder:text-white p-3 w-100 rounded-xl' value={nameValue} onChange={(e) => setNameValue(e.target.value)} type="text" />
            <select value={categoryValue} className='bg-[#ADC178]  text-white outline-none border-none placeholder:text-white p-3 w-100 rounded-xl' onChange={(e) => setCategoryValue(e.target.value)}>
                <option value="">Категория таңдаңыз</option>
                    {categories.map((item) => 
                        <option key={item.id} value={item.id}>{item.category}</option>
                    )}
            </select>
            <input value={priceValue} onChange={(e) => setPriceValue(e.target.value)} className='bg-[#ADC178] text-white outline-none border-none placeholder:text-white p-3 w-100 rounded-xl' type="number" placeholder='Бағасы' />
            <div className='flex justify-around gap-4'>
                <article className='flex gap-2 items-center accent-[#ADC178] w-full'> 
                    <input className='genderRadio' id='boy' value='hour' onChange={(e) => setTimeValue(e.target.value)} type="radio" name='gender'/>
                    <label className={`text-xl font-medium cursor-pointer w-full rounded-xl text-center p-2 ${timeValue == 'hour' && 'bg-[#ADC178] text-white'}`} htmlFor="boy">Сағатына</label>
                
                </article>
                <article className='flex gap-2 items-center accent-[#ADC178] w-full'>
                    <input className='genderRadio' id='girl' value='day' onChange={(e) => setTimeValue(e.target.value)} type="radio" name='gender'/>
                    <label className={`text-xl font-medium cursor-pointer w-full text-center rounded-xl p-2 ${timeValue == 'day' && 'bg-[#ADC178] text-white'}`} htmlFor="girl">Күніне</label>
                
                </article>
            </div>
            <textarea value={descriptionValue} onChange={(e) => setDescriptionValue(e.target.value)} placeholder='Заттың мазмұны. . . . .' className='text-[#534239] font-medium outline-none border-3 rounded-3xl p-5 border-[#ADC178] placeholder:text-[#534239]' name="" id="" cols="30" rows="5"></textarea>
            {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
            <button className='bg-[#ADC178] cursor-pointer transition duration-300 ease-in-out text-white outline-none border-none p-3 w-100 rounded-xl hover:bg-[#b2cb6c]' type='submit'>Өзгерту</button>
        </form>

        <article className='absolute left-4'>
            <label className='w-[30%] overflow-hidden border-3 border-[#ADC178] text-[#ADC178] text-3xl flex flex-col items-center justify-center rounded-2xl cursor-pointer' htmlFor="product_image"><img src={preview ? preview : "public/images/image.png"} className={`${preview ? '' : 'w-30'}`} alt="" />{preview ?'' : 'Сурет қою'}</label>
            <input accept="image/*" onChange={handleImageChange} className='form-file' id='product_image' type="file" />
        </article>
        
    </section>
  )
}

export default EditProduct