const mysql = require('mysql');
const mysqlConfig = require('../helpers/mysql-config');
const { NULL } = require('mysql/lib/protocol/constants/types');
const conexion = mysql.createConnection(mysqlConfig);

module.exports.insertUser = (req,res) =>{
    const sql = `SELECT idUser FROM users WHERE mail = ?`;
    const sql2 = `INSERT INTO users (idType, firstName,lastNme,age,mail,passw0rd,telephone) VALUES (?,?,?,?,?,?,?)`;
    
    const mail = req.body.mail;
    const passw0rd = req.body.passw0rd;
    const idType = req.body.idType;
    const firstName = req.body.firstName;
    const lastNme = req.body.lastName;
    const age = req.body.age;
    const telephone = req.body.telephone;

    let idUser;
    let mensaje = "";

    conexion.query(sql,(mail),(error,results,fields)=>{
        if (error)
            res.send(error);
        else{
            idUser = results[0];
            console.log(idUser);

            if(idUser == undefined){ //IF USER DOESN'T EXIST, IT INSERTS IT, ALSO THE USER

                conexion.query(sql2,[idType,firstName,lastNme,age,mail,passw0rd,telephone],(error,results,fields)=>{
                    if (error)
                        res.send(error)
                    else{
                        mensaje = "User created correctly";

                        res.json({
                            mensaje
                        })
                    }
                })
            }
            else{
                mensaje = "User already exists";
                res.json({
                    mensaje
                })
            }
        }
    })
}

module.exports.doctorForms = (req,res) =>{
    const sql = `INSERT INTO doctor (idDoctor,professionalLicense, specialty) VALUES (?,?,?)`;
    const idDoctor = req.body.idDoctor;
    const professionalLicense = req.body.professionalLicense;
    const specialty = req.body.specialty;

    conexion.query(sql,[idDoctor,professionalLicense,specialty],(error,results,fields)=>{
        if(error)
            res.send(error);
        res.json(results);
    })
}




module.exports.getAllUsers = (req,res) =>{
    const sql = `SELECT * FROM users`;

    conexion.query(sql,(error,results,fields)=>{
        if(error)
            res.send(error);
        res.json(results);
    })
}