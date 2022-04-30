const jwt = require('jsonwebtoken');
const config = require('../config/jwt');
/////////
const mysql = require('mysql');
const mysqlConfig = require('../helpers/mysql-config');
const { NULL } = require('mysql/lib/protocol/constants/types');
const conexion = mysql.createConnection(mysqlConfig);
////////

module.exports.login = (req,res) =>{
    
    const user = req.body.user;
    const password = req.body.password;
    
    
    const sql = `SELECT idUser FROM users WHERE mail = ?`; 
    const sql2 = `SELECT passw0rd FROM users WHERE idUser = ?`;
    const sql3 = `SELECT idType FROM users WHERE mail = ?`;

    let idUser;
    let resultUser;
    let resultPassword;
    let idType;

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
            if(error){
                console.log("Error");
                res.send(error);
            }
            else{
                resultUser = results[0]; //idUser
                
                //console.log(resultUser.idPatient);

                if(resultUser != undefined){

                    idUser = resultUser.idUser; 
                    
                    conexion.query(sql2, [idUser], (error, results2, fields) =>{
                        console.log(idUser);

                        if(error)
                            res.send(error);
                        else{

                            resultPassword = results2[0];
        
                            console.log(resultUser);
                            console.log(resultPassword);
    
                            if(resultPassword.passw0rd === pw){

                                token = jwt.sign(payload, config.key ,{expiresIn: 7200})
                                mensaje= 'Usuario o contraseña autenticados'

                                conexion.query(sql3, [user],(error,results,fields)=>{

                                    if (error)
                                        res.send(error)
                                    else{
                                        idType = results[0].idType;
                                    }

                                    //

                                    res.json({
                                        mensaje,
                                        token,
                                        idType
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