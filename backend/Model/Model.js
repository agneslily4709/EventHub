import mongoose from "mongoose";

const eventSchema = mongoose.Schema({
    name:String,
    location:String,
    category:String,
    poster:String,
    details:String,
    createdAt: {
        type: Date,
        default: new Date(),
    }
})

const EventModel = mongoose.model("Events",eventSchema)
export default EventModel