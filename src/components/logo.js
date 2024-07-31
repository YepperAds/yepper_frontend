import React from 'react'
import { Link } from "react-router-dom";
import './styles/logo.css'

export default function Logo() {
  return (
    <Link to='/'>
      <h2>Yepper</h2>
    </Link>
  )
}
