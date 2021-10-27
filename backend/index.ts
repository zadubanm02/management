import express from 'express'
import bodyParser, { urlencoded } from 'body-parser'
import mongoose from 'mongoose';
import { MONGOURI, REDISURI } from './src/config';
import { UserRoute } from './src/routes/UserRoute';
import redis from 'redis'

const app = express()

app.use(bodyParser.json())
app.use(urlencoded({ extended: true }))

mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(result => {
    console.log("Connected to db")
}).catch(error => console.log("Error", error))

// export const client = redis.createClient({
//     host: REDISURI!,
//     password: "1SlsZOFj06bQR2Lo2hS7ca8IQRaHNiAU",
// });
// client.on("error", function (err) {
//     throw err;
// });
// client.on('message', (message) => {
//     console.log("MEssage", message)
// })
app.use('/user', UserRoute)

app.listen(8000, () => {
    console.log("Listening on port")
})