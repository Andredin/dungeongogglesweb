import React, { useState, useEffect } from 'react';

import { useParams } from "react-router-dom";
import db from '../utils/db';

import { Grid, AppBar, Toolbar, Typography, Tooltip, Badge, IconButton } from '@material-ui/core';
import { MapCanvas } from '../utils/MapCanvas';

export const PlayerMapPage = () => {
    const { playerId } = useParams()
    const [url, setUrl] = useState(null)
    const [grid, setGrid] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        const unsubscribe = db.subscribeToPlayerMap(playerId, (dbError, dbMap) => {
            if (dbError) {
                setError(dbError)
                return
            }
            setUrl(dbMap.url)
            setGrid(dbMap.grid != null? dbMap.grid : JSON.stringify([[0]]))
        })

        return () => {};
    }, [playerId]);

    const title = `Dungeon Goggles (Player) ${url || error ? '': 'loading ...'}`;

    return (
        <Grid container style={{height: '100%'}}>
            <Grid item xs={12} style={{height: '8%'}}>
                <AppBar>
                    <Toolbar variant="dense">
                        <Typography variant='h6' className='title'>{title}</Typography>
                    </Toolbar>
                </AppBar>
            </Grid>
            <Grid item xs={12} style={{height: '92%'}}>
                <MapCanvas url={url} grid={grid} height='92%' width='100%'></MapCanvas>
            </Grid>
        </Grid>
    );
}