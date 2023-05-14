const express = require('express');
const server = express();
const route = require('./route');
const path = require('path');
const { resolve } = require('path');
const cors = require('cors');
const db = require('../src/db/init.js');

db.init();
server.use(cors());
server.set('views', path.join(__dirname, 'views'));
server.use(express.urlencoded({ extended: true }));
server.use(
  '/images',
  express.static(resolve(__dirname, '..', 'tmp', 'uploads')),
);
server.use(express.json());

server.use(route);

server.listen(2023, () => console.log('Running server on port 2023'));
