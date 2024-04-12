let express = require("express")
let app = express()
let cors = require("cors")
let connectToDB = require("./config/connectToDB")
const { notFound, errorHandling } = require("./medelweres/error")
connectToDB()

require("dotenv").config()

app.use(express.json())
app.use(cors())


// routs__________

app.use("/userAuth", require("./routs/userRout/userAuth"))
app.use("/usermethod", require("./routs/userRout/usermethod"))
app.use("/postRouts", require("./routs/postRout"))
app.use("/CommentRouts", require("./routs/commentRout"))
app.use("/CatigoryRouts", require("./routs/catigoryRout"))

app.use(notFound)
app.use(errorHandling)

let port = process.env.port || 3000
app.listen(port, () => {
    console.log("i am listen");
})




