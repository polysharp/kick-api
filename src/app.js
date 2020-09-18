const express = require('express');
const HTTP_CODE = require('http-status-codes');
const cors = require('cors');

const router = require('./router');
const { API_VERSION } = require('./constants');
const { db } = require('./helpers');

const app = express();

db.connect();

app.use(cors());
app.use(express.json());

app.get('/status', (_, res) => res.sendStatus(HTTP_CODE.OK));
app.use(`/api/${API_VERSION}`, router);

module.exports = app;
