import {Router} from 'express';

import { signUP, signIn, signOut } from '../controllers/auth.controllers.js';


const authRouter = Router();

// path: /api/vi/auth/sign-up 
authRouter.post('/sign-up', signUP);
authRouter.post('/sign-in', signIn);
authRouter.post('/sign-out', signOut);

export default authRouter;