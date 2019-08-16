import passport from "passport";
import passportLocal from "passport-local";
import { User } from "../models/userModel";
import bcrypt from 'bcrypt';

const LocalStrategy = passportLocal.Strategy;

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

passport.use(new LocalStrategy({
    usernameField: 'Email',
    passwordField: 'Password'
}, (Email, Password, done) => {
    User.findOne({ Email: Email.toLowerCase() }, (err: any, user: any) => {
        if (err) { return done(err); }
        if (!user) {
            return done(`Email ${Email} not found.`, false);
        }
        bcrypt.compare(Password, user.Password, (err: Error, isMatch: boolean) => {
            if (err) { return done(err); }
            if (isMatch) {
                return done(undefined, user);
            }
            return done("Invalid email or password.", false);
        });
    });
}));