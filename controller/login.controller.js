const jwt = require('jsonwebtoken');
const config = require('../config/jwt');
/////////
const mysql = require('mysql');
const mysqlConfig = require('../helpers/mysql-config');
const { NULL } = require('mysql/lib/protocol/constants/types');
const conexion = mysql.createConnection(mysqlConfig);
////////

module.exports.loginPatient = (req,res) =>{
    
    const user = req.body.email;
    const password = req.body.password;
    
    const sql = `SELECT idPatient FROM usuario WHERE user = ?` 
    const sql2 = `SELECT password FROM usuario WHERE user = ?`

    let idPatient;
    let resultUser;
    let resultPassword;

    let mensaje = 'Usuario o contraseña inválidos'

    ////////////////
    let token = '';

    const payload = {
        id: 1,
        user: req.body.user
    }

    console.log(req.body);

    function Fun (pw){

        conexion.query(sql, [user], (error, results, fields) =>{
            if(error)
                res.send(error);
            else{
                //console.log(results[0]);
                resultUser = results[0]; //idPatient

                if(resultUser != undefined){

                    idPatient = resultUser.idPatient; 
                    
                    conexion.query(sql2, [user], (error, results2, fields) =>{

                        if(error)
                            res.send(error);
                        else{
                            resultPassword = results2[0];
        
                            console.log(resultUser);
    
    
                            if(resultPassword.password === pw){

                                token = jwt.sign(payload, config.key ,{expiresIn: 7200})
                                mensaje= 'Usuario o contraseña autenticados'

                            }
                        
                        }
                        
                            res.json({
                                mensaje,
                                token,
                                idUsuario
                            })
                        })
                    }
                else{
                    res.json({
                        mensaje
                    })
                }

            }
        })
    }

    Fun(password);



}