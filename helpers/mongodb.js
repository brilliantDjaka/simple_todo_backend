const mongoose = require('mongoose');
mongoose.connect(
    process.env.DB_MONGO_URL || 'mongodb://localhost:27017/simple_todo',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

module.exports = mongoose;