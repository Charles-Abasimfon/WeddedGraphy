const mongoose = require('mongoose');
const { nanoid } = require('nanoid');

const date = new Date();
const todaysDate =
  date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();

// FREELANCER MODEL
const freelancerSchema = mongoose.Schema(
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
      required: [true, 'Missing address'],
    },
    city: {
      type: String,
      required: [true, 'Missing city'],
    },
    state: {
      type: String,
      required: [true, 'Missing state'],
    },
    zip: {
      type: String,
      required: [true, 'Missing zip code'],
    },
    lat: {
      type: Number,
      required: [true, 'Missing latitude'],
    },
    lng: {
      type: Number,
      required: [true, 'Missing longitude'],
    },
    country: {
      type: String,
      required: [true, 'Missing country'],
    },
    title: {
      type: String,
      required: [true, 'Missing title'],
    },
    bio: {
      type: String,
      required: [true, 'Missing bio'],
    },
    skills: [
      {
        category: String,
        subcategories: Array,
      },
    ],
    hourly_rate: {
      type: Number,
      required: [true, 'Missing hourly rate'],
    },
    profile_pic: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Freelancer', freelancerSchema);
