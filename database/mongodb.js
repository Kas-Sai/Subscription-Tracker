import mongoose from "mongoose";
import { DB_URI, NODE_ENV} from '../config/env.js';

if(!DB_URI){
    throw new Error('Please define local .env<development/production>.local');
}

const connectToDatabase = async () => {
try {
    await mongoose.connect(DB_URI);

    console.log(`Connected to Database ${NODE_ENV}`);
} catch (error) {
    console.error('Error getting while connecting the database');
    
    process.exit(1);
}
}


export default connectToDatabase;