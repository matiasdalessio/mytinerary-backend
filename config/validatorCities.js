const validatorCities = (req, res, next) => {
  if (
    req.body.name === "" ||
    req.body.country === "" ||
    req.body.img === "" ||
    req.body.info === ""
  ) {
    return res.json({ success: false, error: "You cannot send empty values." });
  }
  next();
};

module.exports = validatorCities;
