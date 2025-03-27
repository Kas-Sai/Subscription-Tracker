import { createRequire } from 'module';
import dayjs from 'dayjs';
import Subscription from '../model/subscription.model.js';
const require = createRequire(import.meta.url);
const { serve } = require('@upstash/workflow/express');

const REMINDERS = [7, 5, 2, 1];

// Serve the endpoint with the correct path
export const sendReminders = serve('/api/v1/workflows/subscription/reminder', async (context) => {
  const { subscriptionId } = context.requestPayload;

  if (!subscriptionId) {
    console.error('Subscription ID is missing in the request payload.');
    return;
  }

  const subscription = await fetchSubscription(context, subscriptionId);

  if (!subscription || subscription.status !== 'active') {
    console.log(`Subscription ${subscriptionId} not found or inactive.`);
    return;
  }

  const renewalDate = dayjs(subscription.renewalDate);

  if (renewalDate.isBefore(dayjs())) {
    console.log(`Renewal Date has passed for Subscription ${subscriptionId}. Stopping workflow.`);
    return;
  }

  for (const daysBefore of REMINDERS) {
    const reminderDate = renewalDate.subtract(daysBefore, 'day');

    if (reminderDate.isAfter(dayjs())) {
      await sleepUntilReminder(context, `Reminder ${daysBefore} days before`, reminderDate);
    }

    await triggerReminder(context, `Reminder ${daysBefore} days before`);
  }
});

const fetchSubscription = async (context, subscriptionId) => {
  try {
    return await context.run('get subscription', () => {
      return Subscription.findById(subscriptionId).populate('user', 'name email');
    });
  } catch (error) {
    console.error(`Error fetching subscription: ${error.message}`);
    return null;
  }
};

const sleepUntilReminder = async (context, label, date) => {
  console.log(`Sleeping until ${label}, reminder at ${date}`);
  try {
    await context.sleepUntil(label, date.toDate());
  } catch (error) {
    console.error(`Error during sleepUntil: ${error.message}`);
  }
};

const triggerReminder = async (context, label) => {
  try {
    await context.run(label, () => {
      console.log(`Triggering ${label} reminder`);
    });
  } catch (error) {
    console.error(`Error triggering reminder: ${error.message}`);
  }
};
