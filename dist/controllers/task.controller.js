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
exports.update = exports.edit = exports.remove = exports.list = exports.save = exports.create = void 0;
const logger_1 = __importDefault(require("../common/logger"));
const constants_1 = require("../config/constants");
const task_1 = __importDefault(require("../models/task"));
exports.create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render('tasks/create');
});
exports.save = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description } = req.body;
        const task = new task_1.default({ title, description });
        const saved = yield task.save();
        console.log(saved);
        res.status(constants_1.status.OK).redirect('/tasks/list');
    }
    catch (error) {
        logger_1.default.error("Error saving task: ", error);
        throw error;
    }
});
exports.list = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield task_1.default.find().lean();
        res.render('tasks/list', { tasks });
    }
    catch (error) {
        logger_1.default.error("Error getting tasks: ", error);
        throw error;
    }
});
exports.remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield task_1.default.findByIdAndDelete(id);
        res.redirect('/tasks/list');
    }
    catch (error) {
        logger_1.default.error("Error deleting task by id: ", error);
        throw error;
    }
});
exports.edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const task = yield task_1.default.findById(id).lean();
        res.render('tasks/edit', { task });
    }
    catch (error) {
        logger_1.default.error("Error deleting task by id: ", error);
        throw error;
    }
});
exports.update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        yield task_1.default.findByIdAndUpdate(id, { title, description });
        console.log(id);
        res.redirect("/tasks/list");
    }
    catch (error) {
        logger_1.default.error("Error deleting task by id: ", error);
        throw error;
    }
});
