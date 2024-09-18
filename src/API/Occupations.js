import React from 'react'
import { useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { SetOccupations } from '../features/user/userSlice';
import { useSelector } from 'react-redux';

const Occupations = () =>
{

    const dispatch = useDispatch();

    const userid = useSelector(state => state.user.id);
    const apikey = useSelector(state => state.user.apiKey);

    useEffect(() => {
        API();
    }, [])
    

    const API = async() =>
    {
        try{
            let response = await fetch("https://censo.develotion.com/ocupaciones.php",
                {
                    method: 'GET',
                    headers: 
                    {
                        'Content-Type': 'application/json',
                        'apikey': apikey,
                        'iduser': userid
                    }
                }
            );
            const data = await response.json(); 
            if (data.codigo == 200){
                dispatch(SetOccupations(data.ocupaciones));
                console.log(data.ocupaciones);
            }
            else{
                throw new Error(data.mensaje);
            }
        }
        catch(error){
            console.log(error);
        }
    }

}

export default Occupations