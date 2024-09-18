import React from 'react'
import { Outlet } from 'react-router-dom'
import './Menu.css'	
import MenuOptions from './MenuOptions';

const Menu = () => {

    return (
        <div id="container">
            {
                <MenuOptions />
            }
            <Outlet />
        </div>
    )
}

export default Menu