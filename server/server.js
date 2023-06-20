const express = require('express');
const PORT = process.env.PORT || 5000;
const app = express();
const connectDB = require('./config/dbConfig')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const corsOptions = require('./config/corsOptions');

connectDB()

// middleware
app.use(express.json()); // tells server to accept json data
app.use(express.urlencoded({ extended: false}));

app.use(cors(corsOptions))

app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/products', require('./routes/productsRoutes'))
app.use('/api/bids', require('./routes/bidRoutes'))
app.use('/api/notifications', require('./routes/notificationRoutes'))

// deployment config
const path = require("path");
__dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
  });
}

app.use(errorHandler)

mongoose.connection.once('open', ()=> {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`server running on port ${PORT}`))
})

mongoose.connection.on('error', (err) => {
    console.log(err);
})