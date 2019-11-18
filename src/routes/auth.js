const jwt = require('jwt-simple')
const secret = 'segredo!'
const ValidationError = require('../errors/validationError')

// eslint-disable-next-line no-undef
module.exports = (app) => {
    const signin = (req, res, next) => {
        app.services.user.getOne({ email: req.body.email })
            .then(user => {
                if(!user){
                    throw new ValidationError('usuario nao existe')
                }

                if (req.body.senha == user.senha) {
                    const payload = {
                        id: user.id,
                        name: user.name,
                        email: user.email
                    }

                    const token = jwt.encode(payload, secret)
                    res.status(200).json({ token })
                } else {
                    throw new ValidationError('senha errada')
                }
            })
            .catch(err => {
                return next(err)
            })
    }

    // eslint-disable-next-line no-unused-vars
    const signup = (app) => {
        /**
         *  implementar para quando quiser da privilegios
         *  para usuarios cadastrados pelo signin ou signup
         */
    }

    return { signin , signup}
}