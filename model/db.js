const mongoose = require('mongoose');
require('dotenv').config();

const uriDB = process.env.URI_DB;

const db = mongoose.connect(uriDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    poolSize: 5
});

mongoose.connection.on('error', (err) => {
    console.log(`Mongoose error: ${err.message}`)
})

mongoose.connection.on('connected', () => {
    console.log("Database connection successful")
})


process.on('SIGINT', async () => {
    mongoose.connection.close(() => {
        console.log('Connection to DB closed and app terminated')
        process.exit(1)
    })
    
})

module.exports = db;