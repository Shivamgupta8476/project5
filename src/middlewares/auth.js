const jwt = require('jsonwebtoken')

let authentication = function (req, res, next) {
    try {
        let token;
        let authorization = req.headers.authorization
        if (authorization && authorization.length > 0) {
            token = authorization.split(" ")[1]
            jwt.verify(token, "7dfcdb28dc1cea52f80fd28dca4124530b260c8b8f6afe2bb07b68441189738d3e464339a279ee42f726a488f8efa4c3cf57570977cd6d1a108a9b3943215375", function (err, decodedToken) {
                if (err) {
                    return res.status(401).send({ status: false, message: "Invalid token", Error: err })
                } else {
                    req.user = decodedToken
                    next()
                }
            })
        }
    }
    catch (err) {
        return res.status(500).send({ status: false, message: "Internal server error", Error: err })
    }
}

let authorization = function (req, res, next) {

    //User id from params or from query
    let id = req.params.userId || req.query.userId

    //User id from token
    let userId = req.user.UserId;

    if (userId.toString() !== id.toString()) return res.status(403).send({ status: false, message: "Unauthorize access" })
 
    next()

}

module.exports = { authentication, authorization }