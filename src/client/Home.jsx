import React, { useEffect, useState } from 'react';

import ReactImage from './react.png';
import { useHistory } from "react-router-dom";

export const Home = () => {
    const [username, setUsername] = useState(null);
    const history = useHistory();

    useEffect(() => {
        fetch('/api/getUsername')
        .then(res => res.json())
        .then(user => setUsername(user.username));
    });

    const create = async () => {
        const res = await fetch('/api/create', { method: 'POST'});
        const mapData = await res.json();
        history.push(`/dm/${mapData.idDm}`);
    }

    return (
        <div>
            {username ? <h1>{`Hello ${username}`}</h1> : <h1>Loading.. please wait!</h1>}
            <img src={ReactImage} alt="react" />
            <button onClick={create}>create</button>
        </div>
    );
}