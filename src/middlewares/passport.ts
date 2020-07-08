import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import config from "../config/config";
import User from "../models/user";

const ops: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
    secretOrKey: config.jwtSecret
}

export default new Strategy(ops, async (payload, done) => {
    try {
        const id = payload.id;
        const user = await User.findOne({id});

        if (user) {
            return done(null, user);
        }

        return done(null, false);
    } catch (error) {
        console.log(error);
    }
})