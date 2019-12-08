import React, { useState, useEffect } from 'react';

import { useParams } from "react-router-dom";
import db from './utils/db';

import LinkIcon from '@material-ui/icons/Link';
import { Grid, AppBar, Toolbar, Typography, Tooltip, Badge, IconButton } from '@material-ui/core';
import { paper, Group, Item, Layer, Path, PointText, Raster, Point } from 'paper/dist/paper-core'
import { Rectangle } from 'paper';

let subscribed = false;

export const Map = () => {
    const { dmId } = useParams()
    const [grid, setGrid] = useState([[1, 1, 1, 1, 1], [0, 1, 1, 0, 0], [0, 0, 0, 0, 0], [0, 0, 1, 0, 0], [0, 0, 0, 1, 0]])
    const [url, setUrl] = useState(null);
    const [playerId, setPlayerId] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if(subscribed) return;
        subscribed = true;
        // db.subscribeToDmMap(dmId, (dbError, dbMap) => {
        //     if (error) {
        //         setError(dbError);
        //         return;
        //     }
        //     console.log(dbMap);
        //     setUrl(dbMap.url);
        //     setPlayerId(dbMap.playerId);
        // });

        setUrl('https://i.pinimg.com/originals/76/af/fc/76affcc8c6157a3a9a1a5424a87ab57d.jpg');
        setPlayerId('1234');
    });

    const copyLink = () => {
        const el = document.createElement('textarea');
        el.value = 'TODOLINK/' + playerId;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    }

    const title = `Dungeon Goggles (DM) ${url || error ? '': 'loading ...'}`;

    const playerMapLink = playerId && (
        <Tooltip title='Copy Player Link'>
            <IconButton color='inherit' onClick={copyLink}>
                <Badge color='secondary'>
                    <LinkIcon />
                </Badge>
            </IconButton>
        </Tooltip>
    );
    
    const drawMap = () => {
        //TODO: chamar no resize do browser
        var canvas = document.getElementById('mapCanvas');
        paper.setup(canvas);

        // Map Layer
        var mapLayer = new Layer()
        var map = new Raster({
            source: url,
            position: new paper.Point(canvas.width/2, canvas.height/2)
        });
        map.onLoad = function() {
            // Map scale
            const scaleFactor = Math.min(canvas.width / map.width, canvas.height / map.height)
            map.scale(scaleFactor)

            // Grid Layer
            var gridLayer = new Layer()
            gridLayer.activate()
            var gridSize = grid.length
            var rectangleSizeX = (map.width * scaleFactor) / gridSize
            var rectangleSizeY = (map.height * scaleFactor) / gridSize
            var initX = map.bounds.topLeft.x
            var initY = map.bounds.topLeft.y
            for(var i = 0; i < gridSize; i++){
                for(var j = 0; j < gridSize; j++){
                    if(grid[j][i] == 0){
                        var rectX = initX + (i * rectangleSizeX)
                        var rectY = initY + (j * rectangleSizeY)
                        var rectangle = new Path.Rectangle(new Point(rectX, rectY), new Point(rectX + rectangleSizeX, rectY + rectangleSizeY))
                        rectangle.fillColor = 'white'
                        rectangle.strokeColor = 'black'
                        rectangle.strokeWidth = 5
                        rectangle.opacity = 0.5;
                    }
                }
            }
        }
    }

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
            <Grid item xs={12} style={{height: '95%', padding: 20}}>
                <canvas id='mapCanvas' resize='true'></canvas>
            </Grid>
        </Grid>
    );
}