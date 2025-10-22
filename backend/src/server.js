import express from 'express'
import reviewRoutes from './route/ai.route.js'
import cors from "cors"
import path from 'path'


//initialize express app
const app = express()

if(process.env.NODE_ENV!=="production"){
    app.use(cors())
}

//middleware
app.use(express.json())


//routes
app.use('/codereview',reviewRoutes)

if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(path.resolve(),"../frontend/dist")))
app.get("*",(req,res)=>{
    res.sendFile(path.join(path.resolve(),"../frontend/dist/index.html"))
})
}


app.listen(3000,()=>{
    console.log("Server is running on port http://localhost:3000")
})