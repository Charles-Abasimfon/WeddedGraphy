const mongoose = require('mongoose');

const date = new Date();
const todaysDate =
  date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();

// PORTFOLIO MODEL
const portfolioSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Missing title'],
    },
    description: {
      type: String,
      required: [true, 'Missing description'],
    },
    files: [
      {
        type: String,
        url: String,
      },
    ],
    freelancer_id: {
      type: Schema.Types.ObjectId,
      ref: 'Freelancer',
      required: [true, 'Missing freelancer id'],
    },
    client_id: {
      type: Schema.Types.ObjectId,
      ref: 'Client',
    },
    date: {
      type: String,
      required: [true, 'Missing date'],
      default: todaysDate,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Portfolio', portfolioSchema);
