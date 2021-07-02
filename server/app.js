const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/', require('./routes/index'));

app.listen(port, () => console.log(`started ${port}`));