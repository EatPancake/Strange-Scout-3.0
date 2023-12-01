const jwt = require('jsonwebtoken');

module.exports = async (request, response, next) => {
    try {
        const token =  request.headers["x-access-token"].replace('"','').replace('"','');

        const decodedToken = await jwt.verify(token, "RANDOM-TOKEN");
        
        const user = await decodedToken;

        request.user = user;

        next();
    } catch (error) {
        response.status(401).json({
            message :  "Invalid Response"
        })
    }
}