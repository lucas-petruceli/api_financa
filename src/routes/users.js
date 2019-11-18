// eslint-disable-next-line no-undef
module.exports = (app) => {
    const findAll = (req, res, next) => {
        //exemplo simples para teste
        // const users = [{
        //     name: 'Lucas',
        //     email: 'lucaspmtt@gmail.com'
        // }]
        // res.status(200).json(users)

        //*chamando o banco diretamente
        // app.db('users').select()
        //     .then(result => res.status(200).json(result))

        app.services.user.getAll()
            .then(result => res.status(200).json(result))
            .catch(err => next(err))
    }

    const create = async (req, res, next) => {
        // exemplo simples
        // res.status(201).json(req.body)

        // chamando o banco diretamente
        // const result = await app.db('users').insert(req.body, '*')
        // res.status(201).json(result[0])
        try {
            const result = await app.services.user.save(req.body)
            return res.status(201).json(result[0])
        } catch (err) {
            return next(err)
        }
    }

    return { findAll, create }
}