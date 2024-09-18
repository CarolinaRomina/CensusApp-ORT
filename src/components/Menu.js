import React from 'react'
import { NavLink } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Logout from './Logout'
import { useState, useEffect } from "react";
import '../css/Menu.css'	

const Menu = () => {

    const userId = useSelector(state => state.user.id);
    const userApiKey = useSelector(state => state.user.apiKey);

    const [isLoggedIn, setLoggedIn] = useState(false);

    useEffect(() =>
    {
        console.log("useeffect");
        if (userId !=null && userApiKey !=null){
            setLoggedIn(true);
            console.log("logged in");
        }
        else{
            setLoggedIn(false);
            console.log("logged out");
        }
    })

    return (
        <div id="containerNav">
            {
                isLoggedIn ? 
                    (
                        <nav id="navLoggedIn">
                            {<Logout />}
                            <NavLink to="/Dashboard">Dashboard</NavLink>
                        </nav>
                    )
                :
                    (
                        <nav id="navNotLoggedIn">
                            <NavLink to="/Register">Register</NavLink>
                            <NavLink to="/Login">Login</NavLink>
                        </nav>
                    )
            }
            <Outlet />
        </div>
    )
}

export default Menu