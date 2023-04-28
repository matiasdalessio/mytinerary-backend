const Itinerary = require("../models/Itinerary");

const itineraryControllers = {
  getAllItineraries: async (req, res) => {
    try {
      const itineraries = await Itinerary.find().populate("cityID");
      res.json({ success: true, respuesta: itineraries });
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        respuesta:
          "Oops! an error has ocurred with the server. Verify the endpoint and if it still not working, please try again later...",
      });
    }
  },
  getCityItineraries: async (req, res) => {
    const cityId = req.params.id;
    try {
      const selectedCityItineraries = await Itinerary.find({ cityID: cityId });
      if (selectedCityItineraries.length != 0) {
        res.json({ success: true, respuesta: selectedCityItineraries });
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
  getSingleItinerary: async (req, res) => {
    const itineraryId = req.params.id;
    try {
      const selectedItinerary = await Itinerary.findOne({
        _id: itineraryId,
      }).populate("cityID");
      res.json({ success: true, respuesta: selectedItinerary });
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        respuesta:
          "Oops! an error has ocurred with the server. Verify the endpoint and if it still not working, please try again later...",
      });
    }
  },
  addItinerary: async (req, res) => {
    try {
      const itineraryToAdd = new Itinerary(req.body);
      await itineraryToAdd.save();
      res.json({ success: true, respuesta: itineraryToAdd });
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        respuesta:
          "Oops! Verify the endpoint and if it still not working means an error has ocurred with the server. Please try again later...",
      });
    }
  },
  deleteItinerary: async (req, res) => {
    const itineraryId = req.params.id;
    try {
      const deletedItinerary = await Itinerary.findOneAndDelete({
        _id: itineraryId,
      });
      res.json({ success: true, respuesta: deletedItinerary });
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        respuesta: "Oops! the ID you enter was not founded",
      });
    }
  },
  updateItinerary: async (req, res) => {
    const itineraryId = req.params.id;
    try {
      const modifiedItinerary = await Itinerary.findOneAndUpdate(
        { _id: itineraryId },
        { ...req.body },
        { new: true }
      );
      res.json({ success: true, respuesta: modifiedItinerary });
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        respuesta: "Oops! the ID you enter was not founded",
      });
    }
  },
  addOrRemoveLike: async (req, res) => {
    var { sendData } = req.body;
    const itineraryId = req.params.id;
    const { img, firstName, lastName, _id } = req.user;
    const userId = _id;
    const userInfo = { img, firstName, lastName, userId };
    try {
      const likeAdded = await Itinerary.findOneAndUpdate(
        { _id: itineraryId },
        sendData.add
          ? { $push: { usersLiked: { ...userInfo } } }
          : { $pull: { usersLiked: { userId } } },
        { new: true }
      );
      res.json({ success: true, respuesta: likeAdded.usersLiked });
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        respuesta: "Oops! the ID you enter was not founded",
      });
    }
  },
  addComment: async (req, res) => {
    var { sendData } = req.body;
    var { comment } = sendData;
    const itineraryId = req.params.id;
    const { img, firstName, lastName, _id } = req.user;
    const userId = _id;
    const userInfo = { img, firstName, lastName, userId, comment };
    try {
      const commentAdded = await Itinerary.findOneAndUpdate(
        { _id: itineraryId },
        { $push: { comments: { ...userInfo } } },
        { new: true }
      );
      res.json({ success: true, respuesta: commentAdded.comments });
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        respuesta: "Oops! the ID you enter was not founded",
      });
    }
  },
  modifyOrRemoveComment: async (req, res) => {
    const { sendData } = req.body;
    const { commentId, editedComment } = sendData;
    const comment = editedComment;
    try {
      const modifiedOrRemovedComment = await Itinerary.findOneAndUpdate(
        { "comments._id": commentId },
        !editedComment
          ? { $pull: { comments: { _id: commentId } } }
          : { $set: { "comments.$.comment": comment } },
        { new: true }
      );
      res.json({ success: true, respuesta: modifiedOrRemovedComment.comments });
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        respuesta: "Oops! the ID you enter was not founded",
      });
    }
  },
};

module.exports = itineraryControllers;
