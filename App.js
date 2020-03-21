const express = require('express'),
    bodyParser = require('body-parser'),
    config = require('./config/config');
app = express();// 1

app.set('masterKey', config.masterKey);// 2
app.use(bodyParser.urlencoded({extended: true}));// 3
app.use(bodyParser.json());// 4

require('./app/routes/authAPI.routes')(app);

app.listen(3000, () => {
    console.log('Corriendo en http://localhost:3000')
});// 5