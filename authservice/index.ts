import express from 'express'
import bodyParser, { urlencoded } from 'body-parser'
import mongoose from 'mongoose';
import { MONGOURI } from './src/config';
import { UserRoute } from './src/routes/UserRoute';
import cors from 'cors'


const app = express()

app.use(bodyParser.json())
app.use(urlencoded({ extended: true }))
app.use(cors())

mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(result => {
    console.log("Connected to db")
}).catch(error => console.log("Error", error))


app.use('/user', UserRoute)

app.listen(8000, () => {
    console.log("Listening on port")
})