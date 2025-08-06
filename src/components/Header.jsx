import React from 'react'
import HeaderNav from './HeaderNav'
import { useNavigate } from 'react-router-dom'

function Header(props) {
    
  const navigate = useNavigate()

  return (
    <header id='header' className={props.className}>
        <img className='' onClick={() => navigate('/')} src="public/images/logo.png" alt="" />
        <HeaderNav/>
    </header>
  )
}

export default Header