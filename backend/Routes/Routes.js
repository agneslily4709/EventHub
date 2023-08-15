import {postHello, createEvent,getAllEvents,getEvent,updateEvent,deleteEvent } from "../Controller/Controller.js";
import express from "express"

const router = express.Router()
router.post("/hello",postHello)
router.post("/",createEvent)
router.get("/",getAllEvents)
router.get("/:id",getEvent)
router.put("/:id",updateEvent)
router.delete("/:id",deleteEvent)

export default router