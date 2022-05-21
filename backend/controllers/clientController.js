const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
// Importing Client Model
const Client = require('../models/clientModel');

//@desc To Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

//@desc Register Client
//@route POST /api/client/register
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
  } = req.body;
  // Check for missing fields: name, email, password, confirmPassword, address, city, state, zip, lat, lng, country
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
    !country
  ) {
    res.status(400);
    throw new Error('Please enter all required fields');
  }
  // Check for existing client
  const clientExists = await Client.findOne({ email });
  if (clientExists) {
    res.status(400);
    throw new Error('A client with this email already exists');
  }
  //Check for password match
  if (password !== confirmPassword) {
    res.status(400);
    throw new Error('Passwords do not match');
  }
  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  // Create client
  const client = await Client.create({
    ...req.body,
    password: hashedPassword,
  });
  if (client) {
    res.status(201).json({
      _id: client._id,
      name: client.name,
      email: client.email,
      token: generateToken(client._id),
    });
  } else {
    res.status(400);
    throw new Error('User could not be created');
  }
});

//@desc Login Client
//@route POST /api/client/login
//@access Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // Check for missing fields: email, password
  if (!email || !password) {
    res.status(400);
    throw new Error('Please enter all required fields');
  }
  // Check for existing client
  const client = await Client.findOne({ email });
  if (!client) {
    res.status(400);
    throw new Error('No client with this email exists');
  }
  // Check for password match
  const isMatch = await bcrypt.compare(password, client.password);
  if (!isMatch) {
    res.status(400);
    throw new Error('Incorrect password');
  }
  res.status(200).json({
    _id: client._id,
    name: client.name,
    email: client.email,
    token: generateToken(client._id),
  });
});

//@desc Get all Clients
//@route GET /api/client/get-all-clients
//@access Private
const getAllClients = asyncHandler(async (req, res) => {
  const clients = await Client.find();
  res.status(200).json(clients);
});

//@desc Get Client by ID
//@route GET /api/client/get-client/:id
//@access Private
const getClient = asyncHandler(async (req, res) => {
  const client = await Client.findById(req.params.id).select('-password');
  res.status(200).json(client);
});

//@desc Get Logged in Client Data
//@route GET /api/client/get-client-data
//@access Private
const getLoggedInClientData = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

//@desc Update Client By Id
//@route PUT /api/client/update-client/:id
//@access Private
const updateClient = asyncHandler(async (req, res) => {
  const client = await Client.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (client) {
    res.status(200).json(client);
  } else {
    res.status(400);
    throw new Error('User could not be updated');
  }
});

//@desc Delete Client By Id
//@route DELETE /api/client/delete-client/:id
//@access Private
const deleteClient = asyncHandler(async (req, res) => {
  const client = await Client.findByIdAndDelete(req.params.id);
  if (client) {
    res.status(200).json(client);
  } else {
    res.status(400);
    throw new Error('User could not be deleted');
  }
});

module.exports = {
  register,
  login,
  getAllClients,
  getClient,
  getLoggedInClientData,
  updateClient,
  deleteClient,
};
