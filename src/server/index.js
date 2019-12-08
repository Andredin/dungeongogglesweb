require('dotenv').config();
const express = require('express');
const os = require('os');
const bodyParser = require('body-parser');
const { create } = require('./create');

const app = express();

app.use(express.static('dist'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    // retorna index
    res.send("Index");
});

app.post('/api/create', async (req, res) => await create(req, res));

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
