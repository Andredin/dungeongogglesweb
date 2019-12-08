const express = require('express');
const os = require('os');

const app = express();

app.use(express.static('dist'));

app.get('/', (req, res) => {
    // retorna index
    res.send("Index");
});

app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

app.post('/api/create', (req, res) => {
    const idDm = 123;
    const idPl = 321;

    // salva banco

    res.send({ idDm, idPl });
});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
