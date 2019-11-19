// eslint-disable-next-line no-undef
module.exports = (app) => {
    app.route('/auth/signin')
    .post(app.routes.auth.signin)

    app.route('/auth/signup')
    .post(app.routes.users.create)

    app.route('/users')
    // .all(app.config.passport.authenticate()) //descomentar para funcionar o teste (AUTH.TEST) (NAO DEVE ACESSAR UMA ROTA PROTEGIDA SEM O TOKEN)
    .get(app.routes.users.findAll)
    .post(app.routes.users.create)

    app.route('/accounts')
    .post(app.routes.accounts.create)
    .get(app.routes.accounts.findAll)

    app.route('/accounts/:id')
    .get(app.routes.accounts.getId)
    .put(app.routes.accounts.update)
    .delete(app.routes.accounts.remove)
}