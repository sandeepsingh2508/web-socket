const Data = require("../models/inventorySchema");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");

//get all inventory
exports.getAllInventory = catchAsyncError(async (req, res, next) => {
  const data = await Data.find();
  res.status(200).json({
    success: true,
    data,
  });
});

//get particuler inventory
exports.getInventory = catchAsyncError(async (req, res, next) => {
  const data = await Data.findById(req.params.id);
  if (!data) {
    return next(new ErrorHandler("Inventory not found", 404));
  }
  res.status(200).json({
    success: true,
    data,
  });
});

//create new inventory
exports.createInventory = catchAsyncError(async (req, res, next) => {
  const result = await Data.create(req.body);
  // const data =  result.save();
  res.status(200).send({
    success: true,
    result
  });
});

//update inventory data
exports.updateInventoryData = catchAsyncError(async (req, res, next) => {
  let data = await Data.findById(req.params.id);
  if (!data) {
    return next(new ErrorHandler("Inventory not found", 404));
  }
  data = await Data.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndMidify: false,
  });
  res.status(200).json({
    success: true,
    data,
  });
});

//delete Inventory data
exports.deleteInventoryData=catchAsyncError(async(req,res,next)=>{
  const data=await Data.findById(req.params.id)
  if(!data){
    return next(new ErrorHandler("Inventory not found",404))
  }
  await data.remove();
  res.status(200).json({
    success:true,
    message:"Inventory deletion success"
  })
})