import { workflowClient } from "../config/upstack.js";
import Subscription from "../model/subscription.model.js";

export const createSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id,
        });


            // this code is for the Upstash But this isn't working
      /*  await workflowClient.trigger('send reminders', {
            url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
            body: { subscriptionId: subscription.id },
            headers: { 'content-type': 'application/json' },
            retries: 0,
          }); */

        res.status(201).json({ success: true, data: subscription });
    } catch (error) {
        next(error);
    }
};

export const getUserSubscription = async (req, res, next) => {
    try {
        // Check if the user ID matches the ID in the token
        if (req.user._id.toString() !== req.params.id) {
            const error = new Error('You are not the owner of this account');
            error.statusCode = 401;
            throw error;
        }

        const subscriptions = await Subscription.find({ user: req.params.id });

        res.status(200).json({ success: true, data: subscriptions });
    } catch (error) {
        next(error);
    }
};
