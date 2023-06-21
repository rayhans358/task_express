const express = require('express');
const path = require('path');
const app = express();
const router = require('./routes');
const log = require('./middlewares/logger');

// Untuk memakai routing bisa menggunakan app.use
app.use(log);
app.use(express.urlencoded({extended: true}))

// Mengatasi static
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'uploads')))

app.use(router);

// Menagatasi error 404
app.use((req, res, next) => {
  res.status(404);
  res.send({
    status: 'failed',
    message: 'Resource ' + req.originalUrl + ' Not found'
  });
});

app.listen(3000, () => console.log('Server: http://localhost:3000'));