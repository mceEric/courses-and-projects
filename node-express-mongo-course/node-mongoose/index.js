const mongoose = require("mongoose");
const dishModels = require("./models/dishes");

const serverUrl = "mongodb://localhost:27017/conFusion";
const serverConnection = mongoose.connect(serverUrl);

serverConnection.then((database) => {
  console.log("Server connection has been created.");

  dishModels
    .create({
      name: "Chicago style pizza.",
      description:
        "Deep dish style pizza with cheese contained under the sauce.",
    })
    .then((model) => {
      console.log(model);

      return dishModels
        .findByIdAndUpdate(
          model._id,
          {
            $set: { description: "Dish model has been succesfully updated." },
          },
          {
            new: true,
          }
        )
        .exec();
    })

    .then((model) => {
      console.log(model);
      model.comments.push({
        rating: 5,
        comment:
          "This dish was absolutely amazing, best pizza I have ever had.",
        author: "Eric McEvoy",
      });
      return model.save();
    })
    .then((model) => {
      console.log(model);
      return dishModels.deleteOne({});
    })

    .then(() => {
      return mongoose.connection.close();
    })

    .catch((error) => {
      console.log(error);
    });
});
