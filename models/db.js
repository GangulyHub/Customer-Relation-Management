const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://ganguly:ganguly@cluster0.ymbtt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});

require('./customer.model');