const express = require("express");
const {
  getAllInventory,
  getInventory,
  createInventory,
  updateInventoryData,
  deleteInventoryData,
} = require("../controllers/inventory");
const router = express.Router();

router.use(express.json());

router.get("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
   });

router.route("/getInventory").get(getAllInventory);
router.route("/getInventory/:id").get(getInventory);
router.route("/createInventory").post(createInventory);
router.route("/updateInventory/:id").put(updateInventoryData);
router.route("/deleteInventory/:id").delete(deleteInventoryData);

module.exports = router;
