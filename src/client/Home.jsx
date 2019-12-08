import React, { useEffect, useState } from 'react';

import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import { Grid, TextField, AppBar, Toolbar, Typography } from '@material-ui/core';
import MapIcon from '@material-ui/icons/Map';

export const Home = () => {
    const history = useHistory();
    const [url, setURL] = useState(0);

    const create = async () => {
        const data = { url: url }
        const res = await fetch('/api/create', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        const mapData = await res.json();
        history.push(`/dm/${mapData.idDm}`);
    }

    return (
        <Grid container style={{height: '100%'}}>
            <Grid item xs={12} style={{height: '5%'}}>
                <AppBar>
                    <Toolbar>
                        <Typography variant="h6">Dungeon Goggles</Typography>
                    </Toolbar>
                </AppBar>
            </Grid>
            <Grid item xs={12} style={{height: '95%'}}>
                <Grid container spacing={2} justify={'center'} alignItems={'center'} style={{height: '100%'}}>
                    <Grid item>
                        <TextField style={{width: 500}} label='Image URL' type='search' variant='outlined' onChange={(event) => {setURL(event.target.value)}}/>
                    </Grid>
                    <Grid item>
                        <Button size='large' variant='contained' onClick={create} startIcon={<MapIcon />}>
                            Create
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}