import crypto from 'crypto'

const SECRET = 'SECRET-API'

//cryptografando senha e metodo random para salt

//valor aleatório de 128 bytes e o converte em uma string codificada em base64.
export const random = () => crypto.randomBytes(128).toString('base64');


// cria uma criptografia juntado salt + / + password + secret e passa para hexadecimal
export const authentication = (salt: string, password: string)=>{
    return crypto.createHmac('sha256', [salt, password].join('/')).update(SECRET).digest('hex')
}