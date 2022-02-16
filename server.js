


const express = require('express');
const app = express();
const cors = require('cors');
const db = require('mysql');
const bodyparser = require('body-parser');
const dbConfig = require("./db.config");

app.use(cors());
app.use(express.json())
const connection = db.createPool({
    host:dbConfig.host,
        user:dbConfig.user,
        password:dbConfig.password,
        database:dbConfig.database
  },(error =>{
    if (error) throw error;
    console.log("Successfully connected to the database.");
  }) );



app.post('/api/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;    
    connection.query('Select * FROM userdetails WHERE email=?', [email], function(err, result) {
        if(err){
            console.log(err)
        }else res.send(result) 
    })
});

app.post('/api/resetpassword=true', (req, res) => {

    const email = req.body.email
    const password = req.body.password


    const userRegisterQuery = "UPDATE userdetails SET password=? WHERE email=?";
    connection.query(userRegisterQuery, [password, email], (err, result) => {
        if(err){
            
            console.log("Error",err);
        }else { res.send(result)
        console.log("Result",result);}
    })
})

app.post('/api/register', (req, res) => {

    const email = req.body.email
    const fullname = req.body.fullname
    const password = req.body.password
    
    console.log(email)

    const userRegisterQuery = "insert into userdetails (email, password, fullname) VALUES (?,?,?)"
    connection.query(userRegisterQuery, [email, password, fullname], (err, result) => {
        if(err){
            console.log(err)
        }else res.status(result)
    })
})

app.listen(9001, () => console.log('Server Running'))
module.exports = connection;