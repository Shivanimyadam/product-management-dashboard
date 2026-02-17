const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 4000;

//Middleware

app.use(cors());
app.use(express.json());

//Test Route
app.get('/api/health', (req,res)=>{
    res.send("API Running...");
});

//Start server
app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
});