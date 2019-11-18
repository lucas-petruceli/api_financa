const ValidationError = require('../errors/validationError')
// eslint-disable-next-line no-undef
module.exports = (app) => {
    
    const getAll = (filter = {}) => {
        return app.db('users').where(filter).select()
    }

    
    const getOne = (filter = {}) => {
        return app.db('users').where(filter).first()
    }

    const save = async (user) => {
        if(!user.name){
            throw new ValidationError('Nome é um atributo obrigatório')
            // return {error : 'Nome é um atributo obrigatório'}
        }

        if(!user.email){
            throw new ValidationError('Email é um atributo obrigatório')
            // return {error : 'Email é um atributo obrigatório'}
        }

        if(!user.senha){
            throw new ValidationError('Senha é um atributo obrigatório')
            // return {error : 'Senha é um atributo obrigatório'}
        }

        const userDB = await getAll({email : user.email})

        if(userDB && userDB.length > 0){
            throw new ValidationError('Email duplicado')
            // return {error: 'Email duplicado'}
        }

        return app.db('users').insert(user, '*')
    }

    return {getAll , save , getOne}
}