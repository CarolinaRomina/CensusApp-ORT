import React from 'react'
import { useRef } from 'react'
import { setId, setApiKey, setLoggedIn, setUsername } from '../features/user/userSlice';
import { useState} from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Register.css'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; 
import { useSelector } from 'react-redux';

const Register = () => 
{

    //dispatch
    const dispatch = useDispatch();

    const [message, setMessage] = useState("");

    //References data from inputs
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

        //creates object to send the data to api in object form
        const userData = 
        {
            usuario: usernameData.current.value,
            password: passwordData.current.value
        };
        
        try 
        {
            // petition to API sending user data
            let response = await fetch("https://censo.develotion.com/usuarios.php", 
            {
                method: "POST",
                body: JSON.stringify(userData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        
            const data = await response.json();
        
            // verify HTTP response
            if (!response.ok) 
            {
                setMessage(data.mensaje || 'Unknown error');
                console.error("API message: " + data.mensaje || 'Unknown error');
                console.error("API code: " + data.codigo);
            } 
            else 
            {
                // if data is correct, we save user apiKey and user id in store
                if (data.codigo === 200) 
                {
                    dispatch(setLoggedIn(true));
                    dispatch(setId(data.id));
                    dispatch(setApiKey(data.apiKey));
                    dispatch(setUsername(usernameData.current.value));
                    navigate("/Dashboard");
                    console.log("User apikey: " + data.apiKey);
                    console.log("User id: " + data.id);
                    console.log("API code: " + data.codigo);
                } 
                else 
                {
                    setMessage(data.mensaje || 'An unknown error occurred, please try again later');
                    console.error("API code: " + data.codigo);
                }
            }
        } 
        catch (error) 
        {
            setMessage("An unknown error occurred, please try again later");
            console.error("Error message: " + error.message);
        }
    }

    return (
        <div id="container-register">
            <div id="container-form-reg">
                <form id="form-register" autoComplete="off">
                    <div id="container-title-reg">
                        <h1 id="title-register">Registro</h1>
                    </div>
                    <div id="container-username-reg">
                        <label className="label-register" htmlFor="username">Usuario</label>
                        <div id="username-field-reg">
                            <input className="input-register" type="text" id="username" ref={usernameData} spellCheck="false"/>
                        </div>
                    </div>
                    <div id="container-password-reg">
                        <label className="label-register" htmlFor="password">Contraseña</label>
                        <div id="password-field-reg">
                            <input className="input-register" type={showPassword ? "text" : "password"} id="password-reg" ref={passwordData} spellCheck="false" onChange={handleInput}/>
                            
                            {
                                characterEntered ?
                                (
                                    <div id="container-img-eye-reg">
                                        <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} onClick={handlePasswordVisibility} />
                                    </div>
                                )
                                :
                                (
                                    <div id="container-img-eye-reg"></div>
                                )
                            }
                        </div>
                    </div>
                    <div id="container-button-reg">
                        <input type="button" className="input-register" id="register-btn" onClick={handleData} value="REGÍSTRATE" />
                    </div>
                </form>
                {
                message ? 
                (
                    <div id="container-message-reg">
                        <p id="message-failure-reg">{message}</p>
                    </div>
                )
                : 
                (
                    <div id="container-message-reg"></div>
                )
                }
            </div>
            <div id="container-login-redirect">
                <p id="message-login-redirect">¿Ya tienes una cuenta? </p>
                <Link to="/Login" id="link-login-redirect">Inicia sesión</Link>
            </div>
        </div> 
    )
}

export default Register