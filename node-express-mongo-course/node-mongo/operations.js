const assert = require("assert");

exports.appendDocument = function (database, document, assortment, callback) {
  const assort = database.collection(assortment);
  return assort.insertMany([document]);
};

exports.findAllDocuments = function (database, assortment, callback) {
  const assort = database.collection(assortment);
  return assort.find({}).toArray();
};

exports.deleteDocument = function (database, document, assortment, callback) {
  const assort = database.collection(assortment);
  return assort.deleteOne(document);
};

exports.updateDocument = function (database, document, update, assortment, callback) {
  const assort = database.collection(assortment);
  return assort.updateOne(document, { $set: update }, null);
};
