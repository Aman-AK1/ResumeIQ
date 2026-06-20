const mongoose = require("mongoose");

async function connectDB() {
    try {
        console.log("URI:", process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI);
        

console.log("Connected to DB:", mongoose.connection.name);

        console.log("Connected to DB");
    } catch (err) {
        console.log("MongoDB Error:", err);
        process.exit(1);
    }
}

module.exports = connectDB;