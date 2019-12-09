import React, { useState } from 'react';

import { GridCanvas } from './GridCanvas';
import { ImgCanvas } from './ImgCanvas';

export const MapCanvas = (props) => {
    const [mapCoords, setMapCoords] = useState(null)

    const changeMapCoords = (newMapCoords) => {
        setMapCoords(JSON.stringify(newMapCoords))
    }

    return (
        <React.Fragment>
            <ImgCanvas url={props.url} changeMapCoords={changeMapCoords} width={props.width} height={props.height}/>
            {mapCoords? <GridCanvas dmId={props.dmId} mapCoords={mapCoords} width={props.width} height={props.height}/> : ''}
        </React.Fragment>
    );
}