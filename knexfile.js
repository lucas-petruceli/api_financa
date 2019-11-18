// eslint-disable-next-line no-undef
module.exports = {
    test: {
        client: 'pg',
        version: '9.6',
        connection: {
            host: '127.0.0.1',
            user: 'postgres',
            password: 'oleish5i',
            database: 'barriga'
        },
        migrations: {
            directory : 'src/migrations'
        }
    }
}