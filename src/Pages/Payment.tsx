import { useLocation } from "react-router-dom";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { PaymentForm } from "../Components/Page/Payment";
import { OrderSummary } from "../Components/Page/Order";


const Payment = () => {
    const {
    state: { apiResult, userInput }
        } = useLocation();
    const stripePromise = loadStripe(
    'pk_test_51N860GIQ5scVmOjnAoquljkRVkjJdXEbmy8KQsZMexapGuSvwy2WVGsjlpDA1x4DyCbIRfhhXf5uz2mHmdt97C5D00UxNr4k9V'
    );
    const options = {
        // passing the client secret obtained from the server
        clientSecret: apiResult.clientSecret,
      };

    return (
        <Elements stripe={stripePromise} options={options}>
            <div className="container m-5 p-5">
                <div className="row">
                    <div className="col-md-7">
                        <OrderSummary data={apiResult} userInput={userInput} />
                    </div>
                    <div className="col-md-4 offset-1">
                        <h3 className="text-success">Payment</h3>
                        <PaymentForm data={apiResult} userInput={userInput} />
                    </div>
                </div>
            </div>

        </Elements>
      );
}

export default Payment;