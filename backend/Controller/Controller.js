import mongoose from "mongoose";
import EventModel from "../Model/Model.js";

const postHello = (req,res) => {
    res.status(200).json({message:"Hello from backend"})
}

const createEvent = async(req,res) => {
    const {name,location,category,poster,details,createdAt} = req.body
    const newEvent = new EventModel({name,location,category,poster,details,createdAt})
    try {
        await newEvent.save()
        res.status(200).json(newEvent)
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}

const getEvent = async(req,res) => {
    const {id} = req.params
    try {
        const event = await EventModel.findById(id)
        res.status(200).json(event)
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}

const getAllEvents = async(req,res) => {
    try {
        const allEvents = await EventModel.find()
        res.status(200).json(allEvents)
    } catch (error) {
        res.status(404).json({message:error.message})        
    }
}

const updateEvent = async(req,res) => {
    const {id} = req.params
    const {name,location,category,poster,details,createdAt} = req.body
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).json({message:`No event is present with id: ${id}`})
    }    
    else{
        const updated = {name,location,category,poster,details,createdAt,_id:id}
        await EventModel.findByIdAndUpdate(id,updated,{new:true})
        res.status(200).json({message:"Event updated"})
    }
}

const deleteEvent = async(req,res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).json({message:`No event is present with id: ${id}`})
    }    
    else{
        await EventModel.findByIdAndDelete(id)
        res.status(200).json({message:"Event Delete"})
    }
}

export {postHello,createEvent,getAllEvents,getEvent,updateEvent,deleteEvent}