const {expressjwt:expressJwt} = require('express-jwt');

function authJwt() {
    const secret = process.env.SECRET;
    const api = process.env.API_URL;
    isRevoked: isRevoked

    return expressJwt({
        secret,
        algorithms: ['HS256'],
    }).unless({
        path: [
            {url: /\/api\/v1\/products(.*)/ , methods: ['GET', 'OPTIONS'] },
            {url: /\/api\/v1\/categories(.*)/ , methods: ['GET', 'OPTIONS'] },
            {url: /\/api\/v1\/orders(.*)/,methods: ['GET', 'OPTIONS', 'POST']},
            `${api}/users/login`,
            `${api}/users/register`,
]
})
}
async function isRevoked(req, payload, done) {
    if(!payload.isAdmin) {
        done(null, true)
    }
    done();
}
module.exports = authJwt
