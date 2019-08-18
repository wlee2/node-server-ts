import passport from "passport";
import passportLocal from "passport-local";
import { User } from "../models/userModel";
import bcrypt from 'bcrypt';
import passportGoogle from 'passport-google-oauth';
import { Request } from 'express';

const LocalStrategy = passportLocal.Strategy;
const GoogleStrategy = passportGoogle.OAuth2Strategy;

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

passport.use(new LocalStrategy({
    usernameField: 'Email',
    passwordField: 'Password'
}, async (Email, Password, done) => {
    try {
        const user = await User.findOne({ Email: Email.toLowerCase() })
        if (!user) {
            throw `Email ${Email} not found.`;
        }
        if (!user.Password) {
            throw `Email ${Email} is not local user`;
        }
        const passwordMatch = await bcrypt.compare(Password, user.Password)
        if(!passwordMatch) {
            throw "Invalid email or password.";
        }
        done(undefined, user);
    } catch (err) {
        done(err, false);
    }
}));



passport.use(new GoogleStrategy({
    clientID: '620540436466-ep5ib5aaqipplg6sae31bbj5gqn285kp.apps.googleusercontent.com',
    clientSecret: '-8CQBgbQeSqm7mXWi57pRWTg',
    callbackURL: `/user/google`
},
    async function (accessToken, refreshToken, profile, done) {
        try {
            const user = await User.findOne({ Email: profile._json.email })
            if (!user) {
                const register = new User({
                    Name: profile._json.name,
                    Email: profile._json.email,
                    Picture: profile._json.picture
                })
                const savedUser = await register.save();
                if (savedUser) {
                    done(undefined, savedUser);
                }
            }
            done(undefined, user)
        } catch (err) {
            done(err, false);
        }
    }
));