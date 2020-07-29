'use strict';

const express = require('express');
require('./database');

const app = express();

const port = 8191;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.disable('x-powered-by');
app.set('trust proxy', 1);
app.use('/',require('./routes'));

app.listen(port, () => console.log(`Backend app listening at http(s)://url:${port}`));
