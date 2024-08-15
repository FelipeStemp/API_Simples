/* eslint-disable @typescript-eslint/no-require-imports */
import express from "express";
const mongoose = require("mongoose");
import { create, deleteByEmail, getUserEmail, getUserEmailwithauth, getUsersALL, updateById, updatePasswordbyID } from "./controller/authentication";
require('dotenv').config();

const MONGO_URL= process.env.NODE_ENV_MONGO_URL

//banco
mongoose.connect(MONGO_URL)

const app = express();
app.use(express.json())


//rodando
app.listen(3000, () =>{
    console.log("server running on http://localhost:3000/")
})

//get buscando todos os usuarios
app.get('/', getUsersALL)



//get buscando por email sem auth nos parametros teste: http://localhost:3000/email/felipe@123.com
app.get('/email/:email', getUserEmail)

//get buscando user por email com auth
app.get('/auth/:email', getUserEmailwithauth)


//create //verifica se ja possui cadastro por email
app.post('/auth/create', create)
//teste create
/**
 *      "username": "username",
        "email": "email@email.com",
        "idade": 19,
        "password": "password"
*/


//delete por email
app.delete('/auth/delete', deleteByEmail)
//teste delete
/**
 * "email": "felipe@1234.com"
*/


//put atualizando dados sem senha
app.put('/auth/update/:id', updateById)
//teste update
/**
  "id": "66bac495aff7d2c1d722e234",
  "username": "felipe stempkowski",
  "idade": 3,
  "email": "felipe@okpekpoksa.com"
*/

//put atualizando senha
app.put('/auth/updatePassword/:id', updatePasswordbyID)
//teste
/*
  "id": "66bac495aff7d2c1d722e234",
  "newPassword": "felipeppepep"
*/