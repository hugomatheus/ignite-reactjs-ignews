import { faunadb } from "../../../services/faunadb";
import { query as q } from 'faunadb';
import { stripe } from "../../../services/stripe";

export async function saveSubscription(subscriptionId: string, customerId: string) {
  const userRef = await faunadb.query(
    q.Select(
      "ref",
      q.Get(
        q.Match(
          q.Index('user_stripe_customer_id'),
          customerId,
        )
      )
    )
  );

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  
  const subscriptionData = {
    id: subscriptionId,
    userId: userRef,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id,
  };

  await faunadb.query(
    q.Create(
      q.Collection('subscriptions'),
      {data: subscriptionData}
    )
  );
}