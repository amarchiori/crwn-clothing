require('dotenv').config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

export async function handler(event) {
    try {
        const { amount } = JSON.parse(event.body);

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'usd',
            payment_method_types: ['card']
        });

        return {
            stateCode: 200,
            body: JSON.stringify({ paymentIntent })
        };
    } catch (error) {
        console.log({ error });

        return {
            status: 400,
            body: JSON.stringify({ error })
        };
    }
};