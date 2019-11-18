const app = require('express')()
const consign = require('consign')
const knex = require('knex')
const knexfile = require('../knexfile')

// TODO criar chaveamento dinamico
app.db = knex(knexfile.test)

/**
 * importa todos os middlewares
 */
consign({cwd : 'src', verbose: true})
    .include('./config/passport.js')
    .include('./config/middlewares.js')
    .then('./services')
    .then('./routes')
    .then('./config/routes.js')
    .into(app)

app.get('/' , (req, res) => {
    res.status(200).send()
})

app.use((err, req, res, next) => {
    /**
     * o stack é adicionado ao objeto devido ao uso do throw
     */
    const {name, message, stack} = err

    if(name == 'validationError') {
        res.status(400).json({error : message})
    } else { //objeto de error gerado pelo proprio node/express !?!
        res.status(500).json({name , message, stack})
    }

    next(err)
})

/**
 * usar para printar as consultas no banco (opcao se nao quiser usar o knexlogger)
 */
// app.db
//     .on('query' , (query) => {
//         console.log({sql : query.sql , bindings: query.bindings ? query.bindings : ""})
//     })
//     .on('query-response' , response => console.log(response))
//     .on('error', error => console.log(error))

// eslint-disable-next-line no-undef
module.exports = app