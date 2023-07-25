import { useGetAllOrdersQuery } from "../../APIs/orderApi";
import { MainLoader } from "../../Components/Page/Common";
import { OrderList } from "..";
import withAdminAuth from "../../HOC/withAdminAuth";

const AllOrders = () => {
  const { data, isLoading } = useGetAllOrdersQuery("");

  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && (
        <OrderList isLoading={isLoading} orderData={data.result} />
      )}
    </>
  );
};

export default withAdminAuth(AllOrders);
