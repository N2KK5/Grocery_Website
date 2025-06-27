// Import Modules
import express from 'express';
import dotenv from 'dotenv';
import { engine } from 'express-handlebars';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import methodOverride from 'method-override';

// Security
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';

// DB Config
import DB_Config from "./config/DB_Config.js";

// Import Routes'
import productRouter from './route/product.route.js';
import storeRouter from './route/store.route.js';
import API_Router from './route/api.route.js';

// Env Configuration
dotenv.config();

// Property Variables
const app = express();
const port = process.env.PORT || 6000;

// Middleware
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));
app.use(methodOverride('_method'));

// Static Rendering
app.use(express.static('public'));

// Template Engine
app.engine(
    'hbs',
    engine(
        {
            defaultLayout: 'main',
            extname: 'hbs',
        }
    )
);
app.set('view engine', 'hbs');

// Store Route
app.use('/', storeRouter);

// API Routes
app.use('/', API_Router);

// Product route
app.use('/api/eco-store/product', productRouter);

// Server Port
app.listen(port, () => {
    console.log(`Server runs on port ${port}`);
})