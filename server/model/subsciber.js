const mongoose = require('mongoose');
const Schema = mongoose.Schema({
    email : String,
    name : String,
    ethereum_address : String,
    ID: {
        type: Number,
        required: true,
        unique: true,
        default: 1
      },
      CreatedOn: {
        type: Date,
        required: true,
        default: Date.now
      } 
}, { versionKey: false })

Schema.pre('save', async function(next) {
    const doc = this;
    if (doc.isNew) {
      const count = await mongoose.model('subscriber').countDocuments();
      doc.ID = count + 1;
    }
    next();
  });

module.exports = mongoose.model('subscriber', Schema);