
const express = require('express');
const app = express();
let googlesheet =  require('../spreadsheet');
const obternerVideos = async (req, res)=>{
    try {
        let popular=[];
        registros = await googlesheet.accederGooogleSheet();
        //console.log(registros);
        let sum1=0, sum2=0,sum3=0,sum4=0,sum5=0;
        for (let index = 0; index < registros.length; index++) {
            //const element = array[index];
            if((registros[index].Comuna=='1') ){ sum1 =  parseFloat(registros[index].Total);}
            if((registros[index].Comuna=='2') ){ sum2 =  parseFloat(registros[index].Total) }
            if((registros[index].Comuna=='3') ){ sum3 =  parseFloat(registros[index].Total)}
        }
        res.render('index.html', { title:"Google Prueba",  sum1, sum2,sum3})
    } catch (error) {
    }
}

const pintarForm = async (req, res)=>{
    res.render('form.html',    {title:"Formulario Google"});
}

const guardarVideo = async(req, res)=>{
  googlesheet.guardarVideo(req.body);
  registros = await googlesheet.accederGooogleSheet();
  res.redirect('/');
}


module.exports = {  obternerVideos  : obternerVideos,
                    pintarForm      : pintarForm,
                    guardarVideo    : guardarVideo,
                
}