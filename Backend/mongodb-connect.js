const MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb://localhost:27017/students', (err, db) => {
    if (error) {
        console.log("error in connection");

    }
    console.log('start connection');
    db.close();
});