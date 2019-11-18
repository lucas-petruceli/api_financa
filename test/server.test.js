const supertest = require('supertest')
// eslint-disable-next-line no-unused-vars
const request = supertest('http://127.0.0.1:3001')


test('Deve responder na porta 3001', async () => {
    //acessar a url http://127.0.0.1/3001
    //verificar resposta 200
    // const res = await request.get('/')
    // expect(res.status).toBe(200)
})