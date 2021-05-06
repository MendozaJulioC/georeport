require('dotenv').config();
const app = require('./app');
app.listen((process.env.PORT || 500), function(){ console.log(`listening on * : ${process.env.PORT}`); }); 