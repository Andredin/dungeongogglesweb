const express = require('express')
const app = express()
const port = process.env.PORT || 5000;

app.get('/index', (req, res) => res.send({ express: 'Hello World!' }))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))