/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

// passando o modelo do usuario criado pelo
import { authentication, random } from '../helper/helper'
import { ModelUser } from './user'


//metodos get
// sem retorno da authenticação de usuarios
export const getUsers = () => ModelUser.find({},{authentication: 0})
export const getUserByEmail = (email: string) => ModelUser.findOne({email}, {authentication: 0})
export const getUserByID = (id: string) => ModelUser.findById(id, {authentication: 0})

//get com retorno de auth
export const getUserByEmailwhitAuth = (email: string) => ModelUser.findOne({email})


//metodo create 
export const createUser = (values: Record<string, any>) => new ModelUser(values).save().then(user => user.toObject())

//metodo delete
export const deleteUser = (email: string) => ModelUser.findOneAndDelete({email: email})

//metodo update sem senha
export const updateUser = async (id: string, values: Record<string, any>) =>{

    //removendo o authentication para não ser alterado
    const {authentication, ...updateValues} = values

    return ModelUser.findByIdAndUpdate(id, updateValues, {new: true})
} 

//metodo update com retorno de authenticação
export const updateUserByIDwithPassword = (id: string, newPassword: string) =>{ 
    //gerando um novo salt e um novo hash da senha
    const salt = random()
    const hashPassword = authentication(salt, newPassword)


    return ModelUser.findByIdAndUpdate(
        id, 
        //set indica ao mongoDB a atualização dos campos
        { $set: {password: hashPassword, salt: salt} },
        {new: true}
    )
}

