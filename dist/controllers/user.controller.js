"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = exports.signUp = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const constants_1 = require("../config/constants");
const config_1 = __importDefault(require("../config/config"));
const logger_1 = __importDefault(require("../common/logger"));
// Create a new user with email and password.
exports.signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.email || !req.body.email)
            return res.status(constants_1.status.BAD_REQUEST).json({ messagge: "Please, send your email and password" });
        const user = yield user_1.default.findOne({ email: req.body.email });
        if (user)
            return res.status(constants_1.status.BAD_REQUEST).json({ messagge: "User already in use" });
        const newUser = new user_1.default(req.body);
        yield newUser.save();
        res.status(constants_1.status.OK).json(newUser);
    }
    catch (error) {
        logger_1.default.error("Cant create user: ", error);
        throw error;
    }
});
// Login user with token authentication
exports.signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.email || !req.body.email)
            return res.status(constants_1.status.BAD_REQUEST).json({ messagge: "Please, send your email and password" });
        const user = yield user_1.default.findOne({ email: req.body.email });
        if (!user)
            return res.status(constants_1.status.BAD_REQUEST).json({ messagge: "The user doesnt exist" });
        const isMatch = yield user.comparePassword(req.body.password);
        if (isMatch) {
            return res.header({ token: createToken(user) }).json({ user });
        }
        return res.status(constants_1.status.BAD_REQUEST).json({
            messagge: "Email or password are incorrect!"
        });
    }
    catch (error) {
        logger_1.default.error("Cant validate user ", error);
        throw error;
    }
});
// Create a token validator. 
function createToken(user) {
    return jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, config_1.default.jwtSecret, {
        expiresIn: '12h'
    });
}
