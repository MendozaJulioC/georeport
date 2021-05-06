const { Router } = require('express');
const router = Router();
const { isAuthenticated, notAuthenticated }= require('../helpers/auth');
const { getHome, getGeorref }= require('../controllers/index.controllers');

router.get('/',  getHome);
router.get('/report/georref', getGeorref)




/*
router.get('/admin',  getAdmin).get('/auth/admin/:keyuser', getAuthAdmin)
router.get('/admin/lider', getLider)
router.post('/admin/lider', postLider)
router.get('/admin/edit/lider/:id',getEditLider )
router.post('/admin/update/lider/:id', postUpdateLider)
const {getRegister,postRegister, postLoguin, getLogout }= require('../controllers/auth.controllers');
router.get('/auth/register', getRegister);
router.post('/auth/register', postRegister)
router.post('/auth/login',notAuthenticated,postLoguin)
router.get('/auth/logout', getLogout)
*/
module.exports = router;