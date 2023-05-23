const jwt = require("jsonwebtoken");
const cloundinary = require("cloudinary");

cloundinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

function createNewToken(user, secret, expiresIn) {
  const { _id, name, username } = user;
  return jwt.sign({ _id, name, username }, secret, { expiresIn });
}

//parent, args, context, and info
const resolvers = {
  Query: {
    users: (parent, args, { Model }) => {
      return Model.UserModel.find({})
        .then(
          (model) => {
            console.log("Success.");
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

    user: (parent, { id }, { Model }) => {
      return Model.UserModel.findById(id)
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

    /*me: (parent, args, { me }) => {
      return me;
    },*/
  },

  User: {
    car: (parent, args, { Model }) => {
      return Model.CarModel.find({ owner: parent.id })
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
    makeUser: (parent, { id, name }, { Model }) => {
      const newUser = { id, name };
      return Model.UserModel.create(newUser)
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

    removeUser: (parent, { id }, { Model }) => {
      return Model.UserModel.findByIdAndDelete(id)
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
          return true;
        });
    },

    registerUser: (parent, { name, username, password }, { Model }) => {
      const newUser = {
        name,
        username,
        password,
      };
      return Model.UserModel.create(newUser)
        .then(
          (model) => {
            console.log("User Sucessfully logged in.");
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

    loginUser: (parent, { username, password }, { Model, secret }) => {
      return Model.UserModel.findOne({ username: username })
        .then(
          async (model) => {
            if (!model) {
              throw new Error(
                "Username was not found, please register before you login."
              );
            }
            const passwordMatch = await model.comparePassword(password);
            if (!passwordMatch) {
              throw new Error(
                "Username and password does not match, please try again"
              );
            }
            return {
              token: createNewToken(model, secret, "30m"),
            };
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

    uploadImage: (parent, { filename }, { Model, me }) => {
      if (!me) {
        throw new Error(
          "Please authenticate yourself before continuing with this operation."
        );
      }
      const path = require("path");
      const directory = path.dirname(require.main.filename);
      filename = `${directory}/uploads/${filename}`;
      return cloundinary.v2.uploader
        .upload(filename)
        .then(
          (image) => {
            var updatedUser = me;
            updatedUser.photo = `${image.public_id}.${image.format}`;
            console.log(updatedUser);
            return Model.UserModel.findByIdAndUpdate(
              me._id,
              {
                $set: updatedUser,
              },
              { new: true }
            ).then(
              (model) => {
                return model.photo;
              },
              (error) => {
                console.log(error);
                return error;
              }
            );
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
};

module.exports = resolvers;
//cloundinary
