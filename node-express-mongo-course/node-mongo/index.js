const MongoClient = require("mongodb").MongoClient;
const operations = require("./operations");
const assert = require("assert");

const dbTitle = "conFusion";
const url = "mongodb://localhost:27017/";

MongoClient.connect(url)
  .then((client) => {
    assert.equal(error, null);
    console.log("Currently connected to the server.");
    const database = client.db(dbTitle);

    operations
      .appendDocument(
        database,
        {
          name: "Sushi Hosomaki",
          description: "Salmon covered within rice wrapped in seaweed",
        },
        "dishes"
      )

      .then((data) => {
        console.log(data, " has been appended ");
        return operations.findAllDocuments(database, "dishes");
      })

      .then((documents) => {
        console.log(documents, "are all identified documents.");
        return operations.updateDocument(
          database,
          { name: "Sushi Hosomaki" },
          {
            description:
              "Salmon covered within a sticky bed of rice which is then wrapped within a thin layer of seaweed.",
          },
          "dishes"
        );
      })

      .then((data) => {
        console.log(data, "has been successfully updated.");
        return operations.findAllDocuments(database, "dishes");
      })

      .then((documents) => {
        console.log(documents, "are all identified documents.");
        return database.dropCollection("dishes");
      })

      .then((data) => {
        console.log("The collection", data, "has been closed");
        return client.close();
      })
      .catch((error) => console.log(error));
  })
  .catch((error) => console.log(error));
