let notFound  = (req,res,next)=>{
    let error = new Error(`not found ${req.originalUrl}`)
    res.status(404)
    next(error)
}
let errorHandling  = (err,req,res,next)=>{
    let statuscode = res.statusCode == 200? 500 : res.statusCode
    console.log(err);
    res.status(statuscode).json({
        message : err.message?err.message: err.error,
        stack : process.env.nodDef === "production" ? null : err.stack
    })
}
module.exports = {notFound,errorHandling}