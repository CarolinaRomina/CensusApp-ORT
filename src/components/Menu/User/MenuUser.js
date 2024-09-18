import React from 'react'
import UserList from './UserList';
import { useSelector } from 'react-redux';

const MenuLoggedIn = () => {
  const usernameLoggedIn = useSelector(state => state.user.username);
  return (
    <div id="container-nav-logged-in">
        <div id="container-title-nav-logged-in">
            <h1>Bienvenido/a, {usernameLoggedIn}</h1>
        </div>
        <UserList />
    </div>
  )
}

export default MenuLoggedIn