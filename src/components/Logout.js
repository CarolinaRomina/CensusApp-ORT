import { useDispatch } from "react-redux"
import {clearUser} from "../features/user/userSlice"
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Logout = () => {
    
    const dispatch = useDispatch();

    const isLoggedIn = useSelector(state => state.user.loggedIn);


    const handleLogout = () => 
    {
        dispatch(clearUser());
        console.log(isLoggedIn);
    }

    return(
        <div>
            <NavLink to={"/"} onClick={handleLogout}>Cerrar sesión</NavLink>
        </div>
    )

}

export default Logout