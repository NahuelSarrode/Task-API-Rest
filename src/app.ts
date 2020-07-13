import express from "express"; 
import morgan from "morgan"; 
import cors from "cors"; 
import passport from "passport";
import passportMiddleware from "./middlewares/passport";

// import all system routes
import authRoutes from "./routes/auth.routes";
import taskRoutes from "./routes/tasks.routes";
import userRoutes from "./routes/users.routes"; 

// initialization
const app = express(); 

// settings 
app.set('port', process.env.PORT || 3000);

// middlewares 
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); 
passport.use(passportMiddleware);

// routes 
app.use('/users', userRoutes);
app.use(authRoutes);
app.use('/tasks', taskRoutes);

export default app; 