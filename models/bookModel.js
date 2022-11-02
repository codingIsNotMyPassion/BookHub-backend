const mongoose = require("mongoose")

const bookSchema = mongoose.Schema({
    image:{
        type:String
    },
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
})
module.exports = mongoose.model("Book", bookSchema)