const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json()); // Parse JSON request bodies

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World! 20244');
});

const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});

const UsersSchema = new mongoose.Schema({
  username: String,
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['Service Provider', 'Customer', 'Admin'],
    required: true
  },
  service: {
    type: String,
    required: function() {
      return this.role === 'Service Provider';
    }
  },
  profile: {
    name: String,
    contact: String,
    address: String,
    // Additional profile information
  }
}, { collection: 'Users' });

const User = mongoose.model('User', UsersSchema);

// Login endpoint
// Login endpoint
// Login endpoint
app.post('/loginreg', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (user.password !== password) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    // Determine the redirect URL based on user role
    let redirectUrl;
    switch (user.role) {
      case 'Customer':
        redirectUrl = '/customerDashboard';
        break;
      case 'Admin':
        redirectUrl = '/adminDashboard';
        break;
      case 'Service Provider':
        redirectUrl = '/serviceProviderDashboard';
        break;
      default:
        redirectUrl = '/dashboard';
    }

    return res.status(200).json({ message: 'Login successful', user, redirectUrl });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});



// Create Account endpoint
app.post('/create_account', async (req, res) => {
  const { name, email, password, role, service, contact, address } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists. Try with another email.' });
    }
    const newUser = new User({
      username: name,
      email,
      password,
      role,
      service: role === 'Service Provider' ? service : undefined,
      profile: {
        name,
        contact,
        address,
      }
    });
    await newUser.save();
    return res.status(201).json({ message: 'Account created successfully', user: newUser });
  } catch (error) {
    console.error('Error creating account:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
