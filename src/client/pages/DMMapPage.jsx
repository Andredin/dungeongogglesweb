import React, { useState, useEffect } from 'react';

import { useParams } from "react-router-dom";
import db from '../utils/db';
import gridUtils from '../utils/grid';

import LinkIcon from '@material-ui/icons/Link';
import { Grid, AppBar, Toolbar, Typography, Tooltip, Badge, IconButton } from '@material-ui/core';
import { MapCanvas } from '../utils/MapCanvas';

export const DMMapPage = () => {
    const { dmId } = useParams()
    const [playerId, setPlayerId] = useState(null)
    const [url, setUrl] = useState(null)
    const [grid, setGrid] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        const unsubscribe = db.subscribeToDmMap(dmId, (dbError, dbMap) => {
            if (dbError) {
                setError(dbError)
                return
            }
            setPlayerId(dbMap.playerId)
            setUrl(dbMap.url)
            setGrid(dbMap.grid != null? dbMap.grid : gridUtils.defaultGrid())
        })

        return () => {};
    }, [dmId]);

    const copyLink = () => {
        const el = document.createElement('textarea');
        el.value = 'TODOLINK/' + playerId;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    }

    const title = `Dungeon Goggles (DM) ${playerId || error ? '': 'loading ...'}`;

    const playerMapLink = playerId && (
        <Tooltip title='Copy Player Link'>
            <IconButton color='inherit' onClick={copyLink}>
                <Badge color='secondary'>
                    <LinkIcon />
                </Badge>
            </IconButton>
        </Tooltip>
    );

    return (
        <Grid container style={{height: '100%'}}>
            <Grid item xs={12} style={{height: '8%'}}>
                <AppBar>
                    <Toolbar variant="dense">
                        <Typography variant='h6' className='title'>{title}</Typography>
                        {playerMapLink}
                    </Toolbar>
                </AppBar>
            </Grid>
            <Grid item xs={12} style={{height: '92%'}}>
                <MapCanvas dmId={dmId} url={url} grid={grid} height='92%' width='100%'></MapCanvas>
            </Grid>
        </Grid>
    );
}