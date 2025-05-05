const {Router} = require('express')
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events')
const { validarJWT } = require('../middlewares/validar-jwt')
const { validarCampos } = require('../middlewares/validar-campos')
const { check } = require('express-validator')
const { isDate } = require('../helpers/isDate')
const router = Router()

//Todas tienen que estar validadas por el JWT
router.use(validarJWT)

//Obtener eventos
router.get('/', getEventos)

//Crear un evento
router.post(
    '/',
    [
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatoria').custom(isDate),
        check('end', 'La fecha de finalización es obligatoria').custom(isDate),
        validarCampos
    ], 
    crearEvento)

//Actualizar Evento
router.put(
    '/:id', 
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatoria').custom( isDate ),
        check('end','Fecha de finalización es obligatoria').custom( isDate ),
        validarCampos
    ],
    actualizarEvento 
);

//Borrar evento
router.delete('/:id', eliminarEvento)


module.exports = router