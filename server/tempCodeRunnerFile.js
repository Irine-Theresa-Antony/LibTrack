import express from 'express';
import cors from 'cors'
import { adminrouter } from "./routes/adminroute.js";

const app = express()
app.use(cors())
app.use(express.json())
app.use('/auth',adminrouter)

app.listen(3000, () => {
    console.log("Server is running")
})

