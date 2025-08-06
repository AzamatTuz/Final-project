import React from 'react'
import { Link } from 'react-router-dom'

function HeaderBtns(props) {
  return (
    <div className='flex items-center gap-[8px]'>
        <img src={props.icon} alt="" />
        <Link className='text-[18px] text-white underlineText' to={props.to}>{props.text}</Link>
    </div>
  )
}

export default HeaderBtns