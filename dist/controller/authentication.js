"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserEmailwithauth = exports.getUserEmail = exports.getUsersALL = exports.updatePasswordbyID = exports.updateById = exports.deleteByEmail = exports.create = void 0;
const metodos_1 = require("../DB/metodos");
const helper_1 = require("../helper/helper");
// validação para criação
const create = (Request, Response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password, idade } = Request.body;
        //verifica se os campos obrigatorios foram preenchidos
        if (!username || !email || !password) {
            return Response.sendStatus(400).json({ erro: "Username, email, and password are required." });
        }
        const lowerCaseEmail = email.toLowerCase();
        //procura o user dentro do servidor e guarda em uma const
        const existUser = yield (0, metodos_1.getUserByEmail)(lowerCaseEmail);
        //valida de o usuario existe
        if (existUser) {
            return Response.sendStatus(409).json({ erro: "User is already register" });
        }
        //cria o salt
        const salt = (0, helper_1.random)();
        //realiza a criação do usuario
        const user = yield (0, metodos_1.createUser)({
            username,
            email: lowerCaseEmail,
            idade: idade || null,
            authentication: {
                salt,
                password: (0, helper_1.authentication)(salt, password)
            }
        });
        return Response.status(201).json(user);
    }
    catch (error) {
        console.log(error);
        return Response.status(500).send();
    }
});
exports.create = create;
// metodo delete
const deleteByEmail = (Request, Response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = Request.body;
        //verifica se o campo foi preenchido
        if (!email) {
            return Response.status(400).send().json({ error: "email is required." });
        }
        const lowerCaseEmail = email.toLowerCase();
        //procura o user dentro do servidor e guarda em uma const
        const existUser = yield (0, metodos_1.getUserByEmail)(lowerCaseEmail);
        //verifica se a const foi preenchida
        if (!existUser) {
            return Response.status(404).send();
        }
        //realiza a exclusão do usuario vinculado ao email
        yield (0, metodos_1.deleteUser)(lowerCaseEmail);
        return Response.status(200).send("User was deleted");
    }
    catch (error) {
        console.log(error);
        return Response.status(500).send();
    }
});
exports.deleteByEmail = deleteByEmail;
//metodo update por id sem senha
const updateById = (Request, Response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // recebendo as informações
        const id = Request.params.id;
        const { username, email, idade } = Request.body;
        //verificando se o id foi preenchido
        if (!id) {
            return Response.status(400).json({ error: "Id is required" });
        }
        const lowerCaseEmail = email.toLowerCase();
        // buscando o usuario por id e adicionando na const
        const existUser = yield (0, metodos_1.getUserByID)(id);
        //verificando se foi encontrado
        if (!existUser) {
            return Response.status(404).json({ error: "Id not found" });
        }
        //realizando o metodo updateUser que valida o id e atualiza os valores
        const user = yield (0, metodos_1.updateUser)(id, {
            username,
            email: lowerCaseEmail,
            idade
        });
        return Response.status(201).json(user);
    }
    catch (error) {
        console.log(error);
        return Response.status(500).send();
    }
});
exports.updateById = updateById;
//update de password
const updatePasswordbyID = (Request, Response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Request.params.id;
        //request dos dados
        const { newPassword } = Request.body;
        //validando se os dados foram passados
        if (!id || !newPassword) {
            return Response.status(400).json({ error: "Id and newPassword are required" });
        }
        //buscando usuario por id
        const existUser = yield (0, metodos_1.getUserByID)(id);
        //verificando se foi encontrado
        if (!existUser) {
            return Response.status(404).json({ error: "Id not found" });
        }
        //atualizando senha com metodo update
        yield (0, metodos_1.updateUserByIDwithPassword)(id, newPassword);
        //retorno com mensagem
        return Response.status(201).json({ Message: "password updated" });
    }
    catch (error) {
        console.log(error);
        return Response.status(500).send();
    }
});
exports.updatePasswordbyID = updatePasswordbyID;
//metodo get geral sem senha
const getUsersALL = (Request, Response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //const que recebe todos os usuarios do banco
        const users = yield (0, metodos_1.getUsers)();
        //retorno em modelo json dos usuarios
        return Response.status(200).json(users);
    }
    catch (error) {
        console.log(error);
        return Response.status(500).send();
    }
});
exports.getUsersALL = getUsersALL;
//metodo get por email
const getUserEmail = (Request, Response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //colhendo o email do parametro query
        const email = Request.params.email.toLocaleLowerCase();
        //validando se email foi enviado pela query
        if (!email) {
            return Response.status(400).json({ error: "email is required" });
        }
        //localizando email com metodo get
        const existUser = yield (0, metodos_1.getUserByEmail)(email);
        //verificando se foi localizado
        if (!existUser) {
            return Response.status(404).json({ error: "email not found" });
        }
        //retornando usuario 
        return Response.status(200).json(existUser);
    }
    catch (error) {
        console.log(error);
        return Response.status(500).send();
    }
});
exports.getUserEmail = getUserEmail;
//get com auth por email
const getUserEmailwithauth = (Request, Response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //colhendo o email do parametro query
        const email = Request.params.email.toLocaleLowerCase();
        //validando se email foi enviado pela query
        if (!email) {
            return Response.status(400).json({ error: "email is required" });
        }
        //localizando email com metodo get
        const existUser = yield (0, metodos_1.getUserByEmailwhitAuth)(email);
        //verificando se foi localizado
        if (!existUser) {
            return Response.status(404).json({ error: "email not found" });
        }
        //retornando usuario 
        return Response.status(200).json(existUser);
    }
    catch (error) {
        console.log(error);
        return Response.status(500).send();
    }
});
exports.getUserEmailwithauth = getUserEmailwithauth;
