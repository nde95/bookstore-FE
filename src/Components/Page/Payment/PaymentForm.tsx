import {PaymentElement, useStripe, useElements} from '@stripe/react-stripe-js';
import { useState } from "react";
import { toastNotify } from '../../../Helper';
import { orderSummaryProps } from '../Order/orderSummaryProps';
import { apiResponse, cartItemModel } from '../../../Interfaces';
import { useCreateOrderMutation } from '../../../APIs/orderApi';
import { SD_Status } from '../../../Utils/SD';
import { useNavigate } from 'react-router-dom';

const PaymentForm = ({ data, userInput }: orderSummaryProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [createOrder] = useCreateOrderMutation();
  const navigate = useNavigate();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setIsProcessing(true);

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "https://example.com/order/123/complete",
      },
      redirect:"if_required"
    });

    if (result.error) {
      toastNotify("An unexpected error has occured.", "error")
      setIsProcessing(false);
    } else {
      console.log(result);


      let subTotal = 0;
      let totalItems = 0;
      const orderDetailsDTO: any = [];
      data.cartItems.forEach((item: cartItemModel) => {
        const tempOrderDetail: any = {};
        tempOrderDetail["productItemId"] = item.productItem?.id;
        tempOrderDetail["quantity"] = item.quantity;
        tempOrderDetail["itemName"] = item.productItem?.name;
        tempOrderDetail["price"] = item.productItem?.price;
        orderDetailsDTO.push(tempOrderDetail);
        subTotal += (item.quantity! * item.productItem?.price!)
        totalItems += item.quantity!;
      });

      const response: apiResponse = await createOrder({
        pickupName: userInput.name,
        pickupPhoneNumber: userInput.phoneNumber,
        pickupEmail: userInput.email,
        totalItems: totalItems,
        orderTotal: subTotal,
        orderDetailsDTO: orderDetailsDTO,
        stripePaymentIntentId: data.stripePaymentIntentId,
        applicationUserId: data.userId,
        status: result.paymentIntent.status === "succeeded" ? SD_Status.CONFIRMED : SD_Status.PENDING
      });

      if (response) {
        if (response.data?.result.status === SD_Status.CONFIRMED) {
          navigate(`/order/orderConfirmed/${response.data.result.orderHeaderId}`)
        } else {
          navigate("/failed");
        }
      }
    }
    setIsProcessing(false);
  };
  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button disabled={!stripe} className='btn btn-success mt-5 w-100'>Submit</button>
    </form>
  );
};

export default PaymentForm;