const mysql = require('mysql');
const mysqlConfig = require('../helpers/mysql-config');
const conexion = mysql.createConnection(mysqlConfig);
const res = require('express/lib/response');

module.exports.getDoctor = (req,res) =>{
    const idDoctor = req.params.idDoctor;
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
    })


}

module.exports.getPatient = (req,res) =>{
    const sql = `SELECT * FROM patient WHERE idPatient = ?`;
    let idPatient = req.params.idPatient;

    conexion.query(sql,[idPatient],(error,results,fields)=>{
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
    })
}

module.exports.getPatientsFromDoc = (req,res) =>{
    const sql = `SELECT * FROM doctorpatient WHERE idDoctor = ? `;
    const idDoctor =  req.params.idDoctor;
    let mensaje;

    conexion.query(sql, [idDoctor], (error,results, fields)=>{
        if (error)
            res.send(error)
        else{
            if(results[0]==undefined){
                mensaje = "the doctor does not have an Id"
            }

            res.send(results);

        }
    })
}

module.exports.getPatientWithDocAndPatient = (req,res) =>{
    const sql = `SELECT * FROM patient WHERE idPatient = ? AND idPatient IN (SELECT * FROM doctorpatient WHERE idDoctor = ?)`;

    conexion.query(sql, )

}