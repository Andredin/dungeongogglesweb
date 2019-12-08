import React, { useState, useEffect } from 'react';

import { useParams } from "react-router-dom";
import db from './utils/db';

import LinkIcon from '@material-ui/icons/Link';
import Button from '@material-ui/core/Button';
import { Grid, AppBar, Toolbar, Typography, Hidden, ButtonGroup, TextField, Tooltip, Badge, IconButton } from '@material-ui/core';

export const Map = () => {
    const { dmId } = useParams()
    const [playerId, setPlayerId] = useState(null)
    const [grid, setGrid] = useState([[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]])
    const [url, setUrl] = useState(null);

    useEffect(() => {
        const fetchMap = async () => {
            // const map = await db.getDmMap(dmId);
            // setUrl(map.url);
            // setPlayerId(map.playerId);
            setUrl('https://i.pinimg.com/originals/76/af/fc/76affcc8c6157a3a9a1a5424a87ab57d.jpg');
            setPlayerId('1234');
        }
        fetchMap();
    });

    const copyLink = () => {
        const el = document.createElement('textarea');
        el.value = 'TODOLINK/' + playerId;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    }

    const title = `Dungeon Goggles (DM Mode) ${url ? '': 'loading ...'}`;

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
            <Grid item xs={12} style={{height: '5%'}}>
                <AppBar>
                    <Toolbar>
                        <Typography variant='h6' className='title'>{title}</Typography>
                        {playerMapLink}
                    </Toolbar>
                </AppBar>
            </Grid>
            <Grid item xs={12} style={{height: '95%'}}>
                <canvas id='mapCanvas'></canvas>
            </Grid>
        </Grid>
    );
}