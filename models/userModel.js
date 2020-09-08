var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  tittle: { type: String},
  description: { type: String},
  created_at: { type: Date},
  updated_at: { type: Date}
});

userSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  next();
});
module.exports = mongoose.model('User', userSchema);