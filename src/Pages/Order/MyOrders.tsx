import { withAuth } from "../../HOC"
import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "../../Storage/Redux/store";
import { useGetAllOrdersQuery } from "../../APIs/orderApi";
import { MainLoader } from "../../Components/Page/Common";
import { OrderList } from "..";

const MyOrders = () => {
    const userId = useSelector((state: RootState) => state.authStore.id);
    const {data, isLoading} = useGetAllOrdersQuery(userId);

    return ( 
    <>
    {isLoading && <MainLoader />}
    {!isLoading && ( <OrderList isLoading={isLoading} orderData={data.result} />)}
    </>
    )
}

export default withAuth(MyOrders);