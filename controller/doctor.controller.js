const mysql = require('mysql');
const mysqlConfig = require('../helpers/mysql-config');
const conexion = mysql.createConnection(mysqlConfig);
const res = require('express/lib/response');

module.exports.getDoctor = (req,res) =>{
    const idDoctor = req.body.idDoctor;
    const sql = `SELECT * FROM doctor WHERE idDoctor = ?`;
    let mensaje;

    conexion.query(sql,[idDoctor], (error,results,fields)=>{

        if(error)
            res.send(error)
        else{
            if(results[0]==undefined){
                mensaje = "Doctor doesn't exist";
                res.json({
                    mensaje
                })
            }


        }
        
        
            res.json(results);

    })


}