const express = require('express');
const app = express();
//1 import mongodb and Mongoclient object
const MongoClient = require('mongodb').MongoClient;

//3 import createRouter.js module
const createRouter = require('./helpers/create_router.js')

//14  in terminal install cors (npm i cors) 
const cors = require('cors')

app.use(express.json());

//15 final step
app.use(cors());


// 2 Note: MongoClient.connect() returns a promise, so use then to access all the results.
MongoClient.connect("mongodb://127.0.0.1:27017", { useUnifiedTopology: true })

   //4,arrow function is to fetch the data from MongoDB
  .then((client) => {
    const db = client.db("games_hub");
    const gamesCollection = db.collection("games");
    const gamesRouter = createRouter(gamesCollection);
    app.use("/api/games", gamesRouter);
  })
  .catch(console.error);



app.listen(5000, function () {
  console.log(`Listening on port ${ this.address().port }`);
});
