const express = require('express');
const app = express();
const connectDB = require('./config/db');
const usersRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const contactsRoutes = require('./routes/contacts');

app.use(express.json({ extended: false }));

app.get('/', (req, res) =>
	res.json({ msg: 'Welcome to the ContacManager API...' })
);

app.use('/api/users', usersRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/contacts', contactsRoutes);

const PORT = process.env.PORT || 5000;
connectDB();
app.listen(PORT, () => console.log(`Server is running on port * ${PORT} `));
