
const express = require('express');
const app = express();


const getHome= async(req, res)=>{
    try {
        res.render('./home/index.html', {
            title: "Bienvenido"
        })
    } catch (error) {
    }
}

const getdesagregacion = async(req, res)=>{

    try {
        res.render('desagregacion.html', {
            title: "Desagregacion"
        })
    } catch (e) {
        console.error('Error getdesagregacion ', e);
    }
  }
  
  

  
  const getGeorref = async(req, res)=>{
  
      try {
          res.render('./geo/georref.html', {
              title: "Georreferenciación"
          })
      } catch (e) {
          console.error('Error getGeorref ', e);
      }
    }




module.exports = { 

  
    getHome , getGeorref
}