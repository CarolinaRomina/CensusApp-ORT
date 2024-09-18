import React from 'react'
import Logout from '../../Logout'
import { NavLink } from 'react-router-dom'

const UserList = () => {
  return (
    <div id="nav-logged-in">
        <ul>
            <li>
                {<Logout />}
                <NavLink to="/Dashboard">Dashboard</NavLink>
            </li>
        </ul>
    </div>
  )
}

export default UserList