const mongoose = require('mongoose');

// PROPOSAL MODEL
const proposalSchema = mongoose.Schema(
  {
    freelancer_id: {
      type: Schema.Types.ObjectId,
      ref: 'Freelancer',
      required: [true, 'Missing freelancer id'],
    },
    client_id: {
      type: Schema.Types.ObjectId,
      ref: 'Client',
      required: [true, 'Missing client id'],
    },
    job_id: {
      type: Schema.Types.ObjectId,
      ref: 'Job',
      required: [true, 'Missing job id'],
    },
    proposal: {
      type: String,
      required: [true, 'Missing proposal'],
    },
    files: [
      {
        type: String,
        url: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Proposal', proposalSchema);
