const mysql = require('mysql');
const mysqlConnection = mysql.createConnection({
    database: 'bd_sistema_produccion',
        
        host: '127.0.0.1',
        user: 'root',
        password: ''

});
mysqlConnection.connect(function (err) {
   if (!err) {
       console.log('Conexión Exitosa');
   }else{
       console.log(err);
   }
});

module.exports = mysqlConnection;