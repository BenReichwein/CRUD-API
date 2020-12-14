const mongoose = require('mongoose');

const db = async () => {
    try {
        await mongoose.connect(
            'mongodb+srv://Ben:gamingmaster4224@test.evxl7.mongodb.net/test?retryWrites=true&w=majority',
            { useNewUrlParser: true },
            { useUnifiedTopology: true },
            () => console.log('[CONNECTED] - Database'))
        } catch (err) {
            console.log(`Error: ${err}`)
            throw err;
        }
    }

module.exports = db;

    