"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Package1 from "./Package/Package1";
import { FaCaretRight } from "react-icons/fa";

const stripePromise = loadStripe(
  `${process.env.NEXT_PUBLIC_Payment_Gateway_PK}`,
);

const Subscription = () => {
  return (
    <div>
      <div>
        <h1 className="text-center pt-28 font-bold font-cherrySwash text-4xl">
          Subscription Plan
        </h1>

        {/* plans */}
        <div className="max-w-screen-xl mx-auto my-16">
          <div className="w-96 mx-auto text-center bg-gray-100 p-10 rounded-3xl border-b-4 border-siteDefaultSecond">
            <div>
              <h1 className="text-siteDefaultSecond text-2xl font-semibold font-sourGummy">
                Chef Subscription
              </h1>
              <div className="flex justify-center">
                <div className="border-2 border-siteDefaultSecond my-4 w-80"></div>
              </div>
            </div>
            <div className="flex items-end text-siteDefault justify-center">
              <p className="text-6xl font-bold">20$</p>
              <p className="font-semibold">/year</p>
            </div>

            <div className="mt-4">
              <ul className="space-y-2 font-semibold text-gray-500 text-justify">
                <li className="flex items-center">
                  <FaCaretRight className="text-green-600 text-xl mr-4" /> You
                  have to pay 20 dollars to take premium subscription for years
                </li>
              </ul>
            </div>
            <div className="mt-10">
              <Elements stripe={stripePromise}>
                <Package1></Package1>
              </Elements>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
