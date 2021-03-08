const { verify } = require("jsonwebtoken");

module.exports = {
    checkToken: (req, res, next) => {
        let token = req.get("authorization");
        if (token) {
            //Removing the bearer from the token
            token = token.slice(7); //actual token
            verify(token, process.env.JWT_SECRET, (error, decoded) => {
                if (error) {
                    res.json({
                        sucsess: 0,
                        message: "Invalid Token"
                    });
                }else{
                    next();
                }
            });
        }else{
            res.json({
                sucsess: 0,
                message: "Access denied ! unauthorized user ",
            })
        }
    }
}