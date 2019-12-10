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
            {props.url? <ImgCanvas url={props.url} changeMapCoords={changeMapCoords} width={props.width} height={props.height}/> : ''}
            {mapCoords && props.grid? <GridCanvas dmId={props.dmId} grid={props.grid} mapCoords={mapCoords} width={props.width} height={props.height}/> : ''}
        </React.Fragment>
    );
}