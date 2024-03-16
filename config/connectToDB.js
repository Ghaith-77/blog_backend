let mongoose = require("mongoose")

module.exports = async()=>{
    try {
        await mongoose.connect(`mongodb+srv://gaesx1x2:gaesx1x2@cluster0.t9sqeyn.mongodb.net/?retryWrites=true&w=majority`)
        console.log("DB Connect");
    } catch (error) {
      console.log(error);  
    }
}