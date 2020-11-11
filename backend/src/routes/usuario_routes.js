const { Router } = require('express');
const router = Router();
const jwt = require('jsonwebtoken');

const { EstaAutenticado } = require('../controllers/validaciones')
const { getUsers, registrarUsuario, getUserById, LoguearUsuario, MuroUsuario, Logout } = require('../controllers/usuarios_controller');

router.get('/', getUsers);
router.get('/user/:user_id', getUserById);
router.post('/signup', registrarUsuario);
router.post('/signin', LoguearUsuario);
router.get('/wall', verifyToken, MuroUsuario);
router.route('/logout')
    .get(EstaAutenticado, Logout);

function verifyToken(req, res, next) {
    if(!req.headers['authorization']){
        return res.status(401).send('Usuario no autorizado')
    }
    const token = req.headers.authorization.split(' ')[1]
    if(token === null) {
        return res.status(401).send('Usuario no autorizado')
    }
    const payload = jwt.verify(token, 'secretkey')
    req.userId = payload.user_id;
    next();
}

module.exports = router; 

