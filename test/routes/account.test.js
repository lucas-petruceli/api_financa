const request = require('supertest')

const app = require('../../src/app')

const MAIN_ROUTE = '/accounts'
let user
const email = `${Date.now()}@teste.com.br`

/**
 * Executa antes de todos os testes
 */
beforeAll(async () => {
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
})


test('Deve inserir uma conta com sucesso', () => {
    return request(app).post(MAIN_ROUTE)
        .send({
            name: "#Acc1",
            user_id: user.id
        })
        .then(result => {
            expect(result.status).toBe(201)
            expect(result.body.name).toBe('#Acc1')
        })
})

test('Deve listar todas as contas', () => {
    return app.db('accounts').insert({
        name: 'Acc list',
        user_id: user.id
    }).then(() => {
        request(app).get(MAIN_ROUTE)
            .then(res => {
                expect(res.status).toBe(200)
                expect(res.body.length).toBeGreaterThan(0)
            })
    })
})

test('Deve retornar uma conta por Id', () => {
    return app.db('accounts')
        .insert({
            name: 'Acc list',
            user_id: user.id
        }, ['id'])
        .then(acc => request(app).get(`${MAIN_ROUTE}/${acc[0].id}`))
        .then(res => {
            expect(res.status).toBe(200)
            console.log(res.body)
            expect(res.body.name).toBe('Acc list')
            expect(res.body.user_id).toBe(user.id)
        })
})

test('Deve alterar uma conta', () => {
    return app.db('accounts')
        .insert({
            name: 'Acc to update',
            user_id: user.id
        }, ['id'])
        .then(acc => request(app).put(`${MAIN_ROUTE}/${acc[0].id}`)
            .send({
                name: 'Acc updated'
            }))
        .then(res => {
            expect(res.status).toBe(200)
            expect(res.body.name).toBe('Acc updated')
        })
})

test('Deve remover uma conta', () => {
    return app.db('accounts')
        .insert({
            name: 'Acc to update',
            user_id: user.id
        }, ['id'])
        .then(acc => {
            request(app).delete(`${MAIN_ROUTE}/${acc[0].id}`)
        .then(res => {
            expect(res.status).toBe(204)
        })
        })
})

test('Não deve inserir uma conta sem nome' , () => {
    return request(app).post(MAIN_ROUTE)
    .send({
        user_id : user.id
    })
    .then(res => {
        expect(res.status).toBe(400)
        expect(res.body.error).toBe('Nome é um atributo obrigatório')
    })

})