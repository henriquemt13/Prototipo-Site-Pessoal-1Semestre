var desenvolvimento = false;

var configuracoes = {
    producao: {
        server: "servidor01191125.database.windows.net",
        user: "hmt01191125",
        password: "#Gf47864718876",
        database: "BancoProjeto",
        options: {
            encrypt: true
        },
        pool: {
            max: 4,
            min: 1,
            idleTimeoutMillis: 30000,
            connectionTimeout: 5000
        }
    },
    desenvolvimento: {
        server: "servidor01191125.database.windows.net",
        user: "",
        password: "",
        database: "BancoProjeto",
        options: {
            encrypt: false
        }
}
}
 
var sql = require('mssql');
sql.on('error', err => {
    console.error(`Erro de Conexão: ${err}`);
});

var perfil = desenvolvimento ? 'desenvolvimento' : 'producao';

function conectar() {
  return sql.connect(configuracoes[perfil])
  // return new sql.ConnectionPool();  
} 

module.exports = {
    conectar: conectar,
    sql: sql
}