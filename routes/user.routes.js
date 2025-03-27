import { Router } from 'express';
import authorize from '../middleware/auth.middleware.js'
import { getUser, getUsers } from '../controllers/user.controller.js';

const userRouter = Router();

userRouter.get('/', getUsers);

userRouter.get('/:id', getUser);

userRouter.post('/', (req,res) => res.send({title : 'Create New User'}));

userRouter.put('/:id', (req,res) => res.send({title : 'Update User'}));

userRouter.delete('/:id', (req,res) => res.send({title : 'Delete a User'}));

export default userRouter;