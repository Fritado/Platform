const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("../../models/User");
const FacebookUser = require("../../models/SocialMedia/facebook");
passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
  
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: 'http://localhost:4000/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'email']
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      // Find the user by Facebook ID
      let facebookUser = await FacebookUser.findOne({ facebookId: profile.id });
  
      // If user exists, update access token
      if (facebookUser) {
        facebookUser.accessToken = accessToken;
        await facebookUser.save();
      } else {
        // Create a new Facebook user
        const user = await User.findOne({ email: profile.emails[0].value });
  
        // Ensure the User exists before linking Facebook account
        if (!user) {
          return done(null, false, { message: 'User not found' });
        }
  
        facebookUser = new FacebookUser({
          userId: user._id,
          facebookId: profile.id,
          accessToken: accessToken,
          profile: {
            name: profile.displayName,
            email: profile.emails[0].value,
          }
        });
        await facebookUser.save();
      }
      return done(null, facebookUser);
    } catch (err) {
      return done(err, false);
    }
  }));
  
  exports.facebookAuth = passport.authenticate('facebook', { scope: ['email'] });
  
  exports.facebookAuthCallback = passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/login'
  });