const request = require('supertest')
const app = require('../src/app')

test('Devve responder na raiz' , async () => {
    const res = await request(app).get('/')
    expect(res.status).toBe(200)
})