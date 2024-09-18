import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useState, useEffect, useRef} from 'react';
import { addParticipantToList } from '../../features/user/userSlice';

const AddParticipant = () => {

    //bring data from Store
    const apikey = useSelector(state => state.user.apiKey);
    const userid = useSelector(state => state.user.id);
    const occupations = useSelector(state => state.user.occupations);

    const [departamentos, setDepartamentos] = useState([]);
    const [ciudades, setCiudades] = useState([]);
    const [departamento, setDepartamento] = useState(null);
    const [message, setMessage] = useState("");

    const name = useRef(null);
    const selectedCiudad = useRef(null);
    const selectedDepartamento = useRef(null);
    const birthdate = useRef(null);
    const occupation = useRef(null);

    const dispatch = useDispatch();


    useEffect(() => {
        const fetchData = async () =>
        {
            await APIDepartamentos();
            APICiudades();
        }
        fetchData();
    }, [])

    useEffect(() => {
        APICiudades();
    }, [departamento])
    
    const handleDepartamento = (evt) =>
    {
        setDepartamento(evt.target.value);

    }

    const APIDepartamentos = async () => 
    {
        try{
            let response = await fetch("https://censo.develotion.com/departamentos.php",
            {
                method: "GET",
                headers: 
                {
                    'Content-Type': 'application/json',
                    'apikey': apikey,
                    'iduser': userid
                }
            });

            const data = await response.json();

            if (data.codigo === 200) 
            {
                setDepartamentos(data.departamentos);
                console.log(data.codigo);
                console.log(data)
            }
            else{
                console.log(data.mensaje);
            }
        }
        catch(error){
            console.log(error);
        }
    }

    const APICiudades = async () => 
    {
        try{
            let response = await fetch(`https://censo.develotion.com/ciudades.php?idDepartamento=${selectedDepartamento.current.value}`,
                {
                    method: 'GET',
                    headers: 
                    {
                        'Content-Type': 'application/json',
                        'apikey': apikey,
                        'iduser': userid
                    }
                });
                const data = await response.json();
                if (data.codigo == 200){
                    setCiudades(data.ciudades);
                }
                else{
                    console.log(data.mensaje);
                }
        }
        catch(error){
            console.log(error);
        }
    }

    const ValidateData = () =>
    {
        setMessage("");
        if (name.current.value == null || name.current.value == "")
        {
            setMessage("Debe ingresar nombre de participante");
            return;
        }

        if (selectedCiudad.current.value == null)
        {
            setMessage("Debe ingresar ciudad del participante");
            return;
        }

        if (birthdate.current.value == null || birthdate.current.value == ""){
            setMessage("Debe ingresar fecha de nacimiento del participante");
            return;
        }

        Add();
    }

    const Add = async () =>
    {
        const participantData = 
        {
            "idUsuario": userid,
            "nombre": name.current.value,
            "departamento": departamento.current.value,
            "ciudad": selectedCiudad.current.value,
            "fechaNacimiento": birthdate.current.value,
            "ocupacion": occupation.current.value
        }
        try{
            let response = await fetch("https://censo.develotion.com/personas.php",
                {
                    method: 'POST',
                    body: JSON.stringify(participantData),
                    headers: 
                    {
                        'Content-Type': 'application/json',
                        'apikey': apikey,
                        'iduser': userid
                    },
                }
            )
            const data = await response.json();

            if (data.codigo == 200)
            {
                dispatch(addParticipantToList(
                    {
                        id: data.idCenso,
                        nombre: name.current.value,
                        departamento: departamento,
                        ciudad: selectedCiudad.current.value,
                        fechaNacimiento: birthdate.current.value,
                        ocupacion: occupation.current.value,
                        idUsuario: userid
                    }
                ))

                setMessage("Se agregó correctamente");
            }
            else{
                setMessage("No se pudo agregar al participante.");
            }
        }
        catch(error){
            console.log(error);
        }
    }
    
    return (
        <div id="container-addParticipant">

            <div id="container-title-AddParticipant">
                <h2>Add participant</h2>
            </div>

            <form id="form-addParticipant">

                <div id="container-inputParticipantName">
                    <label htmlFor="ParticipantName">Nombre</label>
                    <input type="text" id="ParticipantName" ref={name}/>
                </div>

                <div id="container-selectDepartamento">
                    <label htmlFor='selectDepartamento'>Departamento</label>
                    <select id="selectDepartamento" ref={selectedDepartamento} onChange={handleDepartamento}>
                        {/* if departamentos has any data it loads the select with map function*/}
                        {
                            departamentos.map((departamento) => (
                            <option key={departamento.id} value={departamento.id}>
                                {departamento.nombre}
                            </option>
                            ))
                        }
                    </select>
                </div>

                <div id='container-selectCiudad'>
                    <label htmlFor='selectCiudad'>Ciudad</label>
                    <select id="selectCiudad" ref={selectedCiudad}> 
                        {
                            ciudades.map((ciudad) => (
                                <option key={ciudad.id} value={ciudad.id}>
                                    {ciudad.nombre}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <div id="container-birthdate-AddParticipant">
                    <label htmlFor='inputBirthdateParticipant'>Fecha de nacimiento</label>
                    <input type="date" id="inputBirthdateParticipant" ref={birthdate}/>
                </div>

                <div id="container-ocupation">
                    <label htmlFor='inputOcupation'>Ocupación</label>
                    <select id="inputOcupation" ref={occupation}>
                        {
                            occupations.length >0 && occupations.map((occupation) => (
                                <option key={occupation.id} value={occupation.id}>
                                    {occupation.ocupacion}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <div id="container-addParticipant-btn">
                    <input type="button" value="Agregar" onClick={ValidateData}></input>
                </div>

            </form>
            <div id="container-message-AddParticipant">
                <p id="addParticipant-message">{message}</p>
            </div>

        </div>  
    )
}

export default AddParticipant