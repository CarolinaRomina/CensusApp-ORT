import React from 'react'
import { NavLink } from 'react-router-dom'

const GuestList = () => {
  return (
    <div id="nav-not-logged-in">
        <ul>
            <li>
                <NavLink to="/Register">Regístrate</NavLink>
                <NavLink to="/Login">Inicia sesión</NavLink>
            </li>
        </ul>
    </div>
  )
}

export default GuestList