const mongoose = require("mongoose");

const Job = mongoose.model("Job", {
  email: String,
  companyName: String,
  logoUrl: String,
  jobPosition: String,
  salary: Number,
  jobType: String,
  jobLocation: String,
  location: String,
  jobDesc: String,
  aboutCompany: String,
  skills: Array,
});

module.exports = Job;