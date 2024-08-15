
import { createUser, deleteUser, getUserByEmail, getUserByEmailwhitAuth, getUserByID, getUsers, updateUser, updateUserByIDwithPassword } from '../DB/metodos';
import { authentication, random } from '../helper/helper';
import express from 'express';


// validação para criação

export const create = async (Request: express.Request , Response: express.Response) =>{
    try{

        const {username, email, password, idade} = Request.body

        //verifica se os campos obrigatorios foram preenchidos
        if(!username || !email || !password){
            return Response.sendStatus(400).json({erro: "Username, email, and password are required."})
        }

        const lowerCaseEmail = email.toLowerCase();

        //procura o user dentro do servidor e guarda em uma const
        const existUser = await getUserByEmail(lowerCaseEmail)

        //valida de o usuario existe
        if(existUser){
            return Response.sendStatus(409).json({erro: "User is already register"})
        }

        //cria o salt
        const salt = random()

        //realiza a criação do usuario
        const user = await createUser({
            username,
            email: lowerCaseEmail,
            idade: idade || null,
            authentication:{
                salt,
                password: authentication(salt, password)
            }
        })

        return Response.status(201).json(user)

    }catch(error){
        console.log(error)
        return Response.status(500).send();
    }
}

// metodo delete

export const deleteByEmail = async (Request: express.Request , Response: express.Response)=>{
    try{
        const {email} = Request.body;

        //verifica se o campo foi preenchido
        if(!email){
            return Response.status(400).send().json({error: "email is required."})
        }

        const lowerCaseEmail = email.toLowerCase();
        
        //procura o user dentro do servidor e guarda em uma const
        const existUser = await getUserByEmail(lowerCaseEmail)

        //verifica se a const foi preenchida
        if(!existUser){
            return Response.status(404).send()
        }
        
        //realiza a exclusão do usuario vinculado ao email
        await deleteUser(lowerCaseEmail)

        return Response.status(200).send("User was deleted")

    }catch(error){
        console.log(error)
        return Response.status(500).send()
    }
}

//metodo update por id sem senha

export const updateById = async(Request: express.Request, Response: express.Response)=>{
    try{
        // recebendo as informações
        const id = Request.params.id
        const { username, email, idade} = Request.body;

        //verificando se o id foi preenchido
        if(!id){
            return Response.status(400).json({error: "Id is required"})
        }

        const lowerCaseEmail = email.toLowerCase();

        // buscando o usuario por id e adicionando na const
        const existUser = await getUserByID(id)

        //verificando se foi encontrado
        if(!existUser){
            return Response.status(404).json({error: "Id not found"})
        }

        //realizando o metodo updateUser que valida o id e atualiza os valores
        const user = await updateUser(id, {
            username,
            email: lowerCaseEmail,
            idade
        })

        return Response.status(201).json(user)

    }catch(error){
        console.log(error)
        return Response.status(500).send()
    }
}

//update de password

export const updatePasswordbyID = async (Request: express.Request, Response: express.Response) =>{
    try{

        //request dos dados
        const {id, newPassword} = Request.body

        //validando se os dados foram passados
        if(!id || !newPassword){
            return Response.status(400).json({error: "Id and newPassword are required"})
        }

        //buscando usuario por id
        const existUser = await getUserByID(id)

        //verificando se foi encontrado
        if(!existUser){
            return Response.status(404).json({error: "Id not found"})
        }

        //atualizando senha com metodo update
        await updateUserByIDwithPassword(id, newPassword)

        //retorno com mensagem
        return Response.status(201).json({Message: "password updated"})


    }catch(error){
        console.log(error)
        return Response.status(500).send()
    }
}

//metodo get geral sem senha

export const getUsersALL = async (Request: express.Request , Response: express.Response)=>{
    try{

        //const que recebe todos os usuarios do banco
        const users = await getUsers()
        //retorno em modelo json dos usuarios
        return Response.status(200).json(users)

    }catch(error){
        console.log(error)
        return Response.status(500).send()
    }
}

//metodo get por email

export const getUserEmail = async (Request: express.Request , Response: express.Response)=>{
    try{

        //colhendo o email do parametro query
        const email = Request.params.email.toLocaleLowerCase();

        //validando se email foi enviado pela query
        if(!email){
            return Response.status(400).json({error: "email is required"})
        }

        //localizando email com metodo get
        const existUser = await getUserByEmail(email)

        //verificando se foi localizado
        if(!existUser){
            return Response.status(404).json({error: "email not found"})
        }

        //retornando usuario 
        return Response.status(200).json(existUser)

    }catch(error){
        console.log(error)
        return Response.status(500).send()
    }
}

//get com auth por email

export const getUserEmailwithauth = async (Request: express.Request , Response: express.Response)=>{
    try{

        //colhendo o email do parametro query
        const email = Request.params.email.toLocaleLowerCase();

        //validando se email foi enviado pela query
        if(!email){
            return Response.status(400).json({error: "email is required"})
        }

        //localizando email com metodo get
        const existUser = await getUserByEmailwhitAuth(email)

        //verificando se foi localizado
        if(!existUser){
            return Response.status(404).json({error: "email not found"})
        }

        //retornando usuario 
        return Response.status(200).json(existUser)

    }catch(error){
        console.log(error)
        return Response.status(500).send()
    }
}
