import React from 'react'
import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setApiKey, setId, setLoggedIn, setUsername } from '../features/user/userSlice';
import "../css/Login.css"
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; 

const Login = () => {

  const dispatch = useDispatch();

  const [message, setMessage] = useState("")

  const usernameData = useRef(null);
  const passwordData = useRef(null);

  const [characterEntered, setCharacterEntered] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleInput = () => 
    {
    //   eye icon has to be hidden at first
    //   if there is at least 1 character in input, icon shows
    //   if not it hiddens
        if (passwordData.current.value == "" || passwordData.current.value == null ){
            setCharacterEntered(false);
        }
        else
        {
            setCharacterEntered(true);
        }
    }

  const handlePasswordVisibility = () => 
    {
        //when clicked on the icon of the eye, showPassword will be equal to the opposite of showPassword
        //if showPassword is true, the eye will be open, if its false the eye will be shut
        setShowPassword(prevShowPassword => !prevShowPassword)
    }
    

  const handleData = async () => 
  {

    const userData =
    {
      usuario: usernameData.current.value,
      password: passwordData.current.value
    };

    try 
    {
      let response = await fetch("https://censo.develotion.com/login.php", 
      {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (!response.ok) 
      {
        setMessage(data.mensaje || 'Unknown error');
        console.log("NOT OK");
        console.error("API message: " + data.mensaje || 'Unknown error');
        console.error("API code: " + data.codigo);
      } 
      else 
      {
        if (data.codigo === 200) 
        {
          dispatch(setLoggedIn(true));
          dispatch(setId(data.id));
          dispatch(setApiKey(data.apiKey));
          dispatch(setUsername(usernameData.current.value));
          navigate('/Dashboard');
        } 
        else 
        {
          setMessage(data.mensaje || 'Unknown error');
          console.error("ELSE");
          console.error("API message: " + data.mensaje || 'Unknown error');
          console.error("API code: " + data.codigo);
        }
      }
    } 
    catch (error) 
    {
      setMessage("Unknown error");
      console.log("catch");
    }
  }

  return (
    <div id="container-login">
      <div id="container-form-log">
        <form id="form-login" autoComplete="off">
          <div id="container-title-log">
            <h1 id="title-login">Iniciar sesión</h1>
          </div>
          <div id="container-username-log">
            <label className="label-login" htmlFor="username">Usuario</label>
            <div id="username-field-log">
              <input className="input-login" type="text" id="username" name="username" ref={usernameData} />
            </div>
          </div>
          <div id="container-password-log">
            <label className="label-login" htmlFor="password">Contraseña</label>
            <div id="password-field-log">
            <input className="input-login" type={showPassword ? "text" : "password"} id="password-log" ref={passwordData} spellCheck="false" onChange={handleInput}/>            
              {
                  characterEntered ?
                  (
                      <div id="container-img-eye-log">
                          <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} onClick={handlePasswordVisibility} />
                      </div>
                  )
                  :
                  (
                      <></>
                  )
              }
            </div>
          </div>
          <div id="container-button-log">
            <input className="input-login" type="button" id="login" onClick={handleData} value="INICIAR SESIÓN" />
          </div>
        </form>
        {
        message ? 
          ( 
            <div id="container-message-log">
              <p id="message-failure-log">{message}</p>
            </div> 
          )
        :
          (
            <div id="container-message-log"></div>
          )
      }
      </div>
        <div id="container-register-redirect">
          <p id="message-register-redirect">¿Necesitas una cuenta?</p>
          <Link to="/Register" id="link-register-redirect">Regístrate</Link>
        </div>
      </div>
  )
}
export default Login  