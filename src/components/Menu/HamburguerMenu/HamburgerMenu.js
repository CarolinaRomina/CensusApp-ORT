import React from 'react'
import { useState } from 'react';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons'; 
import { useSelector } from 'react-redux';
import UserListHM from './UserListHM.js';
import GuestListHM from './GuestListHM.js';

const HamburgerMenu = () => {

  const [isOpen, setOpen] = useState(false);
  
  const isUserLoggedIn = useSelector(state => state.user.loggedIn);

  const ToggleMenu = () => {
    setOpen(!isOpen);
    console.log(isOpen);
  }

  return (
    <div id={isOpen ? "container-hamburguer-menu-open" : "container-hamburguer-menu-closed"}>
      <div id={isOpen ? "container-icon-hamburguer-open" : "container-icon-hamburguer-closed"}>
        <FontAwesomeIcon icon={faBars} onClick={ToggleMenu} style={{color: "#f7f5de",}} />
      </div>
      {
        isOpen ?
        (
          <div id="menu-options-hamburguer-menu">
            {
              isUserLoggedIn ?
              (
                <UserListHM />
              )
              :
              (
                <GuestListHM />
              )
            }
          </div>
        )
        :
        (
          <></>
        )
      }
    </div>
  )
}

export default HamburgerMenu