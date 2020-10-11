import passport from "passport";
import dotenv from "dotenv";
import User from "./models/User";
import GithubStrategy from "passport-github";
import routes from "./routes"
import { githubLoginCallback } from "./controllers/userController";
dotenv.config()
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(
    new GithubStrategy({
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: `http://localhost:4000${routes.githubCallback}`
    },
    githubLoginCallback
    )
  );