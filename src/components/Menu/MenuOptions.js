import React from 'react'
import { useSelector } from 'react-redux'
import MenuUser from '../Menu/User/MenuUser'
import MenuGuest from '../Menu/Guest/MenuGuest'
import HamburgerMenu from './HamburguerMenu/HamburgerMenu'

const MenuOptions = () => {

    const isUserLoggedIn = useSelector(state => state.user.loggedIn);

    return (
        <nav id="container-menu">
            {
                isUserLoggedIn ? 
                (
                    <MenuUser />
                )
                :
                (
                    <MenuGuest />
                )
            }
            <HamburgerMenu />
        </nav>
    )
}

export default MenuOptions