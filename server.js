const express = require("express");
const app = express();
const PORT = 8000;
    
app.use(express.json(), express.urlencoded({ extended: true }));

require("./server/config/mongoose.config");
    
const AllMyJokeRoutes = require("./server/routes/joke.routes");
AllMyJokeRoutes(app);
    
app.listen(PORT, () => console.log(`The server is all fired up on port ${PORT}`));