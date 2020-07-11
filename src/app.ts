import express from "express"; 
import morgan from "morgan"; 
import cors from "cors"; 
import path from "path";
import passport from "passport";
import exphbs from "express-handlebars";
import passportMiddleware from "./middlewares/passport";

import authRoutes from "./routes/auth.routes";
import indexRoutes from "./routes/index.routes";
import specialRoutes from "./routes/special.routes";
import taskRoutes from "./routes/tasks.routes";

// initialization
const app = express(); 

// settings 
app.set('port', process.env.PORT || 3000);
app.engine('.hbs', exphbs({
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials'),
    defaultLayout: 'main', 
    extname: '.hbs'
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');
app.use(express.static(path.join(__dirname, 'public')))

// middlewares 
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); 
app.use(passport.initialize());
passport.use(passportMiddleware);

// routes 
app.use(indexRoutes);
app.use(authRoutes);
app.use(specialRoutes);
app.use('/tasks', taskRoutes);

export default app; 

// https://www.youtube.com/watch?v=eU-p-jreAN4
// https://www.youtube.com/watch?v=EerPAh7pKIo