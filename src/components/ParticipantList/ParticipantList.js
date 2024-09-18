import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useRef, useEffect } from 'react';
import { setParticipantList } from '../../features/user/userSlice';

const ParticipantList = () =>
{

    const id = useSelector(state => state.user.id);
    const apiKey = useSelector(state => state.user.apiKey);

    const [message, SetMessage] = useState("");
    const [filtered, SetFiltered] = useState(false);
    const [filteredParticipants, SetFilteredParticipants] = useState([]);
    //const [participants, SetParticipants] = useState([]);

    const filteredOccupation = useRef(null);

    //bring API data from store
    const occupations = useSelector(state => state.user.occupations);
    const participantList = useSelector(state => state.user.participantList);

    const dispatch = useDispatch();

    useEffect(() => {
        GetParticipants();
    }, [])


    useEffect(() => {
        //GetParticipants();
        HandleSelectFilter();
    }, [participantList]);

    const HandleSelectFilter = () => {
        if (filteredOccupation.current.value == "0")
        {
            SetFiltered(false);
        }
        else{
            SetFiltered(true);
            SetFilteredParticipants(participantList.filter((participant) => participant.ocupacion == filteredOccupation.current.value));
        }
    }

    const GetParticipants = async () =>
    {
        try{
            let response = await fetch(`https://censo.develotion.com/personas.php?idUsuario=${id}`,
            {
                method: 'GET',
                headers: 
                {
                    'Content-Type': 'application/json',
                    'apikey': apiKey,
                    'iduser': id
                }
            }
            )
            const data = await response.json();
            if (data.codigo == 200)
            {
                dispatch(setParticipantList(data.personas));   
            }
            else{
                SetMessage("Couldn't get participants, please try again later.");
                console.log(data.mensaje);
            }
        }
        catch(error){
            SetMessage(error);
            console.log(error);
        }
    }

    const DeleteParticipant = async (censusId) =>
    {
        console.log(censusId)
        try{
            let response = await fetch(`https://censo.develotion.com/personas.php?idCenso=${censusId}`,
            {
                method: 'DELETE',
                headers: 
                {
                'Content-Type': 'application/json',
                'apikey': apiKey,
                'iduser': id
                } 
            }
            )
            const data = await response.json();
            if (data.codigo != 200)
            {
                console.log(data.mensaje)
            }
            else
            {
                console.log("Se elimino correctamente")
                GetParticipants();
            }
        }
        catch(error)
        {
            console.log(error);
        }
    }

    return (
        <div id="container-ParticipantList">
            <div id="container-title-participants">
                <h2>Participants</h2>
            </div>
            <div id="container-filter-participants">
                <p>Filter by occupation:</p>
                <select id="select-participant-ocupation" ref={filteredOccupation} onClick={HandleSelectFilter}>
                    <option value="0">Todas</option>
                    {
                        occupations.length >0 && occupations.map(
                            (occupation) =>
                            <option key={occupation.id} value={occupation.id}>
                                {occupation.ocupacion}
                            </option>
                        )
                    }
                </select>
            </div>
            <div id="container-table">
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Departamento</th>
                            <th>Ciudad</th>
                            <th>Fecha de nacimiento</th>
                            <th>Ocupación</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        filtered ?
                            filteredParticipants.map
                            (
                                (participant) => (
                                    <tr key={participant.id}>
                                        <td>{participant.nombre}</td>
                                        <td>{participant.departamento}</td>
                                        <td>{participant.ciudad}</td>
                                        <td>{participant.fechaNacimiento}</td>
                                        <td>{participant.ocupacion}</td>
                                        <td>
                                            <input type="button" value="Eliminar" onClick={() => DeleteParticipant(participant.id)}></input>
                                        </td>
                                    </tr>
                                )
                            )
                        :
                        participantList.map
                        (
                            (participant) => (
                                <tr key={participant.id}>
                                    <td>{participant.nombre}</td>
                                    <td>{participant.departamento}</td>
                                    <td>{participant.ciudad}</td>
                                    <td>{participant.fechaNacimiento}</td>
                                    <td>{participant.ocupacion}</td>
                                    <td>
                                        <input type="button" value="Eliminar" onClick={() => DeleteParticipant(participant.id)}></input>
                                    </td>
                                </tr> 
                            )
                        )
                    }
                    </tbody>
                </table>
                </div>
        </div>
    )
}

export default ParticipantList