const mongoose = require("mongoose")

const connectDatabase = () => {
    mongoose.connect(process.env.DB_URI, {
        useNewUrlParser : true,
        useUnifiedTopology : true,
    }).then(con => {
        console.log(`Mongo db connected with host : ${con.connection.host}`)
    })
}

module.exports = connectDatabase;