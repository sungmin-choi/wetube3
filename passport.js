import passport from "passport";
import dotenv from "dotenv";
import User from "./models/User";
import GithubStrategy from "passport-github";
import KakaoStrategy from "passport-kakao";
import routes from "./routes"
import FacebookStrategy from "passport-facebook";
import {
  githubLoginCallback,
  facebookLoginCallback,
  kakaoLoginCallback
} from "./controllers/userController";
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

passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FB_ID,
        clientSecret: process.env.FB_SECRET,
        callbackURL: `https://538d40733f27.ngrok.io${routes.facebookCallback}`,
        profileFields: ["id", "displayName", "photos", "email"],
        scope: ["public_profile", "email"]
      },
      facebookLoginCallback
    )
  );

  passport.use(
    new KakaoStrategy({
      clientID : process.env.Ka_ID,
      clientSecret: "", // clientSecret을 사용하지 않는다면 넘기지 말거나 빈 스트링을 넘길 것
      callbackURL : `http://localhost:4000${routes.kakaoCallback}`
    },
    kakaoLoginCallback
    )
  );