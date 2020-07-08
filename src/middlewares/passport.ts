import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import config from "../config/config";
import User from "../models/user";

const ops: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
    secretOrKey: config.jwtSecret
}

export default new Strategy(ops, async (payload, done) => {
    try {
        const email = payload.email;
        const user = await User.findOne({email});

        if (user) {
            console.log("inside!");
            return done(null, user);
        }
        console.log("outside");
        return done(null, false);
    } catch (error) {
        console.log(error);
    }
})