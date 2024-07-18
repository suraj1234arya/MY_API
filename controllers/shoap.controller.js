const Warehouse = require("../models/shoap.model");
const  createWarehouse=async(req, res)=> {
  try {
    const { warehouseName, locationName, coordinates } = req.body;
    if (warehouseName && locationName && coordinates) {
      const warehouse = new Warehouse({
        warehouseName,
        locationName,
        location: {
          type: "Point",
          coordinates:coordinates,
        },
      });
      const savedWarehouse = await warehouse.save();
      res.json({data: savedWarehouse, msg: "warehouse_created"});
    } else {
      res.json({
        msg: "some fields are missing",
      });
    }
  } catch (error) {
    res.json({ msg: error.message });
  }
}

const getWereHousesUnderKM = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;
    if (latitude && longitude) {
      const options = {
        location: {
          $geoWithin: {
            $centerSphere: [
              [latitude,longitude], 
              10/ 6371  
            ]
          }
        }
      };
      const shops = await Warehouse.find(options);
      res.json({ "msg": "success", shops });
    } else {
      res.json({ "msg": "error", "error": "Coordinates are missing" });
    }
  } catch (error) {

    res.json({ "msg": "error", "error": error.message});
  }
};


const getAll=async(req,res)=>{
 try {
  const allWareHouse=await Warehouse.find();
  res.json({
    wareHouse:allWareHouse
  })
 } catch (error) {
  res.json(error);
 }

}

const getOne=async(req,res)=>{
  try {
    const one= await Warehouse.findById(req.params.wareId);
    console.log(one);
    res.json({
      one
    })
    
  } catch (error) {
    console.log(error);
    res.json(error)
  }

}

const updateWareHouse = async (req, res) => {
  try {
    const { warehouseName, locationName, coordinates } = req.body;
    const wareId = req.params.wareId;

    console.log(wareId);

    const updateFields = {};
    if (warehouseName) {
      updateFields.warehouseName = warehouseName;
    }
    if (locationName) {
      updateFields.locationName = locationName;
    }
    if (coordinates) {
      updateFields.location = {
        type: "Point",
        coordinates: coordinates
      };
    }

    const updatedWarehouse = await Warehouse.findOneAndUpdate(
      { _id: wareId },
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updatedWarehouse) {
      return res.status(404).json({ "msg": "Warehouse not found" });
    }

    res.json({ "msg": "Warehouse updated successfully", updatedWarehouse });
  } catch (error) {
    console.log(error);
    res.status(500).json({ "msg": "Server error", "error": error.message });
  }
};



module.exports ={
  createWarehouse,
  getWereHousesUnderKM,
  getAll,
  getOne,
  updateWareHouse
};



