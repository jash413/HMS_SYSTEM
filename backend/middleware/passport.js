const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Replace this with your user model import and database setup
const User = require('../models/Users'); // Adjust the path accordingly

passport.use(
  new LocalStrategy(
    {
      usernameField: 'username', // Adjust to match your form field names
      passwordField: 'password',
    },
    async (username, password, done) => {
      try {
        // Find the user by username in your database
        const user = await User.findOne({ username });

        if (!user) {
          return done(null, false, { message: 'Incorrect username' });
        }

        // Validate the user's password
        const isValidPassword = await user.validatePassword(password);

        if (!isValidPassword) {
          return done(null, false, { message: 'Incorrect password' });
        }

        // If both username and password are correct, return the user
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Serialize and deserialize user for session management (optional)
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

module.exports = passport;
