const { Router } = require('express');
const router = Router();

const { obternerVideos, pintarForm, guardarVideo }= require('../controllers/google.controllers')

router.get('/' ,obternerVideos )
router.get('/form', pintarForm)
router.post('/form',guardarVideo)



const { getdesagregacion, getGeorref }= require('../controllers/index.controllers')

router.get('/desagregacion', getdesagregacion)
router.get('/georref', getGeorref)



module.exports = router;