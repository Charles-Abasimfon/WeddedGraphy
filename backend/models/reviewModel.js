const mongoose = require('mongoose');

const date = new Date();
const todaysDate =
  date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();

// REVIEWS MODEL
const reviewSchema = mongoose.Schema(
  {
    date: {
      type: String,
      required: [true, 'Missing date'],
      default: todaysDate,
    },
    client_id: {
      type: Schema.Types.ObjectId,
      ref: 'Client',
      required: [true, 'Missing client id'],
    },
    freelancer_id: {
      type: Schema.Types.ObjectId,
      ref: 'Freelancer',
      required: [true, 'Missing freelancer id'],
    },
    review: {
      type: String,
      required: [true, 'Missing review'],
    },
    rating: {
      type: Number,
      required: [true, 'Missing rating'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Review', reviewSchema);
