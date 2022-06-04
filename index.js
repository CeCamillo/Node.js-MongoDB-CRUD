// Config inicial
const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

// Forma de ler JSON / middlewares
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

// Rotas da API
const personRoutes = require('./Routes/personRoutes');
// middleware com as rotas
app.use('/person', personRoutes);
// Rota inicial/ endpoint
app.get('/', (req, res) => {
  // Mostrar req
  res.json({ message: 'Oi Express!' });
});

// Entregar uma porta

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.eojz2mh.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(3000);
  })
  .catch((err) => console.log(err));
