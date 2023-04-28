const express =require ('express')
const router = express.Router()
const cityController = require('../controllers/cityController')
const activitiesControllers = require('../controllers/activitiesControllers')
const itineraryController = require('../controllers/itineraryController')
const userController = require('../controllers/userController')
const validatorCities = require('../config/validatorCities')
const validatorItineraries = require('../config/validatorItineraries')
const validatorUser = require('../config/validatorUser')
const passport = require('passport')

const {newUser, logIn, forcedLogin} = userController
const {getAllActivities, addActivity, getItineraryActivities, getSingleActivity, deleteActivity, updateActivity} = activitiesControllers
const {getAllItineraries, addItinerary, getCityItineraries, getSingleItinerary, deleteItinerary, updateItinerary, addOrRemoveLike, addComment, modifyOrRemoveComment} = itineraryController
const {getSingleCity, getAllCities, addCity, deleteCity, updateCity} = cityController

router.route('/user/signup')
.post(validatorUser,newUser)

router.route('/user/login')
.post(logIn)

router.route('/user/loginLS')
.get(passport.authenticate('jwt', {session: false}), forcedLogin)

router.route('/cities')
.get(getAllCities)
.post(validatorCities, addCity)

router.route('/city/:id')
.get(getSingleCity)
.delete(deleteCity)
.put(updateCity)

router.route('/city/itineraries/:id')
.get(getCityItineraries)

router.route('/itineraries')
.get(getAllItineraries)
.post(validatorItineraries, addItinerary)

router.route('/itinerary/:id')
.get(getSingleItinerary)
.delete(deleteItinerary)
.put(updateItinerary)

router.route('/itinerary/likes/:id')
.put(passport.authenticate('jwt', {session: false}), addOrRemoveLike)

router.route('/itinerary/comments/:id')
.post(passport.authenticate('jwt', {session: false}), addComment)
.put(passport.authenticate('jwt', {session: false}), modifyOrRemoveComment)

router.route('/itinerary/activities/:id')
.get(getItineraryActivities)

router.route('/activities')
.get(getAllActivities)
.post(addActivity)

router.route('/activity/:id')
.get(getSingleActivity)
.delete(deleteActivity)
.put(updateActivity)

module.exports = router