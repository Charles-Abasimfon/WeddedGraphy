const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
// Importing Freelancer Model
const Freelancer = require('../models/freelancerModel');

//@desc To Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

//@desc Register Freelancer
//@route POST /api/freelancer/register
//@access Public
const register = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    confirmPassword,
    address,
    city,
    state,
    zip,
    lat,
    lng,
    country,
    skills,
    profile_pic,
  } = req.body;

  // Check for missing fields: name, email, password, address, city, state, zip, lat, lng, country, skills, profile_pic
  if (
    !name ||
    !email ||
    !password ||
    !confirmPassword ||
    !address ||
    !city ||
    !state ||
    !zip ||
    !lat ||
    !lng ||
    !country ||
    !skills ||
    !profile_pic
  ) {
    res.status(400);
    throw new Error('Please enter all required fields');
  }
  // Check for existing freelancer
  const freelancerExists = await Freelancer.findOne({ email });
  if (freelancerExists) {
    res.status(400);
    throw new Error('A freelancer/professional with this email already exists');
  }
  //Check for password match
  if (password !== confirmPassword) {
    res.status(400);
    throw new Error('Passwords do not match');
  }
  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  //Create freelancer
  const freelancer = await Freelancer.create({
    ...req.body,
    password: hashedPassword,
  });
  if (freelancer) {
    res.status(201).json({
      _id: freelancer._id,
      name: freelancer.name,
      email: freelancer.email,
      token: generateToken(freelancer._id),
    });
  } else {
    res.status(400);
    throw new Error('User could not be created');
  }
});

//@desc Login Freelancer
//@route POST /api/freelancer/login
//@access Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for missing fields: email, password
  if (!email || !password) {
    res.status(400);
    throw new Error('Please enter all fields');
  }

  // Check for existing freelancer
  const freelancer = await Freelancer.findOne({ email });
  if (!freelancer) {
    res.status(400);
    throw new Error('A user with this email does not exist');
  }
  //Check for password match
  const isMatch = await bcrypt.compare(password, freelancer.password);
  if (!isMatch) {
    res.status(400);
    throw new Error('Incorrect password');
  }
  //If user is found and password is correct
  res.status(201).json({
    _id: freelancer._id,
    name: freelancer.name,
    email: freelancer.email,
    token: generateToken(freelancer._id),
  });
});

//@desc Get Freelancers
//@route GET /api/freelancer/get-all-freelancers
//@access Private
const getFreelancers = asyncHandler(async (req, res) => {
  const freelancers = await Freelancer.find();
  res.status(200).json(freelancers);
});

//@desc Get Logged In Freelancer Data
//@route GET /api/freelancer/get-logged-in-freelancer-data
//@access Private
const getLoggedInFreelancerData = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

//@desc Update Freelancer Data
//@route PUT /api/freelancer/update-freelancer-data
//@access Private
const updateFreelancerData = asyncHandler(async (req, res) => {
  const freelancer = await Freelancer.findByIdAndUpdate(
    req.user._id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (freelancer) {
    res.status(200).json(freelancer);
  } else {
    res.status(400);
    throw new Error('User could not be updated');
  }
});

//@desc Get Freelancer Data By Id
//@route GET /api/freelancer/get-freelancer-data/:id
//@access Private
const getFreelancerDataById = asyncHandler(async (req, res) => {
  const freelancer = await Freelancer.findById(req.params.id).select(
    '-password'
  );
  if (freelancer) {
    res.status(200).json(freelancer);
  } else {
    res.status(400);
    throw new Error('User could not be found');
  }
});

//@desc Delete Freelancer Data By Id
//@route DELETE /api/freelancer/delete-freelancer-data/:id
//@access Private
const deleteFreelancerDataById = asyncHandler(async (req, res) => {
  const freelancer = await Freelancer.findByIdAndDelete(req.params.id);
  if (freelancer) {
    res.status(200).json(freelancer);
  } else {
    res.status(400);
    throw new Error('User could not be deleted');
  }
});

module.exports = {
  register,
  login,
  getFreelancers,
  getLoggedInFreelancerData,
  updateFreelancerData,
  getFreelancerDataById,
  deleteFreelancerDataById,
};
