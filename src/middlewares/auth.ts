import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import config from "../config";
import controllers from "../controllers";
import { IToken } from "../interfaces/token.interface";
import models from "../models";

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.JWT.SECRET,
};

export default new Strategy(options, async (payload: IToken, done) => {
  console.log({ payload });
  const user = await models.user.findById(payload.id);
  if (!user) {
    return done(null, null);
  }

  return done(null, user);
});
