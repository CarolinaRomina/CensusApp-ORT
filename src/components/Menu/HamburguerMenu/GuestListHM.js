import React from 'react'
import { NavLink } from 'react-router-dom'

const GuestListHM = () => {
  return (
    <div id="nav-not-logged-in-HM">
        <ul>
            <li>
                <NavLink to="/Register">Regístrate</NavLink>
                <NavLink to="/Login">Inicia sesión</NavLink>
            </li>
        </ul>
    </div>
  )
}

export default GuestListHM