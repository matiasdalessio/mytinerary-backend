const City = require("../models/City");

const citiesControllers = {
  getAllCities: async (req, res) => {
    try {
      const cities = await City.find();
      res.json({ success: true, respuesta: cities });
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        respuesta:
          "Oops! an error has ocurred with the server. Verify the endpoint and if it still not working, please try again later...",
      });
    }
  },
  getSingleCity: async (req, res) => {
    const cityId = req.params.id;
    try {
      const selectedCity = await City.find({ _id: cityId });
      if (selectedCity.length != 0) {
        res.json({ success: true, respuesta: selectedCity[0] });
      } else {
        res.json({
          success: false,
          respuesta:
            "Oops! an error has ocurred with the server. Verify the endpoint or the ID and if it still not working, please try again later...",
        });
      }
    } catch (error) {
      console.log(error);
      res.json({ success: false, respuesta: [] });
    }
  },
  addCity: async (req, res) => {
    const { name, country, img, info } = req.body;
    try {
      const cityToAdd = new City({ name, country, img, info });
      await cityToAdd.save();
      res.json({ success: true, respuesta: cityToAdd });
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        respuesta:
          "Oops! Verify the endpoint and if it still not working means an error has ocurred with the server. Please try again later...",
      });
    }
  },
  deleteCity: async (req, res) => {
    const cityId = req.params.id;
    try {
      const deletedCity = await City.findOneAndDelete({ _id: cityId });
      res.json({ success: true, respuesta: deletedCity });
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        respuesta: "Oops! the ID you enter was not founded",
      });
    }
  },
  updateCity: async (req, res) => {
    const cityId = req.params.id;
    try {
      const modifiedCity = await City.findOneAndUpdate(
        { _id: cityId },
        { ...req.body },
        { new: true }
      );
      res.json({ success: true, respuesta: modifiedCity });
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        respuesta: "Oops! the ID you enter was not founded",
      });
    }
  },
};

module.exports = citiesControllers;
