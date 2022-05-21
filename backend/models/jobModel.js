const mongoose = require('mongoose');

// JOB MODEL
const jobSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Missing title'],
    },
    description: {
      type: String,
      required: [true, 'Missing description'],
    },
    budget: {
      type: Number,
      required: [true, 'Missing budget'],
    },
    client_id: {
      type: Schema.Types.ObjectId,
      ref: 'Client',
      required: [true, 'Missing client id'],
    },
    location: {
      type: Schema.Types.Mixed,
      required: true,
    },
    posted_on: {
      type: Schema.Types.Mixed,
      required: [true, 'Missing date'],
    },
    date_deadline: {
      type: Schema.Types.Mixed,
      required: [true, 'Missing date'],
    },
    skills: [
      {
        category: String,
        subcategories: Array,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Job', jobSchema);
