let express = require("express")
let app = express()
let connectToDB = require("./config/connectToDB")
connectToDB()

require("dotenv").config()

app.use(express.json())


// routs__________

app.use("/userAuth", require("./routs/userRout/userAuth"))
app.use("/usermethod", require("./routs/userRout/usermethod"))



let port = process.env.port || 3000
app.listen(port, () => {
    console.log("i am listen");
})




