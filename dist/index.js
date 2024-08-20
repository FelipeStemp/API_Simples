"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-require-imports */
const express_1 = __importDefault(require("express"));
const mongoose = require("mongoose");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("../swagger.json"));
const authentication_1 = require("./controller/authentication");
require('dotenv').config();
const MONGO_URL = process.env.NODE_ENV_MONGO_URL;
//banco
mongoose.connect(MONGO_URL);
const app = (0, express_1.default)();
app.use(express_1.default.json());
//rodando
app.listen(3000, () => {
    console.log("server running on http://localhost:3000/");
});
//Swagger
app.use('/DocAPI-Simples', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
//GET
//get buscando todos os usuarios
app.get('/all', authentication_1.getUsersALL);
//get buscando por email sem auth nos parametros teste: http://localhost:3000/email/felipe@123.com
app.get('/email/:email', authentication_1.getUserEmail);
//get buscando user por email com auth
app.get('/auth/:email', authentication_1.getUserEmailwithauth);
//POST
//create //verifica se ja possui cadastro por email
app.post('/auth/create', authentication_1.create);
//teste create
/**
 *      "username": "username",
        "email": "email@email.com",
        "idade": 19,
        "password": "password"
*/
//DELETE
//delete por email
app.delete('/auth/delete', authentication_1.deleteByEmail);
//teste delete
/**
 * "email": "felipe@1234.com"
*/
//PUT 
//put atualizando dados sem senha
app.put('/auth/update/:id', authentication_1.updateById);
//teste update
/**
  "id": "66bac495aff7d2c1d722e234",
  "username": "felipe stempkowski",
  "idade": 3,
  "email": "felipe@okpekpoksa.com"
*/
//put atualizando senha
app.put('/auth/updatePassword/:id', authentication_1.updatePasswordbyID);
//teste
/*
  "id": "66bac495aff7d2c1d722e234",
  "newPassword": "felipeppepep"
*/ 
