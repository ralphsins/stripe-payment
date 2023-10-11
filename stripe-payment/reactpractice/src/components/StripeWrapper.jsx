import React from "react";
 
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_51MaLdoEMEUqCqo0BCHGFMTm3rCBKuGPg1HwrtjbBuJgNpLJPQS0udYpyLu1OKhEEzDl0zXP3fuV6nOxCBsq6sl2h00LbAfGd4F");

export default function Stripe(props) {
  const options = {
    clientSecret: props.client_secret,
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      {props.children}
    </Elements>
  );
}