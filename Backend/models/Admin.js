const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
  admin_id: { type: String, required: true },
  activity: { type: String, required: true },
}, {
  timestamps: true
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
