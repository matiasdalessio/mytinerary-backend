const mongoose = require ('mongoose')

const activitySchema = new mongoose.Schema({
        activityName:{type:String, required:true},
        activityImage:{type:String, required:true},
        itineraryId:{type: mongoose.Types.ObjectId, ref: 'itinerary', required:true},     
})

const Activity = mongoose.model ('activity', activitySchema )

module.exports = Activity