//Importamos passport asi como la libreria de estrategia local
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//Importamos el Controlador del Usuario, ya que se ocuparán algunas de sus funciones
const UsuarioController = require('../controllers/usuarios_controller')

//Importación de la conexIón a la db
const conexion_pg = require('../dbs/postgresql');
const validaciones = require('../controllers/validaciones');

//ESTRATEGIA DE AUTENTICACION LOCAL
passport.use('local-login', new LocalStrategy({
    usernameField: 'usuario',
    passwordField: 'password'
}, async (usuario, password, done) => {
    console.log('este es el correo: ' + usuario)
    var values = [usuario]

    const resultado = await conexion_pg.query("SELECT user_id, user_email FROM users where user_email = $1;", values);
    UsuarioEncontrado = resultado.rows[0]
    console.log('holiii')
    console.log(resultado.rows[0])

        //Si el usuario no exite se termina la función
    if (!UsuarioEncontrado) {
        console.log('Usuario no encontrado')
        return done(null, false, { message: 'Usuario no encontrado' })
    } else {//Caso contrario se verificará la contraseña
        console.log("Usuario si encontrado")
        const password_in_session = await conexion_pg.query("SELECT user_pass FROM users where user_email = $1 ", [usuario]) //Buscamos la contraseña del usuario ingresado
        console.log('este es la password: ' + password_in_session.rows[0].user_pass)
        const passValidate = validaciones.CompararPassword(password, password_in_session.rows[0].user_pass) //Comparamos la contraseña de la BD con la ingresada
        //Si las contraseñas coinciden guarda al usuario en la sesion
        if (passValidate) {
            console.log("La contraseña SI coinciden ")
            return done(null, UsuarioEncontrado)
        } else {
            console.log("La contraseña NO coinciden ")
            return done(null, false, { message: 'La contraseña es incorrecta' })
        }
    }
}));

//Agrega al usuario a la sesion de passport para evitar el logeo en cada pagina
passport.serializeUser((user, done) => {
    console.log("ID Usuario Serializado: " + user.user_id)
    done(null, user.user_id);
});

passport.deserializeUser(async (id, done) => {
    var DatosUsuarioEnSesion = ''
    //Este metodo ha sido moficado para poder trabajar con postgresql y sequelize, siguiendo el metodo de la documentacion de passport
    //Buscamos el Usuario en la base de datos por medio del id que se habia almacenado en la session de passport
    const UsuarioEnSesion = await conexion_pg.query("SELECT * FROM users where user_id = $1;", [id])
    console.log(UsuarioEnSesion)
    //Si existe el usuario
    if (UsuarioEnSesion) {
        DatosUsuarioEnSesion = {
            id_usuario: UsuarioEnSesion.rows[0].user_id,
            usuario: UsuarioEnSesion.rows[0].user_email,
        }
        console.log('--------- aqui es el serializador -----------')
        console.log(DatosUsuarioEnSesion)
        done(null, DatosUsuarioEnSesion) //Esta funcion se encarga de agg nuestro usuario al req.user (metodo propio de passport)al 
    }
});

//Middleware para verificar si está autentificado, debe llamarse antes de ingresar a cualquier ruta.
exports.estaAutenticado = (req, res, next) => {
    if (req.isAuthenticated()) {
        console.log('Está Autenticado')
        return next();
    }
    res.status(401).send('No está Auntenticado')
}

