import React from 'react'
import ProfileImage from './ProfileImage'

function ChangeProfileImage({profileImage, user, handleImageChange, preview, handleSubmit, setPreview}) {
  return (
    <>

        <section className='relative'>
            <ProfileImage image={`https://peer2p-back.onrender.com/uploads/${profileImage ? profileImage : user.profile_image}`}/>
            <label className='label-image' htmlFor="image-upload"><img className='w-10 h-10 p-2' src="public/images/pen.png" alt="" /></label>
            <input id="image-upload" type="file" accept="image/*" onChange={handleImageChange} className="form-file"/>
        </section>
        {preview && <form className='preview' onSubmit={handleSubmit}>
            <div className='bg-white p-10 rounded-2xl flex flex-col items-center gap-10 relative'>
                <img className='w-100 h-100 rounded-2xl' src={preview} alt="Preview" />
                <button className='bg-[#ADC178] w-full p-4 rounded-2xl text-white text-2xl font-medium cursor-pointer hover:bg-[#9cae6c]' type='submit'>Растау</button>
                <button type='button' onClick={() => setPreview('')} className='bg-[#ADC178] w-fit p-4 rounded-full cursor-pointer absolute top-[-20px] right-[-20px]'><img className='w-6' src="public/images/cancel.png" alt="" /></button>
            </div>
        </form>}
    
    </>
  )
}

export default ChangeProfileImage