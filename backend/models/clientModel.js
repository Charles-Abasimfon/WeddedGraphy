const mongoose = require('mongoose');
const { nanoid } = require('nanoid');

const date = new Date();
const todaysDate =
  date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();

// CLIENT MODEL
const clientSchema = mongoose.Schema(
  {
    short_id: {
      type: String,
      required: true,
      default: () => nanoid(7),
      index: { unique: true },
    },
    joined: {
      type: String,
      required: [true, 'Missing date'],
      default: todaysDate,
    },
    name: {
      type: String,
      required: [true, 'Missing name'],
    },
    email: {
      type: String,
      required: [true, 'Missing email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Missing password'],
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    zip: {
      type: String,
    },
    lat: {
      type: Number,
    },
    lng: {
      type: Number,
    },
    country: {
      type: String,
    },
    profile_pic: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Client', clientSchema);
