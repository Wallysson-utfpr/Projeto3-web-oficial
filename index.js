const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');
var Usuario = require('./model/usuario');
var Login = require('./model/login');
var upload = require('./config/configMulter');

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));


app.get('/', function (req, res) {
    res.render('login.ejs');
})

/*
//cadastrando email e senha banco
app.post('/', function (req, res) {
    var login = new Login({
        email: req.body.iptEmail,
        password: req.body.iptSenha
    })

    login.save(function (err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/add');
        }
    })
})

*/
app.post('/authenticate', (req, res) => {
    const { iptEmail, iptSenha } = req.body;
    Login.findOne({ iptEmail })
    .then((data) => {
        if (data.email == iptEmail && data.password == iptSenha) res.redirect('/add')
        else res.redirect('/?=SenhaIncorreta')
    })
    
})

app.get('/add', function (req, res) {
    res.render('index.ejs');
})

app.post('/add', upload.single("txtFoto"), function (req, res) {
    var usuario = new Usuario({
        nome: req.body.txtNome,
        alta: req.body.txtAlta,
        baixa: req.body.txtBaixa,
        foto: req.file.filename
    })
    usuario.save(function (err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/add');
        }
    })
})

app.listen(3000, function () {
    console.log("Conexão inicializada.");
})

