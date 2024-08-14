"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserByIDwithPassword = exports.updateUser = exports.deleteUser = exports.createUser = exports.getUserByEmailwhitAuth = exports.getUserByID = exports.getUserByEmail = exports.getUsers = void 0;
// passando o modelo do usuario criado pelo
const helper_1 = require("../helper/helper");
const user_1 = require("./user");
//metodos get
// sem retorno da authenticação de usuarios
const getUsers = () => user_1.ModelUser.find({}, { authentication: 0 });
exports.getUsers = getUsers;
const getUserByEmail = (email) => user_1.ModelUser.findOne({ email }, { authentication: 0 });
exports.getUserByEmail = getUserByEmail;
const getUserByID = (id) => user_1.ModelUser.findById(id, { authentication: 0 });
exports.getUserByID = getUserByID;
//get com retorno de auth
const getUserByEmailwhitAuth = (email) => user_1.ModelUser.findOne({ email });
exports.getUserByEmailwhitAuth = getUserByEmailwhitAuth;
//metodo create 
const createUser = (values) => new user_1.ModelUser(values).save().then(user => user.toObject());
exports.createUser = createUser;
//metodo delete
const deleteUser = (email) => user_1.ModelUser.findOneAndDelete({ email: email });
exports.deleteUser = deleteUser;
//metodo update sem senha
const updateUser = (id, values) => __awaiter(void 0, void 0, void 0, function* () {
    //removendo o authentication para não ser alterado
    const { authentication } = values, updateValues = __rest(values, ["authentication"]);
    return user_1.ModelUser.findByIdAndUpdate(id, updateValues, { new: true });
});
exports.updateUser = updateUser;
//metodo update com retorno de authenticação
const updateUserByIDwithPassword = (id, newPassword) => {
    //gerando um novo salt e um novo hash da senha
    const salt = (0, helper_1.random)();
    const hashPassword = (0, helper_1.authentication)(salt, newPassword);
    return user_1.ModelUser.findByIdAndUpdate(id, 
    //set indica ao mongoDB a atualização dos campos
    { $set: { password: hashPassword, salt: salt } }, { new: true });
};
exports.updateUserByIDwithPassword = updateUserByIDwithPassword;
