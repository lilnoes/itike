const mongoose = require("mongoose")

module.exports = {
    async getDefaultConnection(conn = "mongodb://localhost/itike"){
        await mongoose.connect(conn, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
    }

}
