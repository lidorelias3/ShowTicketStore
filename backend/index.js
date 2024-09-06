const express = require('express');

const app = express();
const PORT = 3000;

const authRoutes = require('./src/routes/auth');



app.use("/auth", authRoutes);


app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is listening on port: "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);