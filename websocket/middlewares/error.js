const ErrorHandler=require('../utils/errorHandler')

module.exports=(err,req,res,next)=>{
    err.statusCode=err.statusCode||500,
    err.message=err.message||'Internal server error';

    //wrong mongodb id error
    if(err.name==="CastError"){
        const message =`resource not found. invalid: ${err.path}`;
        err = new ErrorHandler(message,400);
    }
    //mongoose duplicate key error
    if(err.name===11000){
        const message =`Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message,400);
    }

    res.status(err.statusCode).json({
        success:false,
        message: err.stack
    })
};
