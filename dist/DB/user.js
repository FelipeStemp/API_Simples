"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelUser = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
//Modelo de usuario
const UserSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    idade: {
        type: Number
    },
    authentication: {
        password: {
            type: String,
            required: true,
        },
        salt: {
            type: String
        }
    }
});
exports.ModelUser = mongoose_1.default.model('User', UserSchema);
