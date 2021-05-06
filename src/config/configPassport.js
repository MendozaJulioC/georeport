const fetch = require('node-fetch');
const passport = require('passport');
const LocalStrategy = require ('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { pool } = require('../config/dbConfig');

passport.use( new LocalStrategy({
    usernameField: 'email',
    passwordField:'password'
}, async (email, password, done)=>{
   let user=[];
   const respuestaQuery= await pool.query(`select * from auth.tbl_users where email=$1`,[email]);
    //console.log(respuestaQuery.rows);
    let tam= respuestaQuery.rows.length
   
    if (tam>0) {
        user=respuestaQuery.rows
        isEmail(email,password,user, done)  
    } else{
        return done(null,false,{message:"Usuario no registrado "})
    }
})
);

passport.serializeUser((user,done)=>{
  
    done(null,user[0].id);
});

passport.deserializeUser((id,done)=>{
  // console.log("deseria id " ,id)
    finalFunction(id,done)
    //user.findById(id, (error,user)=>{
    //  done(err,user);
  //})
})

async function isEmail(email, pass,user,done){
    console.log(user[0].email);
    if (email == user[0].email) {
        isMatch(pass, user ,done) 
    } else{
      return done(null,false,{message:"Usuario no registrado "})
    }
}

async function isMatch(password, user,done)
{
    const match = await bcrypt.compare(password, user[0].password)
    console.log("match ",match)
    if (match) {
        return done(null,user,{message: user[0].fname});
    }else{
        return done(null,  false, { message: 'Datos de inicio de session errados  !!!'}  )
    }
}

async function finalFunction(id,done){
    const respuestaQuery= await pool.query(`
    select 
	    auth.tbl_users.id, fname, sname, lname, lsname, cod_unidad,nom_unidad, cod_lider,nom_lider,
	    identificacion, auth.tbl_users.tipo_vinculacion, auth.tbl_tipovinculacion.tipo_vinculacion as nombre_vinculacion,
        auth.tbl_users.nom_empleo, auth.tbl_nom_empleo.nom_empleo as empleo, email, tel_contacto
    from auth.tbl_users
    LEFT JOIN auth.tbl_unidad ON auth.tbl_users.cod_unidad = auth.tbl_unidad.id
    LEFT JOIN auth.tbl_lider  ON auth.tbl_users.cod_lider = auth.tbl_lider.id
    LEFT JOIN auth.tbl_tipovinculacion  ON auth.tbl_users.tipo_vinculacion =auth.tbl_tipovinculacion.id
    LEFT JOIN auth.tbl_nom_empleo ON auth.tbl_users.nom_empleo = auth.tbl_nom_empleo.id
    where  auth.tbl_users.id=$1`,[id]);
    if (respuestaQuery.rows) {
        return done(null,respuestaQuery.rows)
    }else{
        return done(null, false, { message: 'Datos de inicio de session Errados  !!!'}  )   
    }
}
//module.exports= {}