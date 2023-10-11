import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import axios from "axios";
import {getCardImage} from "../utils/helpers.js";
export default function ListPaymentMethods({ handleSelectCard }) {
  const [paymentMethods, setPaymentMethods] = useState(null);

  useEffect(() => {
    async function getPaymentMethods() {
      try {
        const res = await axios.get(`http://localhost:5000/payment/methods`);
        setPaymentMethods(res?.data.data);
      } catch (error) {
        console.log(error);
      }
    }

    getPaymentMethods();
  }, []);  

  return (
    <div className={"wrapper"}>
      <h3>Select your preferred payment method</h3>
      {paymentMethods &&
        paymentMethods.map((method, index) => (
          <div className={"card"} onClick={() => handleSelectCard(method)} key={index}>
            <div className={"cardLogo"}>
              <img src={getCardImage(method.card.brand)} alt="" />
            </div>

            <div className={"details"}>
              <p>
                {method.card.brand} ** {method.card.last4}
              </p>
              <p>{method.billing_details.name}</p>
            </div>

            <div className={"expire"}>
              Expires{" "}
              {format(
                new Date(`${method.card.exp_year}/${method.card.exp_month}/01`),
                "MM/yyyy"
              )}
            </div>
          </div>
        ))}
    </div>
  );
}
