const mongoose = require('mongoose');

const ForgotSchema = new mongoose.Schema({
    name: {type: String, required:true},
    email: {type: String, required:true , unique: true},
    password: {type: String, required:true},
    address: {type: String, default:''},
    pincode: {type: String, default:''},
    number: {type: String, default:''},
  }, {timestamps:true} );
  // mongoose.model = {}

  export default mongoose.models.User || mongoose.model("Forgot", ForgotSchema)