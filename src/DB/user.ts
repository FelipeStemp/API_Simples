import mongoose from "mongoose";


//Modelo de usuario
const UserSchema = new mongoose.Schema({
    username : {
        type: String, 
        required: true
    },
    email:{
        type: String,
        required: true
    },
    idade:{
        type: Number
    },
    authentication:{
        password:{
            type: String,
            required: true,
        },
        
        salt:{
            type: String
        }
    }

})

export const ModelUser = mongoose.model('User', UserSchema)

