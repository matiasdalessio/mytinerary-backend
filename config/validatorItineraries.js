const validatorItineraries = (req, res, next) => {
  if (
    req.body.author.userName === "" ||
    req.body.author.imageURL === "" ||
    req.body.itineraryName === "" ||
    req.body.cityID === ""
  ) {
    return res.json({ success: false, error: "You cannot send empty values." });
  } else if (
    req.body.price > 5 ||
    req.body.price < 1 ||
    req.body.duration > 5 ||
    req.body.duration < 1
  ) {
    return res.json({
      success: false,
      error: "Price and Duration must have value between 0 and 5",
    });
  } else if (req.body.hashtags.length < 3 || req.body.hashtags.length > 5) {
    return res.json({
      success: false,
      error: "Hashtags must have value between 3 and 5",
    });
  }
  next();
};

module.exports = validatorItineraries;
