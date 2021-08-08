import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { stripe } from "../../services/stripe";

export default async function handler (request: NextApiRequest, response: NextApiResponse) {
  if (request.method === 'POST') {

    const session = await getSession({req: request});
    
    if (!session || !session.user || !session.user.email) {
      return response.status(401).end('Unauthorized');
    }
    const stripeCustomer = await stripe.customers.create({
      email: session.user.email,
    });
    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      customer: stripeCustomer.id,
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      line_items: [
        {price: 'price_1JKAwSJMCVEAdLlr8RHERzRA', quantity: 1}
      ],
      mode: 'subscription',
      allow_promotion_codes: true,
      success_url: process.env.STRIPE_SUCCESS_URL || 'http://localhost:3000/posts',
      cancel_url: process.env.STRIPE_CANCEL_URL || 'http://localhost:3000'
    });
    return response.status(200).json({ sessionId: stripeCheckoutSession.id });
  } else {
    response.setHeader('Allow', 'POST');
    response.status(405).end('Method not allowed');
  }
}