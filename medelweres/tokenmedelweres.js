let jwt = require("jsonwebtoken")


function verfiyToken(req, res, next) {
    let authtoken = req.headers.authorization
    console.log("authtoken");
    console.log(authtoken);
    if (authtoken) {
        let token = authtoken.split(" ")[1]
        try {
            req.user = jwt.verify(token, process.env.secretkey)
            next()
        } catch (error) {
            return res.status(401).json({ message: "Invalid token" })
        }
    } else {
        return res.status(401).json({ message: "no token provaid " })
    }
}
async function verfiyTokenandHimSelf(req, res, next) {
    verfiyToken(req, res, () => {
        if (req.user.id == req.params.id) {
            next()
        } else {
            return res.status(401).json({ message: "you not the user" })
        }

    })

}
async function verfiyTokenandHimSelfandAdmin(req, res, next) {
    verfiyToken(req, res, () => {
        if (req.user.id == req.params.id || req.user.isAdmin) {
            next()
        } else {
            return res.status(401).json({ message: "you not the user or you not Admin" })
        }

    })

}
async function verfiyTokenandAdmin(req, res, next) {
    verfiyToken(req, res, () => {
        if (req.user.isAdmin) {
            next()
        } else {
            return res.status(401).json({ message: "you not Admin" })
        }

    })

}
module.exports = {verfiyTokenandAdmin,verfiyTokenandHimSelf,verfiyToken,verfiyTokenandHimSelfandAdmin}