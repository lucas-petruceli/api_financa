const ValidationError = require('../errors/validationError')
// eslint-disable-next-line no-undef
module.exports = (app) => {
    const save = async (account) => {

        if(!account.name){
            throw new ValidationError('Nome é um atributo obrigatório')
            // return {error : 'Nome é um atributo obrigatório'}
        }

        return app.db('accounts')
            .insert(account, '*')
    }

    const getAll = () => {
        return app.db('accounts')
            .select()
    }

    const get = (filter = {}) => {
        return app.db('accounts')
            .where(filter)
            .select()
            .first()
    }

    const update = (id, account) => {
        return app.db('accounts')
            .where({id : id})
            .update(account, '*')
    }
    
    const remove = (id) =>{
        return app.db('accounts')
        .where({id : id})
        .del()
    }
    
    return { save , getAll , get, update, remove}
}