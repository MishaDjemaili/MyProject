mongoose = require("mongoose");
//app = express();
const MONGO_URI = "mongodb://localhost:27017/Week8";
mongoose.connect(MONGO_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
const db = mongoose.connection;
db.on("error", function (err) {
  console.log("Error occured during connection" + err);
});
db.once("connected", function () {
  console.log(`Connected to ${MONGO_URI}`);
});
// creating the scheme
const PersonScheme = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: Number,
  Gender: String,
  Salary: Number,
});
// creating model named as modelname with collection named as personCollection
const person_doc = mongoose.model(
  "modelname",
  PersonScheme,
  "personCollection"
);
manypersons = [
  { name: "Simon", age: 42, Gender: "Male", Salary: 3456 },
  { name: "Neesha", age: 23, Gender: "Female", Salary: 1000 },
  { name: "Mary", age: 27, Gender: "Female", Salary: 5402 },
  { name: "Mike", age: 40, Gender: "Male", Salary: 4519 },
];

person_doc
  .insertMany(manypersons)
  .then(function () {
    console.log("Data inserted"); // Success
  })
  .catch(function (error) {
    console.log(error); // Failure
  });

// finding all documents in the collection
person_doc
  .find({}) //find all users

  .sort({ Salary: 1 }) //
  .select("name Salary age")
  .limit(5)
  .exec()
  .then((docs) => {
    console.log("showing multiple documents");
    docs.forEach(function (Doc) {
      console.log(Doc.age, Doc.name, Doc.Salary);
    });
  })
  .catch((err) => {
    console.error(err);
  });
