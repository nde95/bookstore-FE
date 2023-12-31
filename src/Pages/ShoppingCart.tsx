import { CartSummary, UserDetails } from "../Components/Page/Cart";
import { withAuth } from "../HOC";

const ShoppingCart = () => {
    return (
        <div className="row w-100" style={{ marginTop: "10px" }}>
            <div className="col-lg-6 col-12" style={{ fontWeight: 300 }}>
                <CartSummary />
            </div>
            <div className="col-lg-6 col-12 p-4">
                <UserDetails />
            </div>
        </div>
    )
}

export default withAuth(ShoppingCart);