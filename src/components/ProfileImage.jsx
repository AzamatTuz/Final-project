import React from 'react'

function ProfileImage(props) {
  return (
    <img className='w-70 relative left-30 top-[-140px] rounded-[80px] border-10 border-[#ADC178]' src={props.image} alt="" />
  )
}

export default ProfileImage