const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Connexion à MongoDB
const mongoUrl = process.env.MONGO_URL || 'mongodb://mongo:27017/myapp';
mongoose.connect(mongoUrl)
  .then(() => console.log('MongoDB connecté'))
  .catch(err => console.error(err));

const UserSchema = new mongoose.Schema({ name: String });
const User = mongoose.model('User', UserSchema);

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/users', async (req, res) => {
  res.json(await User.find());
});

app.post('/api/users', async (req, res) => {
  const u = new User({ name: req.body.name });
  await u.save();
  res.json(u);
});

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from backend!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server on port ${PORT}`));
