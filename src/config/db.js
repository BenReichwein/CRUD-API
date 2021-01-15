const mongoose = require('mongoose');

const db = async () => {
    try {
        await mongoose.connect(
            'MONGO_KEY',
            { useNewUrlParser: true },
            { useUnifiedTopology: true },
            () => console.log('[CONNECTED] - Database'))
        } catch (err) {
            console.log(`Error: ${err}`)
            throw err;
        }
    }

module.exports = db;

    
