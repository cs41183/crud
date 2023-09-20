const express = require('express');  // ketu i kemi importu paketat nga node modules per me i perdor
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const colors = require("colors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

const articleRoutes = require('./routes/articleRoutes');  //ktu i importojm routat qe kur tklikojm prej fontendtit tbojm kerkes nserver kjo ja kallxon udhen ku me shku te routes/articleRoutes ku atje gjendet metodat ne backend te cilat  shtojn ndryshojn editojn items ne db
const categoryRoutes = require('./routes/categoryRoutes');

app.use('/articles', articleRoutes);
app.use('/categories', categoryRoutes);

// Connect to MongoDB
mongoose.connect("mongodb+srv://clirimsopa:admin@crud-app.gplkuue.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB'.bgBrightGreen);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.bgBrightBlue);
});
