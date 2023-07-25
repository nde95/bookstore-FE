import { useSelector } from "react-redux";
import { getStatusColor } from "../../../Helper";
import { cartItemModel } from "../../../Interfaces";
import { SD_Roles, SD_Status } from "../../../Utils/SD";
import { orderSummaryProps } from "./orderSummaryProps";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../Storage/Redux/store";
import { useState } from "react";
import { useUpdateOrderDetailsMutation } from "../../../APIs/orderApi";
import { MainLoader } from "../Common";

const OrderSummary = ({ data, userInput }: orderSummaryProps) => {
  const badgeTypeColor = getStatusColor(data.status!);
  const navigate = useNavigate();
  const userData = useSelector((state: RootState) => state.authStore);
  const [loading, setIsLoading] = useState(false);
  const [updateOrderDetails] = useUpdateOrderDetailsMutation();

  const nextStatus: any =
    data.status! === SD_Status.CONFIRMED
      ? { color: "info", value: SD_Status.HANDED_TO_CARRIER }
      : data.status! === SD_Status.HANDED_TO_CARRIER
      ? { color: "warning", value: SD_Status.SHIPPED }
      : data.status! === SD_Status.SHIPPED && {
          color: "success",
          value: SD_Status.DELIVERED,
        };

  const handleNextStatus = async () => {
    setIsLoading(true);
    await updateOrderDetails({
      orderHeaderId: data.id,
      status: nextStatus.value,
    });

    setIsLoading(false);
  };

  const handleCancel = async () => {
    setIsLoading(true);
    await updateOrderDetails({
      orderHeaderId: data.id,
      status: SD_Status.CANCELLED,
    });
    setIsLoading(false);
  };

  return (
    <div>
      {loading && <MainLoader />}
      {!loading && (
        <>
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="text-success">Order Summary</h3>
            <span className={`btn btn-outline-${badgeTypeColor} fs-6`}>
              {data.status}
            </span>
          </div>
          <div className="mt-3">
            <div className="border py-3 px-2">Name : {userInput.name}</div>
            <div className="border py-3 px-2">Email : {userInput.email}</div>
            <div className="border py-3 px-2">
              Phone : {userInput.phoneNumber}
            </div>
            <div className="border py-3 px-2">
              <h4 className="text-success">Books</h4>
              <div className="p-3">
                {data.cartItems?.map(
                  (cartItem: cartItemModel, index: number) => {
                    return (
                      <div className="d-flex" key={index}>
                        <div className="d-flex w-100 justify-content-between">
                          <p>{cartItem.productItem?.name}</p>
                          <p>
                            ${cartItem.productItem?.price} x {cartItem.quantity}{" "}
                            =
                          </p>
                        </div>
                        <p style={{ width: "70px", textAlign: "right" }}>
                          $
                          {(cartItem.productItem?.price ?? 0) *
                            (cartItem.quantity ?? 0)}
                        </p>
                      </div>
                    );
                  }
                )}

                <hr />
                <h4 className="text-danger" style={{ textAlign: "right" }}>
                  ${data.cartTotal?.toFixed(2)}
                </h4>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center mt-5">
            <button className="btn btn-secondary" onClick={() => navigate(-1)}>
              Back To Orders
            </button>
            {userData.role == SD_Roles.ADMIN && (
              <div className="d-flex">
                <button className="btn btn-danger mx-2" onClick={handleCancel}>
                  Cancel
                </button>
                <button
                  className={`btn btn-${nextStatus.color}`}
                  onClick={handleNextStatus}
                >
                  {nextStatus.value}
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default OrderSummary;
