import { useSelector } from "react-redux";
import { cartItemModel } from "../../../Interfaces";
import { RootState } from "../../../Storage/Redux/store";
import { InputHelper } from "../../../Helper";
import { useState } from "react";

const UserDetails = () => {
  const shoppingCartFromStore : cartItemModel[] = useSelector(
    (state : RootState) => state.shoppingCartStore.cartItems ?? []
);
  let subTotal = 0;
  let totalItems = 0;

  const initialUserData = {
    name: "",
    email: "",
    phoneNumber: "",
  }

  shoppingCartFromStore?.map((cartItem: cartItemModel) => {
    totalItems += cartItem.quantity ?? 0;
    subTotal += (cartItem.productItem?.price ?? 0) * (cartItem.quantity ?? 0);
    return null
  })

  const [userInput, setUserInput] = useState(initialUserData);
  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempData = InputHelper(e, userInput)
    setUserInput(tempData);
  }

    return (
        <div className="border pb-5 pt-3">
        <h1 style={{ fontWeight: "300" }} className="text-center text-success">
          Pickup Details
        </h1>
        <hr />
        <form className="col-10 mx-auto">
          <div className="form-group mt-3">
            Name
            <input
              onChange={handleUserInput}
              value={userInput.name}
              type="text"
              className="form-control"
              placeholder="name..."
              name="name"
              required
            />
          </div>
          <div className="form-group mt-3">
            Email
            <input
              onChange={handleUserInput}
              value={userInput.email}
              type="email"
              className="form-control"
              placeholder="email..."
              name="email"
              required
            />
          </div>
  
          <div className="form-group mt-3">
            Phone Number
            <input
              onChange={handleUserInput}
              value={userInput.phoneNumber}
              type="number"
              className="form-control"
              placeholder="phone number..."
              name="phoneNumber"
              required
            />
          </div>
          <div className="form-group mt-3">
            <div className="card p-3" style={{ background: "ghostwhite" }}>
              <h5>Subtotal : ${subTotal.toFixed(2)}</h5>
              <h5>No of items : {totalItems}</h5>
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-lg btn-success form-control mt-3"
          >
            Place Order
          </button>
        </form>
      </div>
    )
}

export default UserDetails;