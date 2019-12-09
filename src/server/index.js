require('dotenv').config();
const express = require('express');
const os = require('os');
const bodyParser = require('body-parser');
const { create } = require('./create');
const db = require('./db');

const app = express();

app.use(express.static('dist'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    // retorna index
    res.send("Index");
});

app.post('/api/create', async (req, res) => await create(req, res));

app.get('/api/getDmId/:playerId', async (req, res) => {
    const playerId = req.params.playerId;
    if (!playerId) {
        res.status(500).send("missing missing player id");
        return;
    }

    try {
        const maps = db.collection('maps');
        const snapshot = await maps.where('playerId', '==', playerId).get();

        if(snapshot.empty) {
            res.status(500).send('map not found');
        }

        const map = snapshot.docs[0].data();
        const dmId = map.dmId;
        res.send({ dmId });
    } catch (error) {
        res.status(500).send("error finding map");
    }
})

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
