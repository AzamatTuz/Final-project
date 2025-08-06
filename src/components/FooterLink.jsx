import React from 'react'
import { Link } from 'react-router-dom'

function FooterLink(props) {
  return (
    <Link className='text-white' to={props.to}>{props.text}</Link>
  )
}

export default FooterLink