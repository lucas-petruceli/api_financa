/**
 * pega o send da requisição e coloca no body 
 */
const bodyParser = require('body-parser')

/**
 * escreve a consulta (query) no log do teste
 */
// const knexLogger = require('knex-logger') 

// eslint-disable-next-line no-undef
module.exports = (app) => {
    app.use(bodyParser.json())
    // app.use(knexLogger(app.db))
}