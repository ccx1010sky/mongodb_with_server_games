//handling request
//hard coding data path: db/seeds.js
//dealing with MongoDB database:
//use insomnia to test it.

const express = require("express");
//9
const ObjectID = require("mongodb").ObjectID;

const createRouter = function (collection) {
  const router = express.Router();

  //5 INDEX/get route
  router.get("/", (req, res) => {
    // res.send('Hello World!');//hard coding

    //6 fetch back data using collection.find().toArray() and promise.then()
    collection
      .find()
      .toArray()
      .then((docs) => {
        res.json(docs);
      })
      //7
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
  });
  //8 SHOW/get route
  router.get("/:id", (req, res) => {
    const id = req.params.id;
    //10
    collection
      .findOne({ _id: ObjectID(id) })
      .then((doc) => {
        res.json(doc);
      })
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
  });
  //11 CREATE/post route
  // check that the server is configured to use the middleware function to access the request body
  // define a new route that handles POST requests
  router.post("/", (req, res) => {
    // access the new game object from the request's body
    // insert the game into the games collection using the insertOne method
    // send back all the documents from the collection with the response. Note: insertOne is asynchronous and returns a promise, so use a then to access all the games from the collection once the promise has resolved and convert the documents into to an array
    // finally, we know that the cursor method, toArray, is asynchronous and returns a promise, so use another .then to convert the array into JSON and send it back with the response.
    //     Test the create route in Insomnia REST Client, by creating a new POST request and adding the following JSON object to the body:
    // {
    // 	"name": "Chess",
    // 	"playingTime": 60,
    // 	"players": {
    // 		"min": 2,
    // 		"max": 2
    // 	}
    // }
    // Make the request to http://localhost:5000/api/games/ and you will see the JSON response of the all the game objects including the one you added.
    collection
      .insertOne(req.body)
      .then((result) => {
        //result.ops[0] first value in the result array,(not for the new version of mongoDB)
        res.json(result.ops[0]);
      })
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
  });
  //   Define a new route that handles DELETE requests with an id parameter in the path
  // Access the ID from the request's params object
  // use deleteOne to delete the document in the games collection that has an ID that matches the ID specified in the request. To do this, pass deleteOne an object with the key of the property you want to search by, and the value you want to search with: { _id: ObjectID(id) }
  // Send the result as JSON. Unlike the insertOne function we don't want the object back, we just want the result in JSON format. Note: deleteOne is asynchronous and returns a promise, so use then to access all the results.
  //12 DELETE/delete
  router.delete("/:id", (req, res) => {
    const id = req.params.id;
    collection
      .deleteOne({ _id: ObjectID(id) })
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
  });

  //13
  router.put('/:id',(req,res) => {
    const id = req.params.id;
    const updatedData = req.body;
    collection
      //turn string to ObjectID format which mongodb understand it
      //find the id and $set the data to new updatedData
      .updateOne({ _id: ObjectID(id) }, { $set: updatedData })
      .then((result) => {
        res.json(result);
      })
      //catch some error may have appeared
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });

  })

  return router;
};

module.exports = createRouter;
