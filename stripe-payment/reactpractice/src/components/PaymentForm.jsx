import { useState } from "react";
 

import clsx from "clsx";
import { format } from "date-fns";
import { useStripe, CardCvcElement, useElements } from "@stripe/react-stripe-js";

import axios from "axios";

export default function PaymentForm({ paymentMethod, paymentIntent }) {
  const stripe = useStripe();
  const elements = useElements();

  const [cvcError, setCvcError] = useState(null);

  const { card, billing_details } = paymentMethod;

  const handleSubmit = async (e) => {
    e.preventDefault();
    stripe
      .createToken("cvc_update", elements.getElement(CardCvcElement))
      .then((result) => {
        if (result.error) {
          setCvcError(result.error.message);
        } else {
           axios.post(`http://localhost:5000/payment/confirm`, {
            paymentMethod: paymentMethod.id,
            paymentIntent: paymentIntent.id,
          })
      
        }
      })
      .catch((err) => {
        console.log(err);
        /* Handle error*/
      });
  };

  function handleServerResponse(response) {
    if (response.error) {
      /* Handle Error */
    } else if (response.next_action) {
      handleAction(response);
    } else {
      alert("Payment Success");
      /* Handle Success */
      window.location.reload();
    }
  }

  function handleAction(response) {
    stripe.handleCardAction(response.client_secret).then(function (result) {
      if (result.error) {
        console.log(result.error);
        /* Handle error */
      } else {
        axios.post(`http://localhost:5000/payment/confirm`, {
          paymentIntent: paymentIntent.id,
          paymentMethod: paymentMethod.id,
        })
          .then((resp) => {
            handleServerResponse(resp.data);
          })
          .catch((err) => {
            console.log(err);
            /* Handle Error */
          });
      }
    });
  }

  return (
    card && (
      <div className={"wrapper"}>
        <form onSubmit={handleSubmit}>
          <div className={"card"}>
            <div className={"icon"}>
              <img src={card.icon} alt="" />
            </div>
            <div className={"row"}>
              <label>Cardholder Name</label>
              <p>{billing_details.name}</p>
            </div>
            <div className={clsx("row", "col")}>
              <div className={"cardNumber"}>
                <label>Card Number</label>
                <p>{`** ** ** ${card.last4}`}</p>
              </div>
              <div className={"expiry"}>
                <label>Card Expiry</label>
                <p>{format(new Date(`${card.exp_year}/${card.exp_month}/01`), "mm/yyyy")}</p>
              </div>
            </div>

            <div className={"row"}>
              <label>Enter Cvc/Cvv </label>
              <div className={"cvcInput"}>
                <CardCvcElement
                  onChange={() => {
                    setCvcError(null);
                  }}
                />
              </div>
              <p className={"cvcError"}>{cvcError}</p>
            </div>
          </div>

          <button>Make Payment</button>
        </form>
      </div>
    )
  );
}