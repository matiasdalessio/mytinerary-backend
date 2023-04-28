const Activity = require("../models/Activity");

const activitiesControllers = {
  getAllActivities: async (req, res) => {
    try {
      const activities = await Activity.find().populate("itineraryId");
      res.json({ success: true, respuesta: activities });
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        respuesta:
          "Oops! an error has ocurred with the server. Verify the endpoint and if it still not working, please try again later...",
      });
    }
  },
  getItineraryActivities: async (req, res) => {
    const itineraryId = req.params.id;
    try {
      const selectedItineraryActivities = await Activity.find({
        itineraryId: itineraryId,
      });
      if (selectedItineraryActivities.length != 0) {
        res.json({ success: true, respuesta: selectedItineraryActivities });
      } else {
        res.json({ success: false, respuesta: [] });
      }
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        respuesta:
          "Oops! an error has ocurred with the server. Verify the endpoint or the ID and if it still not working, please try again later...",
      });
    }
  },
  getSingleActivity: async (req, res) => {
    const activityId = req.params.id;
    try {
      const selectedActivity = await Activity.findOne({
        _id: activityId,
      }).populate("itineraryId");
      res.json({ success: true, respuesta: selectedActivity });
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        respuesta:
          "Oops! an error has ocurred with the server. Verify the endpoint and if it still not working, please try again later...",
      });
    }
  },
  addActivity: async (req, res) => {
    try {
      const activityToAdd = new Activity(req.body);
      await activityToAdd.save();
      res.json({ success: true, respuesta: activityToAdd });
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        respuesta:
          "Oops! Verify the endpoint and if it still not working means an error has ocurred with the server. Please try again later...",
      });
    }
  },
  deleteActivity: async (req, res) => {
    const activityId = req.params.id;
    try {
      const deletedActivity = await Activity.findOneAndDelete({
        _id: activityId,
      });
      res.json({ success: true, respuesta: deletedActivity });
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        respuesta: "Oops! the ID you enter was not founded",
      });
    }
  },
  updateActivity: async (req, res) => {
    const activityId = req.params.id;
    try {
      const modifiedActivity = await Activity.findOneAndUpdate(
        { _id: activityId },
        { ...req.body },
        { new: true }
      );
      res.json({ success: true, respuesta: modifiedActivity });
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        respuesta: "Oops! the ID you enter was not founded",
      });
    }
  },
};

module.exports = activitiesControllers;
