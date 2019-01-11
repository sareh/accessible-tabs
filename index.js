'use strict';

const express = require('express');
const app = express();
const port = 3000

app
    .use(express.static('public'))
    .get('/', (req, res) => res.send('Hello!'));

app.listen(port, () => console.log(`Tabs on http://localhost:${port}/1.html`));