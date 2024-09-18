import React from 'react'
import GuestList from './GuestList'

const MenuGuest = () => {
  return (
    <div id="container-nav-not-logged-in">
        <div id="container-title-nav-not-logged-in">
          <h1>Bienvenido/a, censista</h1>
        </div>
        <GuestList />
    </div>
  )
}

export default MenuGuest