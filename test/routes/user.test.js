const request = require('supertest')
const jwt = require('jwt-simple')
const secret = 'segredo!'
const app = require('../../src/app')

const email = `${Date.now()}@email.com`
let user

/**
 * Executa antes de todos os testes
 */
/**
 * Executa antes de todos os testes
 */
beforeAll(async () => {
    const email = `${Date.now()}@email.com`
    const res = await app.services.user.save({
        name: 'dono_conta',
        email: email,
        senha: '171717'

    })

    /**
     * Destruturação de Objeto
     * fiz isso so pra não ter o mesmo objeto
     * basicamente clonei todos os atributos do objeto res[0]
     * para user
     */
    user = { ...res[0] }
    user.token = jwt.encode(user, secret)
})

test('Deve listar todos os usuarios', () => {
    return request(app).get('/users')
    .set('authorization', `bearer ${user.token}`)  //o bearer é por causa fromAuthHeaderAsBearerToken no arquivo passport.js
        .then(res => {
            expect(res.status).toBe(200)
            //body tamanho de 1
            // expect(res.body).toHaveLength(1)
            //maior que
            expect(res.body.length).toBeGreaterThan(0)
        })
})

test('Deve inserir usario com sucesso', () => {
    return request(app).post('/users')
        .send({
            name: 'Jessica',
            email: email,
            senha: '123456'
        })
        .set('authorization', `bearer ${user.token}`)
        .then(res => {
            expect(res.status).toBe(201)
            expect(res.body.name).toBe('Jessica')
        })
})

test('Nao deve inserir usuario sem nome', () => {
    return request(app).post('/users')
        .send({
            email: 'lucas@gmail.com',
            senha: '123456'
        })
        .set('authorization', `bearer ${user.token}`)
        .then(res => {
            expect(res.status).toBe(400)
            expect(res.body.error).toBe('Nome é um atributo obrigatório')
        })
})

test('Nao deve inserir usuario sem email', async () => {
    const result = await request(app).post('/users')
        .send({
            name: 'lucas',
            senha: '123123'
        })
        .set('authorization', `bearer ${user.token}`)
    expect(result.status).toBe(400)
    expect(result.body.error).toBe('Email é um atributo obrigatório')

})

test('Não deve inserir usario sem senha', (done) => {
    request(app).post('/users')
        .send({
            name: 'Lucas',
            email: 'lucas@gmail.com.br'
        })
        .set('authorization', `bearer ${user.token}`)
        .then(result => {
            expect(result.status).toBe(400)
            expect(result.body.error).toBe('Senha é um atributo obrigatório')
            done()
        })
        .catch(err => done.fail(err))
})

test('Não deve inserir com email existente', async () => {
    const result = await request(app).post('/users')
        .send({
            name: 'jorge',
            email: email,
            senha: '123456'
        })
        .set('authorization', `bearer ${user.token}`)
    expect(result.status).toBe(400)
    expect(result.body.error).toBe('Email duplicado')
})

