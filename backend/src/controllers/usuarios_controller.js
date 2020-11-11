const conexion_pg = require('../dbs/postgresql');
const passport = require('passport');//Controla la autentificacion de los usuarios
const datetime = require('node-datetime');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Encriptacion, Desencriptar, EncryptPassword, CompararPassword } = require('./validaciones')

const usuarios_controller = {  };

usuarios_controller.encryptPassword = (user_pass) => {
    return bcrypt.hashSync(user_pass, bcrypt.genSaltSync(10)); //Recibe la parametro a encryptar y la cantidad de veces que se realizara la encriptacion 
}

usuarios_controller.getUsers = async (req, res) => {
    const response = await conexion_pg.query('SELECT * FROM users')
    res.json(response.rows);
}

usuarios_controller.getUserById = async (req, res) => {
    const id = req.params.user_id
    try {
        const response = await conexion_pg.query('SELECT * FROM users WHERE user_id = $1', [id]);
        res.json(response.rows);
    } catch (error) {
        console.log("Error:" + error)
    }
}

usuarios_controller.registrarUsuario = async (req, res) => {

    var { f_name, l_name, user_pass, user_email, user_country, user_gender, user_birth, user_reg_date } = req.body
    var dt = datetime.create();
    user_pass = usuarios_controller.encryptPassword(user_pass);
    user_reg_date = dt.format('Y-m-d H:M:S');
    
    try {
        const response = await conexion_pg.query('INSERT INTO users (f_name, l_name, user_pass, user_email, user_country, user_gender, user_birth, user_reg_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
        [f_name, l_name, user_pass, user_email, user_country, user_gender, user_birth, user_reg_date]);
        console.log(response);
        const user = await conexion_pg.query('SELECT * FROM users WHERE user_email = $1', [ user_email ]);
        const token = jwt.sign({ user_id: user.rows[0].user_id }, 'secretkey')
        console.log({token})
        return res.status(200).json({ token })
    } catch (error) {
        console.log("Error registro: " + error)
    }
};

usuarios_controller.LoguearUsuario = async (req, res, next) => {

    console.log('ID Session User: ' + req.sessionID);
    passport.authenticate('local-login', (err, usuario, info) => {
        try {
            if (err) {
                next(('Esto es un error: ' + err));
            }
            if (!usuario) {
                return res.status(400).send('Usuario o Contraseña no válidos')
            }
            console.log('ahorita vemos que pedo')
            
            req.logIn(usuario, (err) => {
                console.log(usuario)
                if (err) {
                    next(err);
                }
                const token = jwt.sign(usuario.user_id, 'holaaa');
                req.session.id_usuario = usuario.user_id
                console.log({token})
                console.log('ID Session User: ' + req.sessionID)
                console.log('Se ha almacenado la sesion del usuario: ' + req.session.id_usuario)
                console.log('Datos de usuario en req')
                console.log(req.user)
                user = req.user;
                res.json({ user, token })
                //res.send(usuario)
            })
        } catch (error) {
            console.log("este es el error: " + error)
        }
    })(req, res);
};

usuarios_controller.Logout = async (req, res) => {
    res.clearCookie('sessionID')
    req.session.destroy(err => {
        if (err) {
            console.log('ha ocurrido un error')
        }
    })
    req.logout();
    console.log('ID Session User TERMINADA: ' + req.sessionID)
    res.send('Sesion Terminada')
}


/*
usuarios_controller.LoguearUsuario = async (req, res) => {

    var { user_email, user_pass } = req.body

    try {
        const user = await conexion_pg.query('SELECT * FROM users WHERE user_email = $1', [ user_email ]);
        if(!user.rowCount > 0) return res.status(401).send('Correo no encontrado en la base de datos')
        console.log('correo encontrado')
        if(user.rows[0].user_pass !== user_pass) return res.status(401).send('Contraseña incorrecta')
        console.log('contraseña correcta')
        const token = jwt.sign({ user_id: user.rows[0].user_id }, 'secretkey');
        req.session.id_usuario = usuario.id_user
        console.log({token})
        return res.status(200).json({ token })
    } catch (error) {
        console.log("Error loguin: " + error)
    }
    
};
*/

usuarios_controller.MuroUsuario = (req, res) => {
    res.json([
        {
            nombre: "Servidor",
            mensaje: "Hola mundo"
        },
        {
            nombre: "Servidor",
            mensaje: "Hello World"
        }
    ])
}

module.exports = usuarios_controller;

