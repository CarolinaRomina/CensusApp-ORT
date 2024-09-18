import React from 'react'
import { NavLink } from 'react-router-dom'

const UserListHM = () => {
  return (
    <div id="nav-logged-in-HM">
        <ul>
            <li>
                {<Logout />}
                <NavLink to="/Dashboard">Dashboard</NavLink>
            </li>
        </ul>
    </div>
  )
}

export default UserListHM