const mongose = require('mongoose');

const connectDB = () => {
    return mongose.connect(process.env.MONGO_URI).then(() => {
        console.log("Database is connected to successfully.");
    }).catch((err) => {
        console.log("Somethig went worng!, connectDB function.", err.message);
    });
}

module.exports = connectDB;