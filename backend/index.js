const express = require('express')
const cors = require('cors')
const app = express()
const connectDB = require('./db/db')
require('dotenv').config()
const flightRouter = require('./routes/flight')
const userRouter = require('./routes/user')
const myflightrouter = require('./routes/myflight')
const passengerRouter = require('./routes/passenger')
const pdfRouter = require('./routes/pdf')
const bodyParser = require('body-parser');

MONGO_URI= "mongodb+srv://thilak:lakthi@api.8hmns4c.mongodb.net/?retryWrites=true&w=majority"

app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());



app.use('/api/v1',flightRouter)
app.use('/api/v1',userRouter)
app.use('/api/v1',myflightrouter)
app.use('/api/v1',passengerRouter)
app.use('/api/v1',pdfRouter)


const port = 4000

const start = async () => {
    try {
        connectDB(MONGO_URI)
        app.listen(port,()=>{console.log(`listening to port ${port}`)})
    } catch (error) {
        console.log(error)
    }
}

start()

