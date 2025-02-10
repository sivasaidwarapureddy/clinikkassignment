const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const MediaSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      require: true,
    },
    media: {
      type: String,
      required: true,
    },
    likes: [{ 
      type: ObjectId,
       ref: "User" }],

    postedBy: {
      type: ObjectId,
      ref: "User",
    },
},{
    timestamps: true,
});

const Media = mongoose.model('Media', MediaSchema)

module.exports = Media




