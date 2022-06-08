import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from 'dotenv'
import postRoutes from "./routes/posts.js"
import userRoutes from "./routes/user.js"

const app = express()
dotenv.config()

const PORT = process.env.PORT || 5000
mongoose.connect(process.env.URL,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`server run on ${PORT}`)
    })
})
.catch((err)=>{
    console.log(err)
})

// mongoose.set("useFindAndModify",false)

app.use(bodyParser.json({limit: "40mb", extended: true}))
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors());

app.use('/posts',postRoutes)
app.use('/user',userRoutes)