const { GoogleSpreadsheet} = require('google-spreadsheet');
const credenciales = require('./keys/credenciales.json');
let googleId = "1BAxDSHZq34ETyfKQC1Bdo4QDrabJjX1buoWnYs89q1o";

async function accederGooogleSheet(){
    const documento = new GoogleSpreadsheet(googleId);
    await documento.useServiceAccountAuth(credenciales);
    await documento.loadInfo();
    const sheet = documento.sheetsByIndex[1];
    //console.log(sheet);
    const registros = await sheet.getRows();

  //  console.log(registros);
   return registros;
}

//accederGooogleSheet()

async function guardarVideo(pObjeto){

    const documento = new GoogleSpreadsheet(googleId);
    await documento.useServiceAccountAuth(credenciales);
    await documento.loadInfo();

    const sheet= documento.sheetsById[0];
    await sheet.addRow(pObjeto);

}



module.exports = {
    accederGooogleSheet :   accederGooogleSheet,
    guardarVideo       :   guardarVideo,
  
}