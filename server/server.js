import mongoose from 'mongoose';
import app from './app.js';
// Deconstruct environment variables

const { DB_USER, DB_PASS, DB_HOST, DB_NAME, PORT, NODE_ENV } = process.env;

// Construct Mongoose database
const db = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}`;

// Define Mongoose connection options
const mongooseOptions = {
  useNewUrlParser: true, // Use the new URL parser
  useUnifiedTopology: true, // Use the new server discovery and monitoring engine
};

// Connect to MongoDB using Mongoose
mongoose
  .connect(db, mongooseOptions)
  .then(() => {
    console.log('Database connected! 😃');
  })
  .catch((error) => {
    console.log(error.message);
    console.log('🤨');
  });

// Define the port
const port = PORT || 3000;

// Start the express server
app.listen(port, () =>
  console.log(`App is running on port ${port} in ${NODE_ENV} environment`),
);
