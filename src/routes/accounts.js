// eslint-disable-next-line no-undef
module.exports = (app) => {
    const create = (req, res, next) =>{
        app.services.account.save(req.body)
            .then(result => {
                
                // if(result.error){
                //     return res.status(400).json(result)
                // }

                return res.status(201).json(result[0])
            })
            .catch(err => {
                return next(err)
            })
    }

    const findAll = (req, res, next) => {
        app.services.account.getAll()
            .then(result => {
                return res.status(200).json(result)
            })
            .catch(err => {
                return next(err)
            })
    }

    const getId = (req, res, next) => {
        app.services.account.get({ id: req.params.id })
            .then(result => {
                return res.status(200).json(result)
            })
            .catch(err => {
                return next(err)
            })
    }

    const update = (req, res, next) => {
        app.services.account.update(req.params.id, req.body)
        .then(result => {
            return res.status(200).json(result[0])
        })
        .catch(err => {
            return next(err)
        })
    }

    const remove = (req , res, next) => {
        app.services.account.remove(req.params.id)
        .then(() =>{
            return res.status(204)
        })
        .catch(err => {
            return next(err)
        })
    }

    return { create , findAll , getId , update, remove}
}