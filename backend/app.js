const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const dotenv = require('dotenv');
const router = express.Router();
const authRoutes = require("./routes/auth")
const foodRoutes = require("./routes/FoodRoutes")
const reviewRoutes = require('./routes/ReviewRoutes');
const planRoutes = require('./routes/PlanRoutes');
const food = require("./models/Food");
const MongoStore = require('connect-mongo');
const subscriptionRoutes = require("./routes/SubscriptionRoutes");
const activeSubscriptionRoutes = require("./routes/activeSubscriptionRoutes");

dotenv.config();
const app = express();

mongoose.connect(process.env.MONGO_URI).then(() => console.log('DB connected'));

require('./config/passportConfig')(passport);

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json({limit: "20mb"}));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      ttl: 7 * 24 * 60 * 60, // session TTL in seconds (7 days)
  }),
  cookie : {
        maxAge :  7 * 24 * 60 *60 * 1000,
        httpOnly : true,
    }
}));

app.use(passport.initialize());
app.use(passport.session());

// app.use('/api/auth', require('./routes/auth'));
app.use('/api/auth', authRoutes);
app.use("/api/foods", foodRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/plans', planRoutes);
app.use('/api/:planId', subscriptionRoutes);
app.use('/api/subscriptions', activeSubscriptionRoutes);

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
