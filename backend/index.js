import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import router from './Routes/Routes.js'

dotenv.config()
const app = express()

const DB_URL = process.env.DB_URL
const PORT  = process.env.PORT || 5000
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors({ origin: true, credentials: true }));
app.use("/api/event",router)

mongoose.connect(DB_URL)
.then(app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`)))
.then(() => console.log("DB connected"))
.catch((error) => console.log("Error occured",error))
