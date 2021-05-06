const express = require('express');
const app = express();
const fetch = require('node-fetch');
const bcrypt = require('bcrypt');
const passport = require('passport')

const { pool } = require('../config/dbConfig');




const getRegister = async (req,res)=>{
    try {
        const message = req.flash('message')[0]  ;
        const response   = await pool.query('select * from auth.tbl_unidad');
        const response2  = await pool.query('select * from auth.tbl_lider');
        const response3  = await pool.query('select * from auth.tbl_tipovinculacion');
        const response4  = await pool.query('select * from auth.tbl_nom_empleo');

  
        res.render('./auth/register.html', {
                title: "Registro",
                equipos: response.rows,
                lideres: response2.rows,
                tipovinculacion: response3.rows,
                tipoempleos : response4.rows,
                errors:[],message,
                nombre1:"", nombre2:"", apellido1:"", apellido2:"", equipo:"" , lider:"", identificacion:"", email:"", telefono:"",
                password:"",confirmpassword:"", vinculacion:"" , empleos:""
        })
        
      
    } catch (error) {
        console.log('Error getRegister ', error)
    }
}

const postRegister = async (req, res)=>{
    try {
        const message = req.flash('message')[0]  ;
        var errors=[];
        const   {   nombre1, nombre2, apellido1, apellido2, equipo , lider, identificacion, email, telefono,
                    password,confirmpassword, vinculacion , empleos
                }   = req.body;
        if(!nombre1||!apellido1||!equipo ||!lider || !identificacion || !email || !telefono || !password || !confirmpassword || !vinculacion || !empleos){  errors.push({message: "Es necesario llenar todos los campos"})};
        if (!nombre1)   { errors.push({message:"Ingrese el nombre del usuario"}) }
        if (!apellido1) { errors.push({message:"Ingrese el Primer apellido del usuario"}) }
        if (equipo==0) { errors.push({message:"Ingrese el equipo del usuario"}) }
        if (lider==0) { errors.push({message:"Ingrese el líder del usuario"}) }
        if (!identificacion) { errors.push({message:"Ingrese el número de identificación"}) }
        if (!email) { errors.push({message:"Ingrese el email del usuario"}) }
        if (!telefono) { errors.push({message:"Ingrese el teléfono del usuario"}) }
        if (!password) { errors.push({message:"Ingrese el password del usuario"}) }
        if (!confirmpassword) { errors.push({message:"Ingrese la confirmación del password del usuario"}) }
        if (vinculacion==0) { errors.push({message:"Ingrese el tipo de vinculación del usuario"}) }
        if (empleos==0) { errors.push({message:"Ingrese el tipo de empleo del usuario"}) }
        if (password !=  confirmpassword)  {errors.push({message:"Password no coinciden!!!"})}
        if (password.length<6 )  {errors.push({message:"Password debe contener más de 6 carateres!!!"})}

        if(errors.length>0){
            const response   = await pool.query('select * from auth.tbl_unidad');
            const response2  = await pool.query('select * from auth.tbl_lider');
            const response3  = await pool.query('select * from auth.tbl_tipovinculacion');
            const response4  = await pool.query('select * from auth.tbl_nom_empleo');
  
       
            res.render('./auth/register.html', {
                     title: "Registro",
                     equipos: response.rows,
                     lideres: response2.rows,
                     tipovinculacion: response3.rows,
                     tipoempleos : response4.rows,
                     message,
                     errors: errors,
                     nombre1, nombre2, apellido1, apellido2, equipo , lider, identificacion, email, telefono,
                    password,confirmpassword, vinculacion , empleos
             })
        }else{
            let haspass = await bcrypt.hash(password, 10);
            const respuesta   = await pool.query('select * from auth.tbl_users where email=$1 ', [email] );
            validaemail= respuesta.rows
            console.log(validaemail)
            if (validaemail.length>0){
                errors.push({message:"Este email ya esta registrado"}) 
                res.render('./auth/register.html', {
                    title: "Registro",
                    equipos: response.rows,
                    lideres: response2.rows,
                    tipovinculacion: response3.rows,
                    tipoempleos : response4.rows,
                    message,
                    errors: errors,
                    nombre1, nombre2, apellido1, apellido2, equipo , lider, identificacion, email:"", telefono, password,confirmpassword, vinculacion , empleos
                })

            }else{
                const registro= await pool.query(` 
                INSERT INTO auth.tbl_users(
                    id, fname, sname, lname, lsname, cod_unidad, cod_lider,  identificacion,     email,      password,       tipo_vinculacion, nom_empleo, tel_contacto)
                VALUES (gen_random_uuid (),'${nombre1}','${nombre2}','${apellido1}', '${apellido2}',    ${equipo},      ${lider},   ${identificacion},  '${email}','${haspass}',     '${vinculacion}',  '${empleos}', ${telefono});
                `);
                req.flash('message', req.body.fullname)
                res.redirect('/');
            }
        }               


        
    } catch (error) {
        console.error('Error postRegister',error)
    }
}                                                                       

const postLoguin = passport.authenticate('local',{
    failureRedirect:'/',
    successRedirect:'/registro',
    failureFlash: true
})
const getLogout = async (req, res)=>{
    req.logout();
    req.flash('message', 'Has cerrado la session');
    res.redirect('/')
}
module.exports = { getRegister, postRegister , postLoguin, getLogout}