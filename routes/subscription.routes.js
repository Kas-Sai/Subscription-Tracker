import { Router } from 'express';
import authorize from '../middleware/auth.middleware.js';
import { createSubscription, getUserSubscription } from '../controllers/subscription.controller.js';

const subscriptionRouter = Router();

subscriptionRouter.get('/', (req,res) => res.send({title: 'GET all Subscription'}));

subscriptionRouter.get('/:id', (req,res) => res.send({title: 'GET Subscription Details'}));

subscriptionRouter.post('/', authorize, createSubscription);

subscriptionRouter.put('/:id', (req,res) => res.send({title: 'UPDATE Subscription'}));

subscriptionRouter.delete('/:id', (req,res) => res.send({title: 'DELETE Subscription'}));

subscriptionRouter.get('/user/:id', authorize, getUserSubscription);

subscriptionRouter.put('/:id/cancle', (req,res) => res.send({title: 'CANCLE Subscription'}));

subscriptionRouter.get('/upcoming-renewals', (req,res) => res.send({title: 'Get upcoming renewals'}));

export default subscriptionRouter;