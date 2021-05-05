
const express = require('express');
const app = express();

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
          res.render('georref.html', {
              title: "Georreferenciación"
          })
      } catch (e) {
          console.error('Error getGeorref ', e);
      }
    }




module.exports = { 

    getdesagregacion: getdesagregacion,
    getGeorref      : getGeorref
}