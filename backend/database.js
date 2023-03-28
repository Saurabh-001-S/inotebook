const mongoose = require('mongoose')
const mongoURI = "mongodb://127.0.0.1/inotebook?directConnection=true&readPreference=primary"

const connectToMongo = async () => {
      await mongoose.connect(mongoURI)
      await console.log("Connected to Mongoose")
}

module.exports = connectToMongo;
