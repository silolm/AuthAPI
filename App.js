const express = require('express'),
    bodyParser = require('body-parser'),
    jwt = require('jsonwebtoken'),
    config = require('./config/config'),
    dbConfig = require('./config/database.config'),
    mongoose = require('mongoose'),
    app = express();// 1

app.set('masterKey', config.masterKey);// 2
app.use(bodyParser.urlencoded({extended: true}));// 3
app.use(bodyParser.json());// 4

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log(" * Cargada y preparada... como mi polla");
}).catch(err => {
    console.log(" Algo ha pasado... saliendo : ", err);
    process.exit();
});//5

app.get('/', function (req, res) {
    res.send({message: "API de autenticación"});
});

function logear(user, pass) {
    return true;
}

app.post('/auth', (req, res) => {
    if (logear(req.body.user, req.body.pass)) {
        const payload = {
            role: "admin"
        };
        const token = jwt.sign(payload, app.get('masterKey'), {
            expiresIn: 1440
        });
        res.json({
            token: token
        });
    } else
        res.json({mensaje: "Invalid username"})

});

app.listen(3000, () => {
    console.log('Corriendo en http://localhost:3000')
});// 6
