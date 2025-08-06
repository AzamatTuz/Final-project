import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ProfileImage from './ProfileImage';
import VerificationUser from './VerificationUser';
import ChangeProfileImage from './ChangeProfileImage';
import UserInfo from './UserInfo';
import { Link, useNavigate } from 'react-router-dom';
import MyRents from './Profile/MyRents';
import EditProduct from './Profile/EditProduct';

function ProfileMain() {
    const token = localStorage.getItem("token");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [profileImage, setProfileImage] = useState()
    const [user, setUser] = useState({})
    const [isClick, setIsClick] = useState(false)
    const [rentBtn, setRentBtn] = useState(true)
    const [myProducts, setMyProducts] = useState([])
    const [deleteId, setDeleteId] = useState()
    const [isDelete, setIsDelete] = useState(false) 
    const navigate = useNavigate()
    const [isEdit, setIsEdit] = useState(false)
    const [editId, setEditId] = useState()

    const handleImageChange = (e) => {
    const file = e.target.files[0];
        setImage(file);
        setPreview(URL.createObjectURL(file));
    };
  
    
    async function deleteProduct() {
      try {
        const result = await axios.delete('https://peer2p-back.onrender.com/product/delete/' + deleteId)
        console.log(result.data);
        setIsDelete(false)
        getProducts(user.id)
        
      } catch (error) {
        console.error(error);
        
      }
    }

    const handleSubmit = async (e) => {

        const formData = new FormData();
        formData.append("id", user.id);
        if (image) formData.append("image", image);

    e.preventDefault();

    try {
      const res = await axios.put("https://peer2p-back.onrender.com/changeImage", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      setProfileImage(res.data);
      
      setImage(null);
      setPreview(null);
    } catch (err) {
      console.error("Қате: " + (err.response?.data?.message || "Сервер қатесі"));
    }
  };
  


    async function getUser() {
        try {
            const result = await axios.get('https://peer2p-back.onrender.com/profile', {
                headers: {
                    "authorization": `Bearer ${token}`,
                },
            })
            setUser(result.data[0]);
            getProducts(result.data[0].id)
            
        } catch (error) {
          navigate('/authorization')
            console.error(error);
            
        }
    }

    async function getProducts(id) {
        try {

            const result = await axios.get(`https://peer2p-back.onrender.com/products/user/${id}`)
            setMyProducts(result.data)
            
        } catch (error) {
            console.error(error);
            
        }
    }

    

    useEffect(()=>{
        getUser()
        
        

    },[])

    
  return (
    
    <main className='shadowed mt-80 border-t-10 border-t-[#ADC178] flex flex-col justify-between'>
        <section className='flex justify-between'>
          <ChangeProfileImage setPreview={setPreview} profileImage={profileImage} user={user} handleImageChange={handleImageChange} preview={preview} handleSubmit={handleSubmit}/>

          <UserInfo user={user} setIsClick={setIsClick} isClick={isClick}/>
        </section>

        <section>
          <article className='flex gap-3 ml-5'>
            <h3 className='text-2xl font-medium'>Жалға</h3>
              <button onClick={() => setRentBtn(true)} className={`${rentBtn && 'bg-[#ADC178] text-white'} pl-3 pr-3 text-2xl rounded-t-2xl cursor-pointer`}>Беретін</button>
              <button onClick={() => setRentBtn(false)} className={`${rentBtn || 'bg-[#ADC178] text-white'} pl-3 pr-3 text-2xl rounded-t-2xl cursor-pointer`}>Алған</button>
            <h3 className='text-2xl'>заттар</h3>
          </article>

          <hr className='w-full h-2 border-none bg-[#ADC178]'/>  

        </section>

        {isClick && <VerificationUser setIsClick={setIsClick} isClick={isClick} id={user.id}/>}
        {isEdit && <EditProduct setIsEdit={setIsEdit} isEdit={isEdit} id={editId} getProducts={getProducts} userId={user.id}/>}

        {rentBtn ? <section className='flex items-center justify-center mt-20 mb-20'>
            <div className='grid grid-cols-3 justify-center gap-30'>
              {myProducts.map((product) => 
            
              <article className='relative flex flex-col items-center gap-5 w-70 p-3 shadow-2xl rounded-2xl' key={product.id}>
                  <img className='w-70 h-70 object-cover rounded-2xl' src={`https://peer2p-back.onrender.com/uploads/${product.product_image}`} alt="" />
                  <h3 className='text-xl font-medium'>{product.name}</h3>
                  <Link to={`/product/${product.id}`} className='bg-[#ADC178] text-center authBtn w-full p-2 text-white font-semibold rounded-lg cursor-pointer'><span className='relative z-3'>Қарау</span></Link>
                  <button onClick={() => {setDeleteId(product.id), setIsDelete(!product.is_rent && true)}} className='bg-[#ADC178] p-2 text-white font-semibold rounded-full cursor-pointer absolute w-13 h-13 flex items-center justify-center top-[-20px] left-[-20px]'><img className='w-4' src="public/images/delete.png" alt="" /></button>
                  <button onClick={() => {setIsEdit(!product.is_rent && true), setEditId(product.id)}} className='bg-[#ADC178] p-2 text-white font-semibold rounded-full cursor-pointer absolute w-13 h-13 flex items-center justify-center top-[-20px] right-[-20px]'><img className='w-4' src="public/images/pen.png" alt="" /></button>
              </article>  

            )}

              <article className='h-[413px] flex flex-col items-center justify-center gap-5 w-70 p-3 shadow-2xl rounded-2xl'>
                  
                  <Link to={user.is_verification && '/addproduct'} className='cursor-pointer text-8xl text-[#ADC178] w-30 h-30 border-4 border-[#ADC178] flex justify-center rounded-full'>+</Link>
                  
                  
              </article>  
            </div>
        </section> : <MyRents/>}

        {isDelete && <article className='close-window'>
            
            <div className='bg-white flex flex-col items-center gap-5 p-5 rounded-lg w-80'>
                <h1 className='font-semibold text-center text-xl'>Сіз сенімдісізбе ?</h1>
                <div className='flex w-full gap-5'>
                    <button onClick={deleteProduct} className='bg-[#ADC178] w-[50%] text-white p-2 rounded text-lg cursor-pointer'>Иә</button>
                    <button onClick={() => setIsDelete(false)} className='bg-[#ADC178] w-[50%] text-white p-2 rounded text-lg cursor-pointer'>Жоқ</button>
                </div>
            </div>
            
        </article>}
        
    </main>
  )
}

export default ProfileMain