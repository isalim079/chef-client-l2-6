"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useAuth } from "@/context/AuthContext";
import useAxiosPublic from "@/lib/hooks/useAxiosPublic";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Package1 = () => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  //     console.log(clientSecret);
  const [transactionId, setTransactionId] = useState("");

  const stripe = useStripe();
  const elements = useElements();
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  useEffect(() => {
    axiosPublic.post("/create-payment-intent", { price: 20 }).then((res) => {
    //   console.log(res.data.clientSecret);
      setClientSecret(res.data.clientSecret);
    });
  }, []);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("payment error", error);
      setError(error.message || "");
    } else {
      console.log("payment method", paymentMethod);
      setError("");
    }

    // confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.name || "anonymous",
          },
        },
      });
    if (confirmError) {
      console.log("confirm error");
    } else {
      console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {

        const purchaseDate = new Date(); // Current time
        const purchaseTime = purchaseDate.toLocaleString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });
        const expiryDate = new Date();
        expiryDate.setFullYear(expiryDate.getFullYear() + 1);
      const expiryTime = expiryDate.toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
      const subscriptionInfo = {
        tnxId: paymentIntent.id,
        purchaseTime: purchaseTime,
        expiryTime: expiryTime,
        amount: 20, 
      };



       await axiosPublic
          .patch(`/api/users/${user?.email}/userType`, {
            userType: "premium",
          })
          .then((res) => {
            // console.log(res.data.success);
            if(res.data.success) {
               axiosPublic.patch(`/api/users/${user?.email}/subscriptionInfo`, subscriptionInfo)
               .then((res) => {
                console.log(res.data.success);
               })
            }
          })
          .catch((error) => {
            console.log(error);
          });

        toast.success("payment successful. your are subscribed");

        // console.log("transaction id", paymentIntent.id);
        setTransactionId(paymentIntent.id);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="w-full bg-gray-800 py-2 mt-10 text-white rounded-md hover:bg-gray-900"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          purchase
        </button>
        <p className="text-red-600">{error}</p>
        {transactionId && (
          <p className="text-green-600 mt-3">Your transaction id: {transactionId}</p>
        )}
      </form>
    </div>
  );
};

export default Package1;
