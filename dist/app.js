"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const passport_1 = __importDefault(require("passport"));
const express_handlebars_1 = __importDefault(require("express-handlebars"));
const passport_2 = __importDefault(require("./middlewares/passport"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const index_routes_1 = __importDefault(require("./routes/index.routes"));
const special_routes_1 = __importDefault(require("./routes/special.routes"));
const tasks_routes_1 = __importDefault(require("./routes/tasks.routes"));
// initialization
const app = express_1.default();
// settings 
app.set('port', process.env.PORT || 3000);
app.engine('.hbs', express_handlebars_1.default({
    layoutsDir: path_1.default.join(__dirname, 'views/layouts'),
    partialsDir: path_1.default.join(__dirname, 'views/partials'),
    defaultLayout: 'main',
    extname: '.hbs'
}));
app.set('views', path_1.default.join(__dirname, 'views'));
app.set('view engine', '.hbs');
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
// middlewares 
app.use(morgan_1.default('dev'));
app.use(cors_1.default());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use(passport_1.default.initialize());
passport_1.default.use(passport_2.default);
// routes 
app.use(index_routes_1.default);
app.use(auth_routes_1.default);
app.use(special_routes_1.default);
app.use('/tasks', tasks_routes_1.default);
exports.default = app;
// https://www.youtube.com/watch?v=eU-p-jreAN4
// https://www.youtube.com/watch?v=EerPAh7pKIo
