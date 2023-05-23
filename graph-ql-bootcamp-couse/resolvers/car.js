const CarModel = require("../models/car");

const resolvers = {
  Query: {
    cars: (parent, args, { Model }) => {
      return Model.CarModel.find({})
        .then(
          (model) => {
            console.log("Success");
            return model;
          },
          (error) => {
            console.log(error);
            return error;
          }
        )
        .catch((error) => {
          console.log(error);
          return error;
        });
    },

    car: (parent, { id }, { Model }) => {
      return Model.CarModel.findById(id)
        .then(
          (model) => {
            console.log(model);
            return model;
          },
          (error) => {
            console.log(error);
            return error;
          }
        )
        .catch((error) => {
          console.log(error);
          return error;
        });
    },
  },

  Car: {
    owner: (parent, args, { Model }) => {
      return Model.UserModel.findById(parent.owner)
        .then(
          (model) => {
            console.log(model);
            return model;
          },
          (error) => {
            console.log(error);
            return error;
          }
        )
        .catch((error) => {
          console.log(error);
          return error;
        });
    },
  },

  Mutation: {
    createCar: (parent, { make, model, color, owner }, { Model, me }) => {
      if (!me) {
        throw new Error("Please log in before you try perform this operation.");
      }
      return Model.CarModel.create({ make, model, color, owner: me._id })
        .then(
          (model) => {
            console.log("Car Model:\n", model, "\nhas been created.");
            return model;
          },
          (error) => {
            console.log(error);
            return error;
          }
        )
        .catch((error) => {
          console.log(error);
          return error;
        });
    },

    removeCar: (parent, { id }, { Model }) => {
      return Model.CarModel.findByIdAndDelete(id)
        .then(
          (model) => {
            console.log(model, "\nhas been deleted");
            return true;
          },
          (error) => {
            console.log(error);
            return false;
          }
        )
        .catch((error) => {
          console.log(error);
          return false;
        });
    },
  },
};

module.exports = resolvers;
