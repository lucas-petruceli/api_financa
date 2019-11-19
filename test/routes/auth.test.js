const request = require('supertest')
const app = require('../../src/app')

test('Deve criar usuario via signup' , () => {
    const email = `${Date.now()}@email.com`
    return request(app).post('/auth/signup')
        .send({
            name : 'usuario_signup',
            email : email,
            senha : '123456'
        })
        .then(res => {
            expect(res.status).toBe(201)
            expect(res.body.name).toBe('usuario_signup')
            expect(res.body).toHaveProperty('email')
            // expect(res.body).not.toHaveProperty('senha')
        })
})

test('Deve receber um token ao logar', () => {
    const email = `${Date.now()}@email.com`
    return app.services.user.save({
        name : 'usuario_signin',
        email : email,
        senha : '123456'
    })
    .then(() => request(app).post('/auth/signin').send ({email : email , senha : '123456'}))
    .then(res => {
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('token')
    })
})

test('Não deve autenticar usuario com senha errada', () => {
    const email = `${Date.now()}@email.com`
    return app.services.user.save({
        name : 'Walter',
        email : email,
        senha : '123456'
    })
    .then(() => request(app).post('/auth/signin').send ({email : email , senha : '9999'}))
    .then(res => {
        expect(res.status).toBe(400)
        expect(res.body.error).toBe('senha errada')
    })
})

test('Não deve logar com usuario que nao existe', () => {
    return request(app)
        .post('/auth/signin')
        .send({
            email : 'nao_existe@test.com',
            senha : '123123'
        })
        .then(res => {
            expect(res.status).toBe(400)
            expect(res.body.error).toBe('usuario nao existe')
        })
})
/**
 * DESCOMENTAR LINHA NO ROUTES ('/USERS') PARA ESSE TESTE FUNCIONAR
 */
// test('Não deve acessar uma rota protegida sem o token', () => {
//     return request(app).get('/users')
//     .then(res => {
//         expect(res.status).toBe(401)
//     })
// })