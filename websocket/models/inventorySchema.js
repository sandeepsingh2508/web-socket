const mongoose=require('mongoose')

const inventorySchema= new mongoose.Schema({
    user:{
        type:String,
    },
    name:{
        type:String,
        required:[true,"please enter user name"]
    },
    description:{
        type:String
    },
    accountstatus:{
        type:String
    },
    creationdate:{
        type:Date,
        default:Date.now
    }


})

module.exports=mongoose.model('invDatas',inventorySchema)