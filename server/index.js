const express = require('express');
const path = require('path');
const http = require('http');

const app = express();
const router = express.Router()

app.use(express.static(path.join(__dirname, '..', 'dist')));
app.use('/dataset', express.static(path.join(__dirname, '..', 'dataset')));

const routes = require('./routes')
app.use('/', routes);

/** Get port from environment and store in Express. */
const port = process.env.PORT || '3000';
app.set('port', port);

/** Create HTTP server. */
const server = http.createServer(app);
/** Listen on provided port, on all network interfaces. */
server.listen(port, () => console.log(`Server Running on port ${port}`))
