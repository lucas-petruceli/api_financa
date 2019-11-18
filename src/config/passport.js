const passport = require('passport')
const passportJwt = require('passport-jwt')

const secret = 'segredo!'

const {Strategy , ExtractJwt} = passportJwt

// eslint-disable-next-line no-undef
module.exports = (app) => {
    const params = {
        secretOrKey : secret,
        jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken()
    }

    const strategy = new Strategy(params , (payload, done) => {
        app.services.user.getOne({
            id: payload.id
        })
        .then(user =>{
            if(user){
                done(null, { ...payload})
            } else {
                done(null, false)
            }
        })
        .catch(err => {
            done(err, false)
        })
    })

    passport.use(strategy)

    return {
        authenticate : () => passport.authenticate('jwt' , {session : false})
    }
}