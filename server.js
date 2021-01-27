const express = require('express');
const path = require('path');
const cors = require('cors');

const port = process.env.PORT || 8001;
const app = express();

app.set('port', port);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

/**
 * Ruta de la documentación del API
 */

app.use('/', require('./routes/api'));
app.use('/api/db', require('./routes/config.db'));
app.use('/api/usuario', require('./routes/usuario'));


app.listen(app.get('port'), () => {
  console.log('Servidor en linea, en el puerto ', app.get('port'));
});