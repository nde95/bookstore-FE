import { withAuth } from "../../HOC"
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "../../Storage/Redux/store";
import { useGetAllOrdersQuery } from "../../APIs/orderApi";
import { MainLoader } from "../../Components/Page/Common";
import { orderHeader } from "../../Interfaces";

const MyOrders = () => {
    const userId = useSelector((state: RootState) => state.authStore.id);
    const {data, isLoading} = useGetAllOrdersQuery(userId);


    return ( 
    <>
    {isLoading && <MainLoader />}
    {!isLoading && (        
    <div className="table p-5">
        <h1 className="text-success">Orders List</h1>
        <div className="p-2">
          <div className="row border">
            <div className="col-1">ID</div>
            <div className="col-3">Name</div>
            <div className="col-2">Phone</div>
            <div className="col-1">Total</div>
            <div className="col-1">Items</div>
            <div className="col-2">Date</div>
            <div className="col-2"></div>
          </div>
          {data.result.map((orderItem: orderHeader) => {
        return (
            <div className="row border" key={orderItem.orderHeaderId}>
            <div className="col-1">{orderItem.orderHeaderId}</div>
            <div className="col-3">{orderItem.pickupName}</div>
            <div className="col-2">{orderItem.pickupPhoneNumber}</div>
            <div className="col-1">${orderItem.orderTotal!.toFixed(2)}</div>
            <div className="col-1">{orderItem.totalItems}</div>
            <div className="col-2">{new Date(orderItem.orderDate!).toLocaleDateString()}</div>
            <div className="col-2">
            <button className="btn btn-success">Details</button>
            </div>
        </div>
          )})}
        </div>
      </div>
      )}

    </>
    )
}

export default withAuth(MyOrders);